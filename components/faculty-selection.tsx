"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getMockDepartments, getMockFaculties, getMockProfessors, getMockSubjects } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export type FacultySelectionValue = {
  facultyId: string
  departmentId: string
  subjectId: string
  professorId: string
}

export const emptyFacultySelection: FacultySelectionValue = {
  facultyId: "",
  departmentId: "",
  subjectId: "",
  professorId: "",
}

export function isFacultySelectionComplete(value: FacultySelectionValue) {
  return Boolean(value.facultyId && value.departmentId && value.subjectId && value.professorId)
}

type FacultySelectionFormProps = {
  value: FacultySelectionValue
  onChange: (value: FacultySelectionValue) => void
  onSubmit?: (value: FacultySelectionValue) => void
  onInvalidSubmit?: () => void
  submitLabel?: string
  submitHref?: string
  disableSubmit?: boolean
  widthClassName?: string
  className?: string
  triggerClassName?: string
  buttonClassName?: string
}

export function FacultySelectionForm({
  value,
  onChange,
  onSubmit,
  onInvalidSubmit,
  submitLabel = "次へ",
  submitHref,
  disableSubmit = false,
  widthClassName,
  className,
  triggerClassName,
  buttonClassName,
}: FacultySelectionFormProps) {
  const widthClass = widthClassName ?? "w-[33vw] min-w-[33vw] max-w-[33vw]"
  const triggerClass = triggerClassName ?? "h-14 rounded-full shadcn-select-trigger"

  const faculties = useMemo(() => getMockFaculties(), [])
  const departments = useMemo(() => (value.facultyId ? getMockDepartments(value.facultyId) : []), [value.facultyId])
  const subjects = useMemo(() => (value.departmentId ? getMockSubjects(value.departmentId) : []), [value.departmentId])
  const professors = useMemo(() => (value.subjectId ? getMockProfessors(value.subjectId) : []), [value.subjectId])

  const canSubmit = isFacultySelectionComplete(value) && !disableSubmit
  const buttonHref = canSubmit && submitHref ? submitHref : undefined

  const handleSubmit = () => {
    if (!isFacultySelectionComplete(value) || disableSubmit) {
      onInvalidSubmit?.()
      return
    }
    onSubmit?.(value)
  }

  return (
    <div className={cn("w-full mx-auto space-y-8 py-4 flex flex-col items-center", className)}>
      <div className={cn("space-y-8", widthClass)}>
        <div className="grid gap-2">
          <Label htmlFor="faculty" className="text-base font-semibold">学部・専攻</Label>
          <Select
            value={value.facultyId}
            onValueChange={(facultyId) =>
              onChange({ facultyId, departmentId: "", subjectId: "", professorId: "" })
            }
          >
            <SelectTrigger id="faculty" className={triggerClass}>
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
          <Select
            value={value.departmentId}
            onValueChange={(departmentId) =>
              onChange({
                ...value,
                departmentId,
                subjectId: "",
                professorId: "",
              })
            }
            disabled={!value.facultyId}
          >
            <SelectTrigger id="department" className={triggerClass}>
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
          <Select
            value={value.subjectId}
            onValueChange={(subjectId) =>
              onChange({
                ...value,
                subjectId,
                professorId: "",
              })
            }
            disabled={!value.departmentId}
          >
            <SelectTrigger id="subject" className={triggerClass}>
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
          <Select
            value={value.professorId}
            onValueChange={(professorId) => onChange({ ...value, professorId })}
            disabled={!value.subjectId}
          >
            <SelectTrigger id="professor" className={triggerClass}>
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
          href={buttonHref}
          onClick={handleSubmit}
          className={cn(widthClass, "no-underline", buttonClassName)}
          size="default"
          disabled={disableSubmit}
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  )
}
