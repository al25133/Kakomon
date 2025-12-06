"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
 
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronLeft, Sparkles, AlertCircle } from "lucide-react"
import { getMockExams, getMockProfessorById } from "@/lib/mock-data"

// PDF 9枚目 (類題作成) のデザインを適用
export default function GenerateExamPage() {
  const searchParams = useSearchParams()
  const professorId = searchParams.get("professor")
  const professor = getMockProfessorById(professorId || "")

  const [exams, setExams] = useState<
    Array<{ id: string; title: string; content: string; year: number | null; semester: string | null }>
  >([])
  const [selectedExam, setSelectedExam] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [hasApiKey, setHasApiKey] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: 選択, 2: 確認, 3: 結果

  useEffect(() => {
    const storedKey = localStorage.getItem("openai_api_key") || ""
    setHasApiKey(!!storedKey)

    if (professorId) {
      const mockExams = getMockExams(professorId)
      setExams(mockExams)
    }
  }, [professorId])

  const handleGenerate = async () => {
    if (!selectedExam) {
      setError("過去問を選択してください")
      return
    }

    setIsLoading(true)
    setError(null)
    setGeneratedContent("")
    setStep(3) // 結果表示ステップへ

    try {
      const exam = exams.find((e) => e.id === selectedExam)
      if (!exam) throw new Error("過去問が見つかりません")

      const apiKey = localStorage.getItem("openai_api_key")
      if (!apiKey) {
        throw new Error("APIキーが設定されていません")
      }

      const response = await fetch("/api/generate-similar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examContent: exam.content, apiKey }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "生成に失敗しました")
      }

      const data = await response.json()
      setGeneratedContent(data.content)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "類題の生成に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  if (!professorId) {
    // ... エラー表示 (変更なし) ...
    return (
      <div className="flex flex-col min-h-svh bg-background">
         <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Button variant="ghost" size="icon" href="/home" className="hover:bg-primary/80">
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">戻る</span>
            </Button>
            <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">
              エラー
            </h1>
            <div></div>
          </div>
        </header>
        <main className="container mx-auto flex flex-1 flex-col items-center justify-center p-4">
          <p>教授が選択されていません。</p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-svh bg-background">
      
      {/* PDFの青いヘッダー */}
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            href={step === 1 ? `/study/professor/${professorId}` : undefined}
            onClick={step > 1 ? () => setStep(step - 1) : undefined}
            className="hover:bg-primary/80"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">戻る</span>
          </Button>
          <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">
            類題作成
          </h1>
          <div></div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto flex flex-1 flex-col justify-center p-4 py-8">
        <div className="w-full max-w-md mx-auto space-y-8">
          
          {!hasApiKey && (
            <Alert variant="destructive" className="rounded-2xl">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                AI機能を使用するには、設定画面でAPIキーを登録してください。
                <Button variant="link" className="px-2" href="/settings">
                  設定画面へ
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {step === 1 && (
            // ステップ1: 過去問選択 (PDFにないが必須機能)
            <div className="space-y-6">
              <div className="grid gap-2 text-center">
                 <h2 className="text-xl font-semibold text-foreground">
                  {professor?.name}
                </h2>
                <p className="text-lg text-muted-foreground">類題作成の元にする過去問を選んでください</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="exam" className="text-base font-semibold">過去問</Label>
                <Select value={selectedExam} onValueChange={setSelectedExam} disabled={!hasApiKey}>
                  <SelectTrigger id="exam" className="h-14 rounded-lg" size="lg">
                    <SelectValue placeholder="過去問を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {exams.map((exam) => (
                      <SelectItem key={exam.id} value={exam.id}>
                        {exam.title} {exam.year && `(${exam.year}年)`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setStep(2)} disabled={!selectedExam || !hasApiKey} className="w-full max-w-xs mx-auto flex">
                次へ
              </Button>
            </div>
          )}

          {step === 2 && (
            // ステップ2: 確認 (PDF 9枚目)
            <div className="flex flex-col items-center gap-10 text-center">
              <h2 className="text-2xl font-bold text-foreground max-w-xs">
                共有された過去問を元に類題を作成しますか？
              </h2>
              
              <div className="p-4 bg-muted rounded-lg w-full">
                <h4 className="font-semibold mb-2">選択された過去問</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-4">
                  {exams.find((e) => e.id === selectedExam)?.content}
                </p>
              </div>
              
              <Button onClick={handleGenerate} disabled={isLoading} className="w-full max-w-xs">
                {isLoading ? "作成中..." : "作成する"}
              </Button>
            </div>
          )}

          {step === 3 && (
            // ステップ3: 結果表示
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  生成された類題
                </h2>
                <p className="text-muted-foreground mt-2">AIが生成した類似問題です</p>
              </div>

              {isLoading && (
                <div className="flex justify-center py-12">
                  {/* スピナーやスケルトンをここに追加 */}
                  <p>生成中...</p>
                </div>
              )}

              {error && (
                <Alert variant="destructive" className="rounded-2xl">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {generatedContent && (
                <div className="space-y-4">
                  <Textarea
                    value={generatedContent}
                    readOnly
                    rows={15}
                    className="rounded-2xl bg-muted"
                  />
                  <p className="text-sm text-muted-foreground text-center">
                    内容をコピーしてご自由にお使いください。
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  )
}