
export const mockUser = {
  id: "mock-user-1",
  email: "demo@shibaura-it.ac.jp",
  display_name: "芝浦 太郎",
  created_at: new Date().toISOString(),
}

export const mockFaculties = [
  { id: "1", name: "工学部", created_at: new Date().toISOString() },
  { id: "2", name: "システム理工学部", created_at: new Date().toISOString() },
  { id: "3", name: "デザイン工学部", created_at: new Date().toISOString() },
  { id: "4", name: "建築学部", created_at: new Date().toISOString() },
]

export const mockDepartments = [
  { id: "1a", faculty_id: "1", name: "情報・通信工学課程 情報通信コース", created_at: new Date().toISOString() },
  { id: "1b", faculty_id: "1", name: "情報・通信工学課程 情報工学コース", created_at: new Date().toISOString() },
  { id: "2a", faculty_id: "1", name: "機械工学科 基幹機械コース", created_at: new Date().toISOString() },
  { id: "2b", faculty_id: "1", name: "機械工学科 先進機械コース", created_at: new Date().toISOString() },
  { id: "3a", faculty_id: "1", name: "物質化学科 環境・物質工学コース", created_at: new Date().toISOString() },
  { id: "3b", faculty_id: "1", name: "物質化学科 化学・生命工学コース", created_at: new Date().toISOString() },
  { id: "4a", faculty_id: "1", name: "電気電子工学科 電気・ロボット工学コース", created_at: new Date().toISOString() },
  { id: "4b", faculty_id: "1", name: "電気電子工学科 先端電子工学コース", created_at: new Date().toISOString() },
  { id: "5", faculty_id: "1", name: "土木工学科", created_at: new Date().toISOString() },
  { id: "6", faculty_id: "1", name: "先進国際学科", created_at: new Date().toISOString() },
  { id: "7", faculty_id: "2", name: "電子情報システム学科 電子情報システムコース", created_at: new Date().toISOString() },
  { id: "8", faculty_id: "2", name: "機械制御システム学科 機械制御システムコース", created_at: new Date().toISOString() },
  { id: "9", faculty_id: "2", name: "環境システム学科 環境システムコース", created_at: new Date().toISOString() },
  { id: "10a", faculty_id: "2", name: "生命科学科 生命科学コース", created_at: new Date().toISOString() },
  { id: "10b", faculty_id: "2", name: "生命科学科 生命医工学コース", created_at: new Date().toISOString() },
  { id: "11", faculty_id: "2", name: "数理科学科 数理科学コース", created_at: new Date().toISOString() },
  { id: "12a", faculty_id: "3", name: "デザイン工学科 社会情報システムコース", created_at: new Date().toISOString() },
  { id: "12b", faculty_id: "3", name: "デザイン工学科 UXデザインコース", created_at: new Date().toISOString() },
  { id: "12c", faculty_id: "3", name: "デザイン工学科 プロダクトデザインコース", created_at: new Date().toISOString() },
  { id: "13a", faculty_id: "4", name: "建築学科 APコース", created_at: new Date().toISOString() },
  { id: "13b", faculty_id: "4", name: "建築学科 SAコース", created_at: new Date().toISOString() },
  { id: "13c", faculty_id: "4", name: "建築学科 UAコース", created_at: new Date().toISOString() },
]

// 新しい科目 (department 単位で紐づく実際の科目)
export const mockSubjects = [
  { id: "s1", department_id: "1a", name: "線形代数", created_at: new Date().toISOString() },
  { id: "s2", department_id: "1b", name: "プログラミング基礎", created_at: new Date().toISOString() },
  { id: "s3", department_id: "2a", name: "機械力学", created_at: new Date().toISOString() },
  { id: "s4", department_id: "2b", name: "材料力学", created_at: new Date().toISOString() },
  { id: "s5", department_id: "3a", name: "有機化学", created_at: new Date().toISOString() },
  { id: "s6", department_id: "3b", name: "物理化学", created_at: new Date().toISOString() },
  { id: "s7", department_id: "4a", name: "電磁気学", created_at: new Date().toISOString() },
  { id: "s8", department_id: "4b", name: "回路理論", created_at: new Date().toISOString() },
  { id: "s9", department_id: "7", name: "情報理論", created_at: new Date().toISOString() },
  { id: "s10", department_id: "8", name: "制御工学", created_at: new Date().toISOString() },
  { id: "s11", department_id: "9", name: "環境計画", created_at: new Date().toISOString() },
  { id: "s12", department_id: "13a", name: "建築設計", created_at: new Date().toISOString() },
]

