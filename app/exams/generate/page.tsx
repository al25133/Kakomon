"use client"

import { useState, useRef, useEffect } from "react"
import { FacultySelectionForm, emptyFacultySelection, isFacultySelectionComplete, type FacultySelectionValue } from "@/components/faculty-selection"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles, ArrowRight, BookOpen, Copy } from "lucide-react"
import { HeaderBackButton } from "@/components/ui/header-back-button"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { getMockProfessorById, getMockSubjectById, getMockExams } from "@/lib/mock-data"

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
  const [availableExams, setAvailableExams] = useState(() => (professorId ? getMockExams(professorId) : []))
  const [selectedImportExamId, setSelectedImportExamId] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [uploadedUrl, setUploadedUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

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

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success("クリップボードにコピーしました")
    } catch (e) {
      toast.error("コピーに失敗しました")
    }
  }

  // Object URL のクリーンアップ
  useEffect(() => {
    return () => {
      if (uploadedUrl) {
        try {
          URL.revokeObjectURL(uploadedUrl)
        } catch (e) {}
      }
    }
  }, [uploadedUrl])

  useEffect(() => {
    if (professorId) setAvailableExams(getMockExams(professorId))
    else setAvailableExams([])
  }, [professorId])

  const handleImportFromExam = () => {
    if (!selectedImportExamId) {
      toast.error("インポートする過去問を選択してください")
      return
    }
    const ex = availableExams.find((e) => e.id === selectedImportExamId)
    if (!ex) {
      toast.error("過去問が見つかりません")
      return
    }

    // content が PDF パスのような場合は埋め込み表示、それ以外は問題文として挿入
    if (ex.content && typeof ex.content === "string" && ex.content.trim().startsWith("/")) {
      // assume static file path under public/
      try {
        if (uploadedUrl) URL.revokeObjectURL(uploadedUrl)
      } catch (e) {}
      setUploadedUrl(ex.content)
      setFile(null)
    } else {
      setOriginalQuestion(ex.content || "")
    }

    toast.success("過去問をインポートしました")
  }

  const Header = (
    <header className="bg-background text-foreground shadow sticky top-0 z-10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div>
          {/* 戻るボタン: 教授クエリがある場合は /exams/generate に戻す、それ以外はホームへ */}
          <HeaderBackButton href={hasProfessor ? `/exams/generate` : `/home`} />
        </div>

        <div className="text-center absolute left-1/2 -translate-x-1/2">
          <h1 className="text-lg font-bold">AI類題生成</h1>
          {professor && (
            <div className="flex flex-col items-center">
              <p className="text-sm opacity-90">{professor.name} ・ {subject?.name ?? "科目未設定"}</p>
              <div className="mt-1 flex gap-2">
                <div className="px-2 py-1 rounded-full bg-muted/60 text-sm">{subject?.name ?? "科目未設定"}</div>
                <div className="px-2 py-1 rounded-full bg-muted/60 text-sm">{professor.name}</div>
              </div>
            </div>
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">教授選択</h1>
        </section>

        <section className="container mx-auto px-4 pb-24 max-w-5xl">


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


      {/* Main Content */}
      <section className="container mx-auto px-4 pb-24 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Card */}
          <Card className="rounded-lg border-2 shadow-sm">
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
                <div className="text-sm text-muted-foreground text-right">{originalQuestion.length}文字</div>
              </div>
              {/* 過去問からインポート */}
              <div className="grid gap-2">
                <Label className="text-base font-semibold">過去問からインポート（任意）</Label>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedImportExamId}
                    onChange={(e) => setSelectedImportExamId(e.target.value)}
                    className="rounded-md border px-2 py-1 text-sm"
                  >
                    <option value="">過去問を選択</option>
                    {availableExams.map((ex) => (
                      <option key={ex.id} value={ex.id}>
                        {ex.title}{ex.year ? ` (${ex.year}年)` : ""}
                      </option>
                    ))}
                  </select>
                  <Button type="button" onClick={handleImportFromExam} size="sm">
                    インポート
                  </Button>
                </div>
              </div>
              {/* PDF アップロード（ローカルプレビュー） */}
              <div className="grid gap-2">
                <Label className="text-base font-semibold">参考PDF（任意）</Label>
                <div className="flex flex-col gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      const f = e.target.files?.[0] || null
                      if (!f) return
                      setFile(f)
                      const url = URL.createObjectURL(f)
                      setUploadedUrl(url)
                    }}
                    className="hidden"
                  />

                  <div className="flex items-center gap-3">
                    <Button type="button" onClick={() => fileInputRef.current?.click()} size="sm">
                      ファイルを選択
                    </Button>
                    {uploadedUrl ? (
                      <>
                        <a href={uploadedUrl} target="_blank" rel="noreferrer" className="text-sm text-primary underline">
                          新しいタブでプレビュー
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            try { if (uploadedUrl) URL.revokeObjectURL(uploadedUrl) } catch (e) {}
                            setUploadedUrl("")
                            setFile(null)
                            if (fileInputRef.current) fileInputRef.current.value = ""
                          }}
                          className="text-sm text-destructive underline"
                        >
                          削除
                        </button>
                      </>
                    ) : file ? (
                      <div className="text-sm">{file.name}</div>
                    ) : (
                      <div className="text-sm text-muted-foreground">未選択</div>
                    )}
                  </div>

                  {uploadedUrl && (
                    <div className="mt-2">
                      <div className="text-sm font-semibold mb-2">埋め込みプレビュー</div>
                      <div className="w-full h-64 border rounded overflow-hidden">
                        <iframe src={uploadedUrl} className="w-full h-full" title="PDFプレビュー" />
                      </div>
                    </div>
                  )}
                </div>
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
          <Card className="rounded-lg border-2 bg-gradient-to-br from-card to-muted/20 shadow-sm">
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
                    <Card key={index} className="bg-background rounded-md border">
                      <CardHeader>
                        <CardTitle className="text-base">類題 {index + 1}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{question}</p>
                        <div className="mt-4 flex justify-end gap-2">
                          <Button size="sm" onClick={() => handleCopy(question)} className="flex items-center gap-2">
                            <Copy className="h-4 w-4" />
                            コピー
                          </Button>
                        </div>
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