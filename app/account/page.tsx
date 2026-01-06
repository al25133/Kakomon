import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
 
import { ChevronLeft, User, Mail, Calendar, Settings, LogOut } from "lucide-react"
import { mockUser, mockExams, mockQuestions } from "@/lib/mock-data"

// PDFデザイン言語 (設定画面のデザイン) に基づいて再構築
export default function AccountPage() {
  const examsCount = mockExams.filter((e) => e.user_id === mockUser.id).length
  const questionsCount = mockQuestions.filter((q) => q.user_id === mockUser.id).length

  return (
    <div className="flex flex-col min-h-svh bg-background">
      
      {/* PDFのヘッダーデザインを再現 */}
      <header className="bg-background text-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" href="/home" className="hover:bg-primary/80">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">戻る</span>
          </Button>
          <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">
            アカウント
          </h1>
          <div></div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto max-w-2xl p-4 py-8">
        <div className="space-y-10">
          
          {/* プロフィール情報 */}
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center border">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{mockUser.display_name}</h2>
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                {mockUser.email}
              </p>
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                登録日: {new Date(mockUser.created_at || "").toLocaleDateString("ja-JP")}
              </p>
            </div>
          </div>

          <Separator />
          
          {/* アクティビティ統計 (PDFにはないが元の機能) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2 p-4 bg-muted rounded-2xl border">
              <p className="text-3xl font-bold">{examsCount}</p>
              <p className="text-sm text-muted-foreground">投稿した過去問</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-muted rounded-2xl border">
              <p className="text-3xl font-bold">{questionsCount}</p>
              <p className="text-sm text-muted-foreground">投稿した質問</p>
            </div>
          </div>

          <Separator />

          {/* メニュー */}
          <div className="space-y-4">
              <Button variant="secondary" className="w-full justify-start" size="default" href="/settings">
                <Settings className="h-5 w-5 mr-3" />
                設定
              </Button>
            
            {/* デモ用のダミーログアウトフォーム */}
            <form action="/api/auth/logout" method="post">
                <Button 
                  type="submit"
                  variant="secondary" 
                  className="w-full justify-start text-destructive hover:text-destructive" 
                  size="default">
                  <LogOut className="h-5 w-5 mr-3" />
                  ログアウト
                </Button>
            </form>
          </div>
          
        </div>
      </main>
    </div>
  )
}