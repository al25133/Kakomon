"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// PDFのデザインカンプ (8枚目) に基づいてレイアウトを変更
export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // バリデーション
    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("有効なメールアドレスを入力してください")
      return
    }

    if (password.length < 6) {
      setError("パスワードは6文字以上です")
      return
    }

    setIsLoading(true)
    
    try {
      // ここで実際の認証APIを呼び出します
      // 例: const response = await fetch('/api/auth/login', { ... })
      
      // デモ用：2秒待機
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "ログイン成功",
        description: `${email} でログインしました`,
      })
      
      router.push("/home")
    } catch (err) {
      setError("ログインに失敗しました。もう一度お試しください。")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-svh bg-background">
      
      {/* PDFデザインのヘッダー (戻るボタン付き) */}
      <header className="bg-background text-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" href="/" className="hover:bg-primary/80">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">戻る</span>
          </Button>
          <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">
            ログイン
          </h1>
          {/* 右側は空 */}
          <div></div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto flex flex-1 flex-col justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm mx-auto space-y-10">
          
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-base font-semibold">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="大学のメールアドレス"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="h-14 rounded-lg"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-base font-semibold">パスワード</Label>
              <Input
                id="password"
                type="password"
                placeholder="パスワードを入力"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="h-14 rounded-lg"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          
          <div className="flex flex-col items-center gap-6">
            <Button 
              type="submit" 
              className="w-full md:w-2/5 max-w-md h-36 text-xl rounded-full"
              size="default"
              disabled={isLoading}>
              {isLoading ? "ログイン中..." : "ログイン"}
            </Button>

            <Button variant="link" className="text-muted-foreground" href="/auth/sign-up">
              新規作成
            </Button>
          </div>
          
        </form>
      </main>
    </div>
  )
}