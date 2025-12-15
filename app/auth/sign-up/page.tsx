"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignUpPage() {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // バリデーション
    if (!displayName || !email || !password || !repeatPassword) {
      setError("すべての項目を入力してください")
      setIsLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("有効なメールアドレスを入力してください")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("パスワードは6文字以上で入力してください")
      setIsLoading(false)
      return
    }

    if (password !== repeatPassword) {
      setError("パスワードが一致しません")
      setIsLoading(false)
      return
    }

    // ここで実際のサインアップAPIを呼び出します
    // 例: const response = await fetch('/api/auth/sign-up', { ... })
    
    // デモ用：2秒待機
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    router.push("/auth/sign-up-success")
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-bold text-balance">過去問共有アプリ</h1>
            <p className="text-sm text-muted-foreground text-balance">学習をサポートする過去問プラットフォーム</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">新規登録</CardTitle>
              <CardDescription>アカウントを作成して始めましょう</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="display-name">表示名</Label>
                    <Input
                      id="display-name"
                      type="text"
                      placeholder="山田太郎"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">メールアドレス</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">パスワード</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="repeat-password">パスワード（確認）</Label>
                    <Input
                      id="repeat-password"
                      type="password"
                      required
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full md:w-2/5 max-w-md h-36 text-xl rounded-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "登録中..." : "登録"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  すでにアカウントをお持ちの方は{" "}
                  <Link href="/auth/login" className="underline underline-offset-4 font-medium">
                    ログイン
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
