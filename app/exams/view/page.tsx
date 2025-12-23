"use client";
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Plus } from "lucide-react"
import { getMockProfessorById, getMockExams, getMockSubjectById } from "@/lib/mock-data"

function ViewExamsContent() {
  const searchParams = useSearchParams()
  const professor = searchParams.get("professor")

  if (!professor) {
    return (
      <div className="flex flex-col min-h-svh bg-background items-center justify-center">
        <p className="text-foreground">教授を選択してください</p>
      </div>
    )
  }

  const professorData = getMockProfessorById(professor)
  const subject = getMockSubjectById(professorData?.subject_id || "")
  const exams = getMockExams(professor)

  return (
    <div className="flex flex-col min-h-svh bg-background">
      
      {/* PDFのヘッダー */}
      <header className="bg-background text-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Button variant="ghost" size="icon" href={`/study/professor/${professor}`} className="hover:bg-primary/80">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">戻る</span>
          </Button>
          <div className="text-center absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-bold">
              {subject?.name}
            </h1>
            <p className="text-sm opacity-90">{professorData?.name}</p>
          </div>
          <Button variant="ghost" size="icon" href="/share" className="hover:bg-primary/80">
            <Plus className="h-6 w-6" />
            <span className="sr-only">過去問を共有</span>
          </Button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto flex flex-1 flex-col p-4 py-8">
        <div className="w-full mx-auto space-y-6 flex flex-col items-center">
          
          <h2 className="text-xl font-semibold text-center text-foreground w-[33vw] min-w-[33vw] max-w-[33vw]">
            年度を選んでください
          </h2>

          <div className="flex flex-col gap-6 w-[33vw] min-w-[33vw] max-w-[33vw]">
            {exams && exams.length > 0 ? (
              exams.map((exam) => (
                <Button
                  key={exam.id}
                  variant="secondary"
                  className="w-full justify-start rounded-full"
                  size="default"
                  href={`/exams/${exam.id}`}
                >
                  {exam.title} {exam.year && `(${exam.year}年)`}
                </Button>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                この教授の過去問はまだ投稿されていません。
              </p>
            )}
          </div>
          
          <Button
                      className="mx-auto flex w-[33vw] min-w-[33vw] max-w-[33vw]"
            size="default"
            href={`/exams/generate?professor=${professor}`}
          >
            類題作成
          </Button>

        </div>
      </main>
    </div>
  )
}

export default function ViewExamsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col min-h-svh bg-background items-center justify-center">
          <p className="text-foreground">読み込み中...</p>
        </div>
      }
    >
      <ViewExamsContent />
    </Suspense>
  )
}