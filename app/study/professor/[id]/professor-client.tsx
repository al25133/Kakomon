"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getMockProfessorById, getMockSubjectById } from "@/lib/mock-data"

type Props = {
  initialId: string
}

export default function ProfessorClient({ initialId }: Props) {
  const params = useParams()
  const runtimeId = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : undefined
  const resolvedId = (runtimeId || initialId || "").trim()
  const decodedId = resolvedId ? decodeURIComponent(resolvedId) : ""

  const { professor, subject } = useMemo(() => {
    const prof = decodedId ? getMockProfessorById(decodedId) : undefined
    return {
      professor: prof,
      subject: prof ? getMockSubjectById(prof.subject_id) : undefined,
    }
  }, [decodedId])

  if (!decodedId || !professor) {
    return (
      <div className="flex flex-col min-h-svh bg-background items-center justify-center gap-6 p-6 text-center">
        <p className="text-lg font-semibold text-foreground">教授が見つかりませんでした（ID: {decodedId || "不明"}）。</p>
        <Button href="/study/faculties" className="no-underline" size="default">
          一覧に戻る
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-svh bg-background">
      {/* PDFのヘッダー */}
      <header className="bg-background text-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" href="/study/faculties" className="hover:bg-primary/80">
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
        <div className="flex flex-col items-center gap-12 w-full">
          {/* 閲覧ボタン (PDFのプライマリボタン) */}
          <Button className="md:w-2/5 no-underline" size="default" href={`/exams/view?professor=${decodedId}`}>
            過去問を閲覧
          </Button>

          {/* 類題作成ボタン (PDFのセカンダリボタン) */}
          <Button
            className="md:w-2/5 no-underline"
            size="default"
            variant="secondary"
            href={`/exams/generate?professor=${decodedId}`}
          >
            類題を作成
          </Button>

          {/* 質問するボタン (PDFのセカンダリボタン) */}
          <Button
            className="md:w-2/5 no-underline"
            size="default"
            variant="secondary"
            href={`/questions/create?professor=${decodedId}`}
          >
            質問する
          </Button>
        </div>
      </main>
    </div>
  )
}
