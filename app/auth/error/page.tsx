import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"

// PDFのデザインカンプ (4枚目) のレイアウトを流用
export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex flex-col min-h-svh bg-background">
      
      {/* PDFの青いヘッダー (ロゴのみ) */}
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-center px-4">
          <h1 className="text-xl font-bold">
            過去問共有
          </h1>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center p-4 text-center">
        <div className="flex flex-col items-center gap-10">
          
          <h2 className="text-2xl font-bold text-destructive">
            認証エラー
          </h2>

          <AlertTriangle className="h-32 w-32 text-destructive" strokeWidth={1.5} />

          <p className="text-base text-muted-foreground max-w-md">
            {params?.error ? (
              <span>エラーが発生しました: {params.error}</span>
            ) : (
              <span>予期しないエラーが発生しました。</span>
            )}
          </p>
          
          <Button className="w-full max-w-xs" size="default" href="/auth/login">
            ログイン画面へ戻る
          </Button>
        </div>
      </main>
    </div>
  )
}