export const mockProfessors = [
  { id: "1", subject_id: "s1", name: "田中太郎", created_at: new Date().toISOString() },
  { id: "2", subject_id: "s2", name: "佐藤花子", created_at: new Date().toISOString() },
  { id: "3", subject_id: "s3", name: "鈴木一郎", created_at: new Date().toISOString() },
  { id: "4", subject_id: "s4", name: "山田次郎", created_at: new Date().toISOString() },
  { id: "5", subject_id: "s5", name: "中村三郎", created_at: new Date().toISOString() },
  { id: "6", subject_id: "s6", name: "小林四郎", created_at: new Date().toISOString() },
  { id: "7", subject_id: "s7", name: "加藤五郎", created_at: new Date().toISOString() },
  { id: "8", subject_id: "s8", name: "吉田六郎", created_at: new Date().toISOString() },
  { id: "9", subject_id: "s9", name: "高橋三郎", created_at: new Date().toISOString() },
  { id: "10", subject_id: "s10", name: "斎藤七郎", created_at: new Date().toISOString() },
  { id: "11", subject_id: "s11", name: "渡辺八郎", created_at: new Date().toISOString() },
  { id: "12", subject_id: "s12", name: "伊藤九郎", created_at: new Date().toISOString() },
]

export const mockExams = [
  {
    id: "e1",
    professor_id: "1",
    title: "2023年度 前期中間試験",
    year: 2023,
    semester: "前期",
    exam_type: "中間試験",
    content:
      "1. 単純支持はりのせん断力図(SFD)と曲げモーメント図(BMD)を描け。\n2. 応力とひずみの関係について、フックの法則を用いて説明せよ。",
    user_id: "mock-user-1",
    created_at: new Date("2023-06-20").toISOString(),
  },
  {
    id: "e2",
    professor_id: "2",
    title: "2023年度 後期期末試験",
    year: 2023,
    semester: "後期",
    exam_type: "期末試験",
    content:
      "1. クイックソートのアルゴリズムを擬似コードで記述し、計算量について考察せよ。\n2. 二分探索木の探索、挿入、削除の操作について説明せよ。",
    user_id: "mock-user-1",
    created_at: new Date("2024-01-25").toISOString(),
  },
  {
    id: "e3",
    professor_id: "5",
    title: "2024年度 設計課題講評",
    year: 2024,
    semester: "前期",
    exam_type: "課題提出",
    content:
      "「都市の中の隠れ家」をテーマにした設計課題において、各自のコンセプトと空間構成の意図を記述すること。また、周辺環境との関係性についても触れること。",
    user_id: "mock-user-1",
    created_at: new Date("2024-07-15").toISOString(),
  },
   {
    id: "4",
    professor_id: "6",
    title: "2024年度 中間試験",
    year: 2024,
    semester: "前期",
    exam_type: "中間試験",
    content:
      "/linear_algebra_2024_first_midterm.tex.pdf",
    user_id: "mock-user-1",
    created_at: new Date("2024-07-10").toISOString(),
  },
]

export const mockQuestions = [
  {
    id: "q1",
    exam_id: "e1",
    professor_id: "p1",
    user_id: "mock-user-1",
    title: "SFDの符号について",
    content: "せん断力の符号の定義がいまいち分かりません。時計回りに回そうとする力がプラスで合っていますか？",
    created_at: new Date("2023-06-22").toISOString(),
  },
]

export const mockApiKey = {
  user_id: "mock-user-1",
  api_key: "",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

// ヘルパー関数
export function getMockFaculties() {
  return mockFaculties
}

export function getMockDepartments(facultyId: string) {
  return mockDepartments.filter((d) => d.faculty_id === facultyId)
}

export function getMockSubjects(departmentId: string) {
  return mockSubjects.filter((s) => s.department_id === departmentId)
}

export function getMockProfessors(subjectId: string) {
  return mockProfessors.filter((p) => p.subject_id === subjectId)
}

export function getMockProfessorById(id: string) {
  return mockProfessors.find((p) => p.id === id)
}

export function getMockExams(professorId: string) {
  return mockExams.filter((e) => e.professor_id === professorId)
}

export function getMockExamById(id: string) {
  return mockExams.find((e) => e.id === id)
}

export function getMockQuestions(examId: string) {
  return mockQuestions.filter((q) => q.exam_id === examId)
}

export function getMockSubjectById(id: string) {
  return mockSubjects.find((s) => s.id === id)
}

export function getMockDepartmentById(id: string) {
  return mockDepartments.find((d) => d.id === id)
}

export function getMockFacultyById(id: string) {
  return mockFaculties.find((f) => f.id === id)
}