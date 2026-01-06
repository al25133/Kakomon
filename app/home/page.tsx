import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Settings, User } from "lucide-react"

export default function HomePage() {
  return (
    <div className="relative min-h-svh bg-background">
      <header
        className="fixed top-4 right-4 z-20 flex items-center gap-2 pointer-events-auto"
        style={{ left: "auto", right: "1rem" }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent hover:bg-transparent focus-visible:ring-0"
          asChild
        >
          <Link href="/account" className="no-underline">
            <User className="h-5 w-5" />
            <span className="sr-only">アカウント</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent hover:bg-transparent focus-visible:ring-0"
          asChild
        >
          <Link href="/settings" className="no-underline">
            <Settings className="h-5 w-5" />
            <span className="sr-only">設定</span>
          </Link>
        </Button>
      </header>

      <main className="flex min-h-svh flex-col items-center justify-start px-6 pt-20 pb-12">
        <div className="flex w-full flex-col items-center gap-4 text-center">
          <p className="text-base text-foreground">芝浦工業大学の過去問共有にようこそ</p>
          <h1 className="text-3xl font-black tracking-wide uppercase text-foreground">過去問共有</h1>
          <div className="flex w-full flex-col items-center">
            <Button asChild size="lg" className="w-2/5 min-w-[12rem] no-underline">
              <Link href="/share" className="no-underline">共有</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-2/5 min-w-[12rem] no-underline">
              <Link href="/study/faculties" className="no-underline">閲覧</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-2/5 min-w-[12rem] no-underline">
              <Link href="/exams/generate" className="no-underline">類題作成</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
