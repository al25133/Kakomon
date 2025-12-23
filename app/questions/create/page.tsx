"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
 
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { ChevronLeft } from "lucide-react"
import { getMockExams, getMockExamById, getMockProfessorById } from "@/lib/mock-data"

// PDFのデザイン言語 (フォーム) を適用
function CreateQuestionContent() {
  const searchParams = useSearchParams()
  const professorId = searchParams.get("professor")
  const examId = searchParams.get("exam")
  
  const exam = getMockExamById(examId || "")
  const professor = getMockProfessorById(professorId || exam?.professor_id || "")

  const [exams, setExams] = useState<Array<{ id: string; title: string; content: string; year: number | null }>>([])
  const [selectedExam, setSelectedExam] = useState(examId || "")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // examIdが指定されていない場合 (教授ページから来た場合) のみ、
    // その教授の試験一覧を読み込む
    if (professorId && !examId) {
      const mockExams = getMockExams(professorId)
      setExams(mockExams)
    }
  }, [professorId, examId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // バリデーション
    if (!title.trim()) {
      alert("質問タイトルを入力してください")
      return
    }

    if (!content.trim()) {
      alert("質問内容を入力してください")
      return
    }

    if (!selectedExam && !examId) {
      alert("試験を選択してください")
      return
    }

    setIsLoading(true)

    try {
      // ここで実際の投稿APIを呼び出します
      // 例: const response = await fetch('/api/questions', { ... })
      
      // デモ用：2秒待機
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (selectedExam) {
        router.push(`/exams/${selectedExam}`)
      } else if (examId) {
        router.push(`/exams/${examId}`)
      } else {
        router.push("/home")
      }
    } catch (err) {
      alert("質問の投稿に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  const displayExam = getMockExamById(selectedExam)

  if (!professorId && !examId) {
    // ... エラー表示 (変更なし) ...
    return (
      <div className="flex flex-col min-h-svh bg-background">
         <header className="bg-background text-foreground shadow-md sticky top-0 z-10">
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
          <p>教授または過去問が選択されていません。</p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-svh bg-background">
      
      {/* PDFスタイルのヘッダー */}
      <header className="bg-background text-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" href={examId ? `/exams/${examId}` : `/study/professor/${professorId}`} className="hover:bg-primary/80">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">戻る</span>
          </Button>
          <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">
            質問する
          </h1>
          <div></div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto flex flex-1 flex-col p-4 py-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-8">
          
          <div className="space-y-6">
            
            {/* 教授ページから来た場合 (examId がない) のみ、過去問を選択 */}
            {!examId && professorId && (
              <div className="grid gap-2">
                <Label htmlFor="exam" className="text-base font-semibold">質問対象の過去問</Label>
                <Select value={selectedExam} onValueChange={setSelectedExam}>
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
            )}
            
            {/* 過去問ページから来た場合 (examId がある) は、対象を表示 */}
            {displayExam && (
              <div className="grid gap-2">
                <Label className="text-base font-semibold">質問対象</Label>
                <div className="p-4 bg-muted rounded-2xl border">
                  <p className="font-semibold">{displayExam.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {displayExam.content}
                  </p>
                </div>
              </div>
            )}

            {/* 質問内容の入力フォーム */}
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-base font-semibold">質問のタイトル</Label>
                <Input
                id="title"
                placeholder="例: この問題の解き方が..."
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-14 rounded-lg"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content" className="text-base font-semibold">質問内容</Label>
              <Textarea
                id="content"
                placeholder="具体的な質問内容を入力してください"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="rounded-2xl"
              />
            </div>
          </div>

          <Button type="submit" className="w-full max-w-xs mx-auto flex" disabled={isLoading}>
            {isLoading ? "投稿中..." : "投稿する"}
          </Button>

        </form>
      </main>
    </div>
  )
}

export default function CreateQuestionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col min-h-svh bg-background items-center justify-center">
          <p className="text-foreground">読み込み中...</p>
        </div>
      }
    >
      <CreateQuestionContent />
    </Suspense>
  )
}