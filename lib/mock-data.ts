// モックデータ: サンプルプロジェクト用

export const mockUser = {
  id: "mock-user-1",
  email: "demo@example.com",
  display_name: "デモユーザー",
  created_at: new Date().toISOString(),
}

export const mockFaculties = [
  { id: "1", name: "工学部", created_at: new Date().toISOString() },
  { id: "2", name: "システム理工学部", created_at: new Date().toISOString() },
  { id: "3", name: "デザイン工学部", created_at: new Date().toISOString() },
  { id: "4", name: "建築学部", created_at: new Date().toISOString() },
]

export const mockDepartments = [
  { id: "1", faculty_id: "1", name: "情報・通信工学科", created_at: new Date().toISOString() },
  { id: "2", faculty_id: "1", name: "機械工学科", created_at: new Date().toISOString() },
  { id: "3", faculty_id: "1", name: "物質化学科", created_at: new Date().toISOString() },
  { id: "4", faculty_id: "1", name: "電気電子工学科", created_at: new Date().toISOString() },
  { id: "5", faculty_id: "1", name: "土木工学科", created_at: new Date().toISOString() },
  { id: "6", faculty_id: "1", name: "先進国際学科", created_at: new Date().toISOString() },
  { id: "7", faculty_id: "2", name: "電子情報システム学科", created_at: new Date().toISOString() },
  { id: "8", faculty_id: "2", name: "機械制御システム学科", created_at: new Date().toISOString() },
  { id: "9", faculty_id: "2", name: "環境システム学科", created_at: new Date().toISOString() },
  { id: "10", faculty_id: "2", name: "生命科学科", created_at: new Date().toISOString() },
  { id: "11", faculty_id: "2", name: "数理科学科", created_at: new Date().toISOString() },
  { id: "12", faculty_id: "3", name: "デザイン工学科", created_at: new Date().toISOString() },
  { id: "13", faculty_id: "4", name: "建築学科", created_at: new Date().toISOString() },
]

export const mockSubjects = [
  { id: "1", department_id: "1", name: "情報通信コース", created_at: new Date().toISOString() },
  { id: "2", department_id: "1", name: "情報工学コース", created_at: new Date().toISOString() },
  { id: "3", department_id: "2", name: "基幹機械コース", created_at: new Date().toISOString() },
  { id: "4", department_id: "2", name: "先進機械コース", created_at: new Date().toISOString() },
  { id: "5", department_id: "3", name: "環境・物質工学コース", created_at: new Date().toISOString() },
  { id: "6", department_id: "3", name: "化学・生命工学コース", created_at: new Date().toISOString() },
  { id: "7", department_id: "4", name: "電気・ロボット工学コース", created_at: new Date().toISOString() },
  { id: "8", department_id: "4", name: "先端電子工学コース", created_at: new Date().toISOString() },
  { id: "9", department_id: "5", name: "都市・環境コース", created_at: new Date().toISOString() },
  { id: "10", department_id: "6", name: "先進国際コース", created_at: new Date().toISOString() },
  { id: "11", department_id: "7", name: "電子情報システムコース", created_at: new Date().toISOString() },
  { id: "12", department_id: "8", name: "機械制御システムコース", created_at: new Date().toISOString() },
  { id: "13", department_id: "9", name: "環境システムコース", created_at: new Date().toISOString() },
  { id: "14", department_id: "10", name: "生命科学コース", created_at: new Date().toISOString() },
  { id: "15", department_id: "10", name: "生命医工学コース", created_at: new Date().toISOString() },
  { id: "16", department_id: "11", name: "数理科学コース", created_at: new Date().toISOString() },
  { id: "17", department_id: "12", name: "社会情報システムコース", created_at: new Date().toISOString() },
  { id: "18", department_id: "12", name: "UXデザインコース", created_at: new Date().toISOString() },
  { id: "19", department_id: "12", name: "プロダクトデザインコース", created_at: new Date().toISOString() },
  { id: "20", department_id: "13", name: "APコース", created_at: new Date().toISOString() },
  { id: "21", department_id: "13", name: "SAコース", created_at: new Date().toISOString() },
  { id: "22", department_id: "13", name: "UAコース", created_at: new Date().toISOString() },
]

export const mockProfessors = [
  { id: "1", subject_id: "1", name: "田中太郎", created_at: new Date().toISOString() },
  { id: "2", subject_id: "1", name: "佐藤花子", created_at: new Date().toISOString() },
  { id: "3", subject_id: "2", name: "鈴木一郎", created_at: new Date().toISOString() },
  { id: "4", subject_id: "3", name: "山田次郎", created_at: new Date().toISOString() },
  { id: "5", subject_id: "5", name: "高橋三郎", created_at: new Date().toISOString() },
]

export const mockExams = [
  {
    id: "1",
    professor_id: "1",
    title: "2023年度 中間試験",
    year: 2023,
    semester: "前期",
    exam_type: "中間試験",
    content:
      "1. 二分探索木について説明せよ。\n2. クイックソートのアルゴリズムを擬似コードで記述せよ。\n3. ハッシュテーブルの衝突解決法を2つ挙げ、それぞれの特徴を述べよ。",
    user_id: "mock-user-1",
    created_at: new Date("2023-07-15").toISOString(),
  },
  {
    id: "2",
    professor_id: "1",
    title: "2023年度 期末試験",
    year: 2023,
    semester: "前期",
    exam_type: "期末試験",
    content:
      "1. グラフの深さ優先探索（DFS）と幅優先探索（BFS）について説明せよ。\n2. 動的計画法を用いたナップサック問題の解法を説明せよ。\n3. 最短経路問題のアルゴリズムを2つ挙げ、それぞれの計算量を述べよ。",
    user_id: "mock-user-1",
    created_at: new Date("2023-09-20").toISOString(),
  },
  {
    id: "3",
    professor_id: "2",
    title: "2024年度 中間試験",
    year: 2024,
    semester: "前期",
    exam_type: "中間試験",
    content:
      "1. 平衡二分探索木（AVL木）について説明せよ。\n2. ヒープソートのアルゴリズムと計算量について述べよ。\n3. 赤黒木の性質を列挙し、その利点を説明せよ。",
    user_id: "mock-user-1",
    created_at: new Date("2024-07-10").toISOString(),
  },
]

export const mockQuestions = [
  {
    id: "1",
    exam_id: "1",
    professor_id: "1",
    user_id: "mock-user-1",
    title: "二分探索木の削除操作について",
    content: "二分探索木でノードを削除する際、子が2つある場合の処理方法について詳しく教えてください。",
    created_at: new Date("2023-07-20").toISOString(),
  },
  {
    id: "2",
    exam_id: "2",
    professor_id: "1",
    user_id: "mock-user-1",
    title: "ダイクストラ法の実装について",
    content: "ダイクストラ法を実装する際、優先度付きキューを使う理由を教えてください。",
    created_at: new Date("2023-09-25").toISOString(),
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
