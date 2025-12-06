import { Button } from "@/components/ui/button"
 
import { ChevronLeft } from "lucide-react"
import { getMockExamById, getMockProfessorById, getMockQuestions } from "@/lib/mock-data"
import { redirect } from "next/navigation"

// PDF 6枚目 (問題表示画面) のデザインを適用
export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const exam = getMockExamById(id)

  if (!exam) {
    redirect("/home")
  }

  const professor = getMockProfessorById(exam.professor_id)
  const questions = getMockQuestions(id) // この試験に関連する質問

  return (
    <div className="flex flex-col min-h-svh bg-background">
      
      {/* PDFの青いヘッダー */}
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" href={`/exams/view?professor=${exam.professor_id}`} className="hover:bg-primary/80">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">戻る</span>
          </Button>
          <div className="text-center absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-bold">
              {exam.year ? `${exam.year}年度` : exam.title}
            </h1>
            <p className="text-sm opacity-90">{professor?.name}</p>
          </div>
          <div></div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto flex flex-1 flex-col p-4 py-8">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          
          {/* PDF 6枚目: 画像(過去問)表示エリア */}
          <div className="w-full bg-muted rounded-2xl p-4 min-h-[50vh] flex flex-col">
            <h2 className="text-lg font-semibold mb-4">{exam.title}</h2>
            <p className="whitespace-pre-wrap text-foreground flex-1">
              {exam.content}
            </p>
            {/* デモなのでテキスト表示。PDFでは画像表示エリア */}
          </div>

          {/* PDF 6枚目: 質問するボタン */}
          <Button
            className="w-full max-w-xs mx-auto flex"
            size="default"
            href={`/questions/create?exam=${id}`}
          >
            質問する
          </Button>

          {/* 関連する質問リスト (PDFにはないが、元の機能として維持) */}
          <div className="space-y-4 pt-8">
            <h3 className="text-xl font-semibold">関連する質問</h3>
            {questions && questions.length > 0 ? (
              <div className="space-y-4">
                {questions.map((question) => (
                  <div key={question.id} className="p-4 border rounded-lg bg-card">
                    <h4 className="font-semibold">{question.title}</h4>
                    <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{question.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(question.created_at).toLocaleDateString("ja-JP")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                まだ質問がありません
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}