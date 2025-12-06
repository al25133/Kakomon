"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState, useEffect } from "react"
import { ChevronLeft, Key, AlertCircle, CheckCircle } from "lucide-react"
import { mockUser } from "@/lib/mock-data"
import { Separator } from "@/components/ui/separator"

// PDFのデザイン言語に基づき、既存の「設定」画面を再構築
export default function SettingsPage() {
  const [displayName, setDisplayName] = useState(mockUser.display_name)
  const [apiKey, setApiKey] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedKey = localStorage.getItem("openai_api_key") || ""
    setApiKey(storedKey)
  }, [])

  const handleUpdateApiKey = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (!apiKey.trim()) {
        throw new Error("APIキーを入力してください")
      }
      localStorage.setItem("openai_api_key", apiKey)
      setSuccess("APIキーを保存しました")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "保存に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-svh bg-background">
      
      {/* PDFの青いヘッダー */}
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" href="/account" className="hover:bg-primary/80">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">戻る</span>
          </Button>
          <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">
            設定
          </h1>
          <div></div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto max-w-2xl p-4 py-8">
        <div className="space-y-10">

          {error && (
            <Alert variant="destructive" className="rounded-2xl">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="border-green-500 text-green-700 dark:text-green-400 rounded-2xl">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* プロフィール設定 (PDFのデザイン言語に合わせてCardを解除) */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">プロフィール</h2>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="display-name" className="text-base font-semibold">表示名</Label>
                <Input
                  id="display-name"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled
                  className="h-14 rounded-lg bg-muted"
                />
                <p className="text-sm text-muted-foreground">デモ版では変更できません</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-base font-semibold">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={mockUser.email}
                  disabled
                  className="h-14 rounded-lg bg-muted"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* APIキー設定 */}
          <form onSubmit={handleUpdateApiKey} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Key className="h-5 w-5" />
                AI機能のAPIキー設定
              </h2>
              <p className="text-muted-foreground">類題作成機能を使用するには、OpenAI APIキーが必要です</p>
            </div>
            
            <Alert className="rounded-2xl">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                APIキーはブラウザのローカルストレージに保存されます（デモ版）
              </AlertDescription>
            </Alert>

            <div className="grid gap-2">
              <Label htmlFor="api-key" className="text-base font-semibold">APIキー</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="h-14 rounded-lg"
              />
              <p className="text-sm text-muted-foreground">
                OpenAI APIキーは{" "}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  こちら
                </a>
                から取得できます
              </p>
            </div>

            <Button type="submit" disabled={isLoading} className="max-w-xs" size="default">
              {isLoading ? "保存中..." : "APIキーを保存"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}