"use client"

import { useState } from "react"

import { FacultySelectionForm, emptyFacultySelection, isFacultySelectionComplete, type FacultySelectionValue } from "@/components/faculty-selection"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 閲覧用の学部・学科選択を1ページで完結させる
export default function FacultiesPage() {
  const { toast } = useToast()
  const [selection, setSelection] = useState<FacultySelectionValue>(emptyFacultySelection)

  const canProceed = isFacultySelectionComplete(selection)
  const submitHref = canProceed ? `/exams/view?professor=${selection.professorId}` : undefined

  const handleInvalid = () =>
    toast({
      title: "選択が不足しています",
      description: "学部・学科・科目・教授をすべて選択してください。",
      variant: "destructive",
    })

  const fixedWidthClass = "w-full max-w-[520px] md:w-[33vw]"

  return (
    <div className="flex flex-col min-h-svh bg-background">
      {/* ヘッダー */}
      <header className="bg-background text-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" href="/home" className="hover:bg-primary/80">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">戻る</span>
          </Button>
          <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">
            閲覧
          </h1>
          <div></div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto flex flex-1 flex-col p-4 py-8">
        <FacultySelectionForm
          value={selection}
          onChange={setSelection}
          onInvalidSubmit={handleInvalid}
          submitHref={submitHref}
          widthClassName={fixedWidthClass}
          className="flex-1"
          triggerClassName="h-14 rounded-full"
          buttonClassName="rounded-full"
        />
      </main>
    </div>
  )
}
