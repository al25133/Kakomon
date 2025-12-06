import { Button } from "@/components/ui/button"
 
import { ChevronLeft } from "lucide-react"
import { getMockProfessorById, getMockSubjectById, getMockDepartmentById } from "@/lib/mock-data"
import { redirect } from "next/navigation"

// PDF 1枚目 (ホーム) のボタンレイアウトを流用
export default async function ProfessorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const professor = getMockProfessorById(id)

  if (!professor) {
    redirect("/study/faculties")
  }

  const subject = getMockSubjectById(professor.subject_id)
  const department = getMockDepartmentById(subject?.department_id || "")

  return (
    <div className="flex flex-col min-h-svh bg-background">
      
      {/* PDFの青いヘッダー */}
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" href={`/study/professors?subject=${professor.subject_id}`} className="hover:bg-primary/80">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">戻る</span>
          </Button>
          <div className="text-center absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-bold">
              {professor.name}
            </h1>
            <p className="text-sm opacity-90">{subject?.name}</p>
          </div>
          <div></div>
        </div>
      </header>

      {/* メインコンテンツ (ホーム画面のボタンレイアウト流用) */}
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-12 w-full max-w-xs">
          
          {/* 閲覧ボタン (PDFのプライマリボタン) */}
          <Button
            className="w-full"
            size="default" // h-14
            href={`/exams/view?professor=${id}`}
          >
            過去問を閲覧
          </Button>

          {/* 類題作成ボタン (PDFのセカンダリボタン) */}
          <Button
            className="w-full bg-muted text-muted-foreground hover:bg-muted/90"
            size="default" // h-14
            variant="secondary"
            href={`/exams/generate?professor=${id}`}
          >
            類題を作成
          </Button>

          {/* 質問するボタン (PDFのセカンダリボタン) */}
          <Button
            className="w-full bg-muted text-muted-foreground hover:bg-muted/90"
            size="default" // h-14
            variant="secondary"
            href={`/questions/create?professor=${id}`}
          >
            質問する
          </Button>
        </div>
      </main>
    </div>
  )
}