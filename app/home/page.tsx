import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { BookOpen, Share2, User, Settings } from "lucide-react"
import { mockUser } from "@/lib/mock-data"

export default function HomePage() {
  return (
    <div className="min-h-svh bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">過去問共有アプリ</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">アカウント</span>
            </Button>
            <Button variant="ghost" size="icon" href="/settings">
              <Settings className="h-5 w-5" />
              <span className="sr-only">設定</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">ようこそ、{mockUser.display_name}さん</h2>
          <p className="text-muted-foreground">過去問を閲覧したり、共有したりできます</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>勉強する</CardTitle>
                  <CardDescription>過去問を閲覧・類題作成・質問</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg" href="/study/faculties">
                始める
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>共有する</CardTitle>
                  <CardDescription>過去問を投稿して共有</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-transparent" size="lg" variant="outline" href="/share">
                投稿する
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
