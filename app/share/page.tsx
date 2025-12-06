"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronLeft } from "lucide-react"
import { getMockFaculties, getMockDepartments, getMockSubjects, getMockProfessors, getMockDepartmentById, getMockSubjectById } from "@/lib/mock-data"


export default function SharePage() {
  const [step, setStep] = useState(1) // 1: 選択, 2: アップロード

  const [selectedFaculty, setSelectedFaculty] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedProfessor, setSelectedProfessor] = useState("")
  const [year, setYear] = useState("")
  const [semester, setSemester] = useState("")
  const [examType, setExamType] = useState("")

  const [title, setTitle] = useState("") // PDFにはないが、元のコードにあったため維持
  const [content, setContent] = useState("") // PDFでは画像アップロードだが、デモはテキスト入力

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const faculties = getMockFaculties()
  const departments = selectedFaculty ? getMockDepartments(selectedFaculty) : []
  const subjects = selectedDepartment ? getMockSubjects(selectedDepartment) : []
  const professors = selectedSubject ? getMockProfessors(selectedSubject) : []

  // 選択リセット
  useEffect(() => {
    setSelectedDepartment("")
    setSelectedSubject("")
    setSelectedProfessor("")
  }, [selectedFaculty])

  useEffect(() => {
    setSelectedSubject("")
    setSelectedProfessor("")
  }, [selectedDepartment])

  useEffect(() => {
    setSelectedProfessor("")
  }, [selectedSubject])

  const handleNextStep = () => {
    // ここでバリデーション
    if (step === 1 && selectedFaculty && selectedDepartment && selectedSubject && selectedProfessor) {
      setStep(2)
    } else if (step === 1) {
      alert("すべての項目を選択してください")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // バリデーション
    if (!title.trim()) {
      alert("タイトルを入力してください")
      return
    }

    if (!content.trim()) {
      alert("問題内容を入力してください")
      return
    }

    setIsLoading(true)

    try {
      // ここで実際のアップロードAPIを呼び出します
      // 例: const response = await fetch('/api/exams', { ... })
      
      // デモ用：2秒待機
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // PDF 4枚目（アップロード成功）に遷移
      // 本来は sign-up-success ではなく、upload-success ページが良いが、
      // 既存のファイル構成を活かすため、文言が似ている sign-up-success を流用
      router.push("/auth/sign-up-success") // 共有完了画面にリダイレクト
    } catch (err) {
      alert("アップロードに失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-svh bg-background">
      
      {/* PDFの青いヘッダー (戻るボタン付き) */}
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button 
            variant="ghost" 
            size="icon" 
            asChild={step === 1} // ステップ1ならホームへ
            onClick={step === 2 ? () => setStep(1) : undefined} // ステップ2ならステップ1へ
            className="hover:bg-primary/80"
          >
            {step === 1 ? (
              <Link href="/home">
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">戻る</span>
              </Link>
            ) : (
              <>
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">戻る</span>
              </>
            )}
          </Button>
          <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">
            過去問共有
          </h1>
          <div></div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto flex flex-1 flex-col p-4">
        {step === 1 && (
          // PDF 2枚目: 選択画面
          <div className="w-full max-w-md mx-auto space-y-8 py-8">
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="faculty" className="text-base font-semibold">学部・専攻</Label>
                <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                  <SelectTrigger id="faculty" className="h-12 rounded-2xl shadcn-select-trigger">
                    <SelectValue placeholder="学部を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {faculties.map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id}>
                        {faculty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="department" className="text-base font-semibold">学科・コース</Label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment} disabled={!selectedFaculty}>
                  <SelectTrigger id="department" className="h-12 rounded-2xl shadcn-select-trigger">
                    <SelectValue placeholder="学科を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem key={department.id} value={department.id}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="subject" className="text-base font-semibold">科目</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject} disabled={!selectedDepartment}>
                  <SelectTrigger id="subject" className="h-12 rounded-2xl shadcn-select-trigger">
                    <SelectValue placeholder="科目を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="professor" className="text-base font-semibold">教授</Label>
                <Select value={selectedProfessor} onValueChange={setSelectedProfessor} disabled={!selectedSubject}>
                  <SelectTrigger id="professor" className="h-12 rounded-2xl shadcn-select-trigger">
                    <SelectValue placeholder="教授を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {professors.map((professor) => (
                      <SelectItem key={professor.id} value={professor.id}>
                        {professor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleNextStep}
              className="w-full max-w-xs mx-auto flex shadcn-button"
            >
              次へ
            </Button>
          </div>
        )}

        {step === 2 && (
          // PDF 3枚目: アップロード画面
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-8 py-8">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">{getMockDepartmentById(selectedDepartment)?.name}</h2>
              <p className="text-lg text-muted-foreground">{getMockSubjectById(selectedSubject)?.name}</p>
            </div>
            
            <div className="space-y-6">
              {/* PDFでは「Import +」だが、デモなのでテキスト入力 */}
               <div className="grid gap-2">
                <Label htmlFor="title" className="text-base font-semibold">タイトル</Label>
                <Input
                  id="title"
                  placeholder="例: 2023年度 期末試験"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12 rounded-2xl"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content" className="text-base font-semibold">問題内容 (デモ用)</Label>
                <Textarea
                  id="content"
                  placeholder="PDFのデザインでは画像アップロードですが、デモのためテキスト入力で代替します。"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="rounded-2xl"
                />
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full max-w-xs mx-auto flex shadcn-button"
              disabled={isLoading}
            >
              {isLoading ? "アップロード中..." : "アップロードする"}
            </Button>
          </form>
        )}
      </main>
    </div>
  )
}