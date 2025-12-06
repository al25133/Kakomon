
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
  // 工学部
  { id: "101", faculty_id: "1", name: "機械工学課程", created_at: new Date().toISOString() },
  { id: "102", faculty_id: "1", name: "物質化学課程", created_at: new Date().toISOString() },
  { id: "103", faculty_id: "1", name: "電気電子工学課程", created_at: new Date().toISOString() },
  { id: "104", faculty_id: "1", name: "情報・通信工学課程", created_at: new Date().toISOString() },
  { id: "105", faculty_id: "1", name: "土木工学課程", created_at: new Date().toISOString() },
  { id: "106", faculty_id: "1", name: "先進国際課程", created_at: new Date().toISOString() },
  
  // システム理工学部
  { id: "201", faculty_id: "2", name: "電子情報システム学科", created_at: new Date().toISOString() },
  { id: "202", faculty_id: "2", name: "機械制御システム学科", created_at: new Date().toISOString() },
  { id: "203", faculty_id: "2", name: "環境システム学科", created_at: new Date().toISOString() },
  { id: "204", faculty_id: "2", name: "生命科学科", created_at: new Date().toISOString() },
  { id: "205", faculty_id: "2", name: "数理科学科", created_at: new Date().toISOString() },

  // デザイン工学部 (コースを学科レベルとして扱います)
  { id: "301", faculty_id: "3", name: "社会情報システムコース", created_at: new Date().toISOString() },
  { id: "302", faculty_id: "3", name: "UXコース", created_at: new Date().toISOString() },
  { id: "303", faculty_id: "3", name: "プロダクトコース", created_at: new Date().toISOString() },

  // 建築学部 (コースを学科レベルとして扱います)
  { id: "401", faculty_id: "4", name: "APコース", created_at: new Date().toISOString() }, // 先進的プロジェクトデザインコース
  { id: "402", faculty_id: "4", name: "SAコース", created_at: new Date().toISOString() }, // 空間・建築デザインコース
  { id: "403", faculty_id: "4", name: "UAコース", created_at: new Date().toISOString() }, // 都市・建築デザインコース
]

export const mockSubjects = [
  // 工学部 機械工学課程
  { id: "s101", department_id: "101", name: "材料力学", created_at: new Date().toISOString() },
  { id: "s102", department_id: "101", name: "熱力学", created_at: new Date().toISOString() },
  // 工学部 情報・通信工学課程
  { id: "s103", department_id: "104", name: "アルゴリズムとデータ構造", created_at: new Date().toISOString() },
  { id: "s104", department_id: "104", name: "通信ネットワーク", created_at: new Date().toISOString() },
  // システム理工学部 電子情報システム学科
  { id: "s201", department_id: "201", name: "回路理論", created_at: new Date().toISOString() },
  { id: "s202", department_id: "201", name: "信号処理", created_at: new Date().toISOString() },
  // デザイン工学部 UXコース
  { id: "s301", department_id: "302", name: "UXデザイン概論", created_at: new Date().toISOString() },
  { id: "s302", department_id: "302", name: "インタフェース設計", created_at: new Date().toISOString() },
  // 建築学部 SAコース
  { id: "s401", department_id: "402", name: "建築設計演習", created_at: new Date().toISOString() },
  { id: "s402", department_id: "402", name: "建築構造力学", created_at: new Date().toISOString() },
]

export const mockProfessors = [
  { id: "p1", subject_id: "s101", name: "佐藤 健一", created_at: new Date().toISOString() },
  { id: "p2", subject_id: "s103", name: "鈴木 愛", created_at: new Date().toISOString() },
  { id: "p3", subject_id: "s201", name: "高橋 誠", created_at: new Date().toISOString() },
  { id: "p4", subject_id: "s301", name: "田中 美咲", created_at: new Date().toISOString() },
  { id: "p5", subject_id: "s401", name: "伊藤 建築", created_at: new Date().toISOString() },
]

export const mockExams = [
  {
    id: "e1",
    professor_id: "p1",
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
    professor_id: "p2",
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
    professor_id: "p5",
    title: "2024年度 設計課題講評",
    year: 2024,
    semester: "前期",
    exam_type: "課題提出",
    content:
      "「都市の中の隠れ家」をテーマにした設計課題において、各自のコンセプトと空間構成の意図を記述すること。また、周辺環境との関係性についても触れること。",
    user_id: "mock-user-1",
    created_at: new Date("2024-07-15").toISOString(),
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