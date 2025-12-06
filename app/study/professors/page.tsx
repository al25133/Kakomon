import { Button } from "@/components/ui/button"
 
import { ChevronLeft } from "lucide-react"
import { getMockProfessors, getMockSubjectById } from "@/lib/mock-data"
import { redirect } from "next/navigation"

// PDF 5枚目 (閲覧画面) のデザインを適用
export default async function ProfessorsPage({
  searchParams,
}: {
  searchParams: Promise<{ subject: string }>
}) {
  const params = await searchParams

  if (!params.subject) {
    redirect("/study/faculties")
  }

  const subject = getMockSubjectById(params.subject)
  const professors = getMockProfessors(params.subject)

  return (
    <div className="flex flex-col min-h-svh bg-background">
      
      {/* PDFの青いヘッダー */}
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" href={`/study/subjects?department=${subject?.department_id}`} className="hover:bg-primary/80">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">戻る</span>
          </Button>
          <div className="text-center absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-bold">
              {subject?.name}
            </h1>
          </div>
          <div></div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto flex flex-1 flex-col p-4 py-8">
        <div className="w-full max-w-md mx-auto space-y-6">
          
          <h2 className="text-xl font-semibold text-center text-foreground">
            教授を選んでください
          </h2>

          <div className="flex flex-col gap-4">
            {professors.map((professor) => (
              <Button
                key={professor.id}
                variant="secondary" // PDFのグレーボタン (#E0E0E0)
                className="w-full justify-start"
                size="default" // h-14
                href={`/study/professor/${professor.id}`}
              >
                {professor.name}
              </Button>
            ))}
          </div>
          
        </div>
      </main>
    </div>
  )
}