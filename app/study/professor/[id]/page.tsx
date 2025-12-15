import ProfessorClient from "./professor-client"

// Static Export用にビルド時に生成するパスのリストを定義
export function generateStaticParams() {
  return mockProfessors.map((professor) => ({
    id: professor.id,
  }))
}

// サーバー側では params をそのままクライアントに渡し、クライアント側で再度 useParams で補完
export default function ProfessorDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return <ProfessorClient initialId={params?.id ?? ""} />
}