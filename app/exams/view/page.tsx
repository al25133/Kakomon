import { Button } from "@/components/ui/button"
 
import { ChevronLeft, Plus } from "lucide-react"
import { getMockProfessorById, getMockExams, getMockSubjectById } from "@/lib/mock-data"
import { redirect } from "next/navigation"

// PDF 5枚目 (閲覧画面・年度選択) のデザインを適用
export default async function ViewExamsPage({
  searchParams,
}: {
  searchParams: Promise<{ professor: string }>
}) {
  const params = await searchParams

  if (!params.professor) {
    redirect("/study/faculties")
  }

  const professor = getMockProfessorById(params.professor)
  const subject = getMockSubjectById(professor?.subject_id || "")
  const exams = getMockExams(params.professor)

  return (
    <div className="flex flex-col min-h-svh bg-background">
      
      {/* PDFの青いヘッダー */}
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" href={`/study/professor/${params.professor}`} className="hover:bg-primary/80">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">戻る</span>
          </Button>
          <div className="text-center absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-bold">
              {subject?.name}
            </h1>
            <p className="text-sm opacity-90">{professor?.name}</p>
          </div>
          {/* PDF 5枚目のデザインにはないが、機能として「過去問追加」があってもよいため、共有へのリンクを残す */}
          <Button variant="ghost" size="icon" href="/share" className="hover:bg-primary/80">
            <Plus className="h-6 w-6" />
            <span className="sr-only">過去問を共有</span>
          </Button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto flex flex-1 flex-col p-4 py-8">
        <div className="w-full max-w-md mx-auto space-y-6">
          
          <h2 className="text-xl font-semibold text-center text-foreground">
            年度を選んでください
          </h2>

          <div className="flex flex-col gap-4">
            {exams && exams.length > 0 ? (
              exams.map((exam) => (
                <Button
                  key={exam.id}
                  variant="secondary" // PDFのグレーボタン (#E0E0E0)
                  className="w-full justify-start"
                  size="default" // h-14
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
          
          {/* PDF 5枚目の「類題作成」ボタン */}
          <Button
            className="w-full max-w-xs mx-auto flex"
            size="default"
            href={`/exams/generate?professor=${params.professor}`}
          >
            類題作成
          </Button>

        </div>
      </main>
    </div>
  )
}