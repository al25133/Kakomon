import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { examContent, apiKey } = await request.json()

    if (!examContent) {
      return NextResponse.json({ error: "過去問の内容が必要です" }, { status: 400 })
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: "APIキーが設定されていません。設定画面で登録してください。" },
        { status: 400 }
      )
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "あなたは教育専門のAIアシスタントです。与えられた過去問に基づいて、類似した問題を生成してください。問題の難易度と形式は元の問題と同程度にしてください。",
          },
          {
            role: "user",
            content: `以下の過去問に基づいて、類似した問題を1つ生成してください：\n\n${examContent}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text() // ← jsonじゃない時もあるので text が安全
      console.error("OpenAI API Error:", errorText)
      return NextResponse.json(
        { error: "AI APIの呼び出しに失敗しました。APIキーを確認してください。" },
        { status: 500 }
      )
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return NextResponse.json({ error: "類題の生成に失敗しました" }, { status: 500 })
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Generate similar exam error:", error)
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 })
  }
}