"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ChevronLeft } from "lucide-react"
import { getMockFaculties, getMockDepartments, getMockSubjects, getMockProfessors } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

// 閲覧用の学部・学科選択を1ページで完結させる
export default function FacultiesPage() {
  const { toast } = useToast()
  const fixedWidthClass = "w-[33vw] min-w-[33vw] max-w-[33vw]"

  const [selectedFaculty, setSelectedFaculty] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedProfessor, setSelectedProfessor] = useState("")

  const faculties = getMockFaculties()
  const departments = selectedFaculty ? getMockDepartments(selectedFaculty) : []
  const subjects = selectedDepartment ? getMockSubjects(selectedDepartment) : []
  const professors = selectedSubject ? getMockProfessors(selectedSubject) : []

  // 上位が変わったら下位選択をリセット
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

  const canProceed = Boolean(selectedFaculty && selectedDepartment && selectedSubject && selectedProfessor)

  const handleNext = () => {
    if (!canProceed) {
      toast({
        title: "選択が不足しています",
        description: "学部・学科・科目・教授をすべて選択してください。",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-svh bg-background">
      {/* ヘッダー */}
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" href="/home" className="hover:bg-primary/80">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">戻る</span>
          </Button>
          <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">
            閲覧設定
          </h1>
          <div></div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto flex flex-1 flex-col p-4 py-8">
        <div className="w-full mx-auto space-y-8 py-4 flex flex-col items-center">
          <div className={`space-y-8 ${fixedWidthClass}`}>
            <div className="grid gap-2">
              <Label htmlFor="faculty" className="text-base font-semibold">学部・専攻</Label>
              <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                <SelectTrigger id="faculty" className="h-14 rounded-full">
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
                <SelectTrigger id="department" className="h-14 rounded-full">
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
                <SelectTrigger id="subject" className="h-14 rounded-full">
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
                <SelectTrigger id="professor" className="h-14 rounded-full">
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

          <div className="flex justify-center w-full">
            <Button
              href={canProceed ? `/study/professor/${selectedProfessor}` : undefined}
              onClick={!canProceed ? handleNext : undefined}
              className={`${fixedWidthClass} no-underline`}
              size="default"
            >
              次へ
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
