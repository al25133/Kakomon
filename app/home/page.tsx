import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { BookOpen, Share2, User, Settings } from "lucide-react"
import { mockUser } from "@/lib/mock-data"

export default function HomePage() {
  return (
    <div className="min-h-svh bg-gradient-to-br from-background to-muted">
      {/* ヘッダー */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">過去問共有アプリ</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">アカウント</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">設定</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* メイン */}
      <main className="container px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            ようこそ、{mockUser.display_name}さん
          </h2>
          <p className="text-muted-foreground">
            過去問を閲覧したり、共有したりできます
          </p>
        </div>

        {/* ここが「縦一列」のコンテナ */}
        <div className="flex flex-col gap-6 max-w-md">
          {/* 閲覧 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>閲覧</CardTitle>
                  <CardDescription>
                    過去問を閲覧・類題作成・質問
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" size="lg" variant="outline">
                <Link href="/study/faculties">始める</Link>
              </Button>
            </CardContent>
          </Card>

          {/* 共有する */}
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
              <Button asChild className="w-full" size="lg" variant="outline">
                <Link href="/share">投稿する</Link>
              </Button>
            </CardContent>
          </Card>

          {/* 類題作成 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>類題作成</CardTitle>
                  <CardDescription>
                    既存の過去問から類題を作成
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" size="lg" variant="outline">
                <Link href="ページを作ってに置く">類題作成へ</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
