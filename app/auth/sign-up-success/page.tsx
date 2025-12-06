import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

// PDFのデザインカンプ (4枚目、アップロード成功画面) のレイアウトを流用
export default function SignUpSuccessPage() {
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
          
          {/* PDFの「ご協力ありがとうございます!!」の部分 */}
          <h2 className="text-2xl font-bold text-foreground">
            登録ありがとうございます！
          </h2>

          <CheckCircle className="h-32 w-32 text-primary" strokeWidth={1.5} />

          <p className="text-base text-muted-foreground max-w-md">
            ご登録いただいたメールアドレスに確認メールを送信しました。
            メール内のリンクをクリックしてアカウントを有効化してください。
          </p>
          
          <Button className="w-full max-w-xs" size="default" href="/auth/login">
            ログイン画面へ
          </Button>
        </div>
      </main>
    </div>
  )
}