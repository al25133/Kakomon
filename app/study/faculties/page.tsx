import { Button } from "@/components/ui/button"
 
import { ChevronLeft } from "lucide-react"
import { getMockFaculties } from "@/lib/mock-data"

// PDF 5枚目 (閲覧画面) のデザインを適用
export default function FacultiesPage() {
  const faculties = getMockFaculties()

  return (
    <div className="flex flex-col min-h-svh bg-background">
      
      {/* PDFの青いヘッダー */}
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" href="/home" className="hover:bg-primary/80">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">戻る</span>
          </Button>
          <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">
            学部選択
          </h1>
          <div></div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto flex flex-1 flex-col p-4 py-8">
        <div className="w-full max-w-md mx-auto space-y-6">
          
          <h2 className="text-xl font-semibold text-center text-foreground">
            学部・専攻を選んでください
          </h2>

          <div className="flex flex-col gap-4">
            {faculties.map((faculty) => (
              <Button
                key={faculty.id}
                variant="secondary" // PDFのグレーボタン (#E0E0E0)
                className="w-full justify-start" // UIコンポーネントのデフォルトスタイルを使用
                size="default" // h-14
                href={`/study/departments?faculty=${faculty.id}`}
              >
                {faculty.name}
              </Button>
            ))}
          </div>
          
        </div>
      </main>
    </div>
  )
}