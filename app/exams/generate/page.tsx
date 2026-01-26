"use client"

import { useState } from "react"
import { FacultySelectionForm, emptyFacultySelection, isFacultySelectionComplete, type FacultySelectionValue } from "@/components/faculty-selection"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles, ChevronLeft, ArrowRight, BookOpen } from "lucide-react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { getMockProfessorById, getMockSubjectById } from "@/lib/mock-data"

export default function GenerateSimilarQuestionsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const professorId = searchParams.get("professor") || ""
  const professor = professorId ? getMockProfessorById(professorId) : undefined
  const subject = professor ? getMockSubjectById(professor.subject_id) : undefined

  const [selection, setSelection] = useState<FacultySelectionValue>(emptyFacultySelection)
  const [originalQuestion, setOriginalQuestion] = useState("")
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const hasProfessor = Boolean(professorId)

  const handleSelectSubmit = () => {
    if (!isFacultySelectionComplete(selection)) {
      toast.error("学部・学科・科目・教授をすべて選択してください")
      return
    }
    router.push(`/exams/generate?professor=${selection.professorId}`)
  }

  const handleGenerate = async () => {
    if (!originalQuestion.trim()) {
      toast.error("元の問題を入力してください")
      return
    }

    setIsGenerating(true)

    try {
      const apiKey = localStorage.getItem("openai_api_key") || ""
      if (!apiKey) {
        toast.error("設定画面でAPIキーを登録してください")
        setIsGenerating(false)
        return
      }

      const response = await fetch("/api/generate-similar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ examContent: originalQuestion, apiKey }),
      })

      if (!response.ok) {
        throw new Error("類題の生成に失敗しました")
      }

      const data = await response.json()
      const content = data.content || ""
      setGeneratedQuestions(content ? [content] : [])
      toast.success("類題を生成しました！")
    } catch (error) {
      console.error("[v0] Error generating similar questions:", error)
      toast.error("類題の生成に失敗しました。設定でAPIキーを確認してください。")
    } finally {
      setIsGenerating(false)
    }
  }

  const Header = (
    <header className="bg-background text-foreground shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div>
          {/* 戻るボタンは教授が選択されている場合はその教授のビューへ、それ以外は学部一覧へ */}
          <a
            href={hasProfessor ? `/exams/view?professor=${professorId}` : `/study/faculties`}
            className="inline-flex items-center justify-center h-10 w-10 rounded-md text-foreground hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">戻る</span>
          </a>
        </div>

        <div className="text-center absolute left-1/2 -translate-x-1/2">
          <h1 className="text-lg font-bold">AI類題生成</h1>
          {professor && (
            <p className="text-sm opacity-90">{professor.name} ・ {subject?.name ?? "科目未設定"}</p>
          )}
        </div>

        <div className="w-10" />
      </div>
    </header>
  )

  if (!hasProfessor) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {Header}

        <section className="container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>AI類題生成</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">まず教授を選択してください</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty mb-8">
            学部・学科・科目・教授を選ぶと、その教授に紐づく過去問をベースに類題を生成できます。
          </p>
        </section>

        <section className="container mx-auto px-4 pb-24 max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">学部から教授を絞り込み</h2>
            <p className="text-muted-foreground">閲覧・共有と同じ UI で選択できます。</p>
          </div>

          <FacultySelectionForm
            value={selection}
            onChange={setSelection}
            onSubmit={handleSelectSubmit}
            onInvalidSubmit={() => toast.error("学部・学科・科目・教授をすべて選択してください")}
            submitLabel="この教授で類題作成"
            buttonClassName="rounded-full"
          />
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {Header}

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          <span>AI類題生成</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">AIで類題を自動生成</h1>
        {/* ヘッダーに教授情報を表示しているため、ここでは省略してシンプルにする */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty mb-8">
          過去問をベースに、同じレベルの練習問題を瞬時に作成。あなたの学習をサポートします。
        </p>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-24 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Card */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                元の問題を入力
              </CardTitle>
              <CardDescription>類題を生成したい問題文を入力してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="original-question">問題文</Label>
                <Textarea
                  id="original-question"
                  placeholder="例：次の方程式を解きなさい。 x² - 5x + 6 = 0"
                  className="min-h-[300px] resize-none"
                  value={originalQuestion}
                  onChange={(e) => setOriginalQuestion(e.target.value)}
                />
              </div>
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !originalQuestion.trim()}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    類題を生成
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Card */}
          <Card className="border-2 bg-gradient-to-br from-card to-muted/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                生成された類題
              </CardTitle>
              <CardDescription>AIが生成した練習問題</CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">類題を生成中...</p>
                </div>
              ) : generatedQuestions.length > 0 ? (
                <div className="space-y-4">
                  {generatedQuestions.map((question, index) => (
                    <Card key={index} className="bg-background">
                      <CardHeader>
                        <CardTitle className="text-base">類題 {index + 1}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{question}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">類題がここに表示されます</p>
                    <p className="text-sm text-muted-foreground">
                      左側に問題を入力して、「類題を生成」ボタンをクリックしてください
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features を削除して画面をシンプルにする */}
      </section>
    </div>
  )
}