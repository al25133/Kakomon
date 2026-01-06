git clone https://github.com/al25133/Kakomon.git
## Kakomon - 過去問共有デモ

芝浦工業大学の過去問をモックデータで閲覧・共有し、OpenAI API を使った簡易な類題生成を試せる Next.js 16 デモアプリです。バックエンドや永続化は未実装で、`lib/mock-data.ts` の配列とブラウザの `localStorage` だけで動作します。

---

## 実装済みの主な機能

- トップ: ルートは `/home` へリダイレクトし、共有・閲覧・類題作成ページへの導線を配置。
- 閲覧フロー: `/study/faculties` で学部→学科→科目→教授を一括選択し、`/study/professor/[id]` から過去問閲覧・類題作成・質問作成に遷移。全データはモック。
- 過去問閲覧: `/exams/view?professor=...` で教授別の過去問一覧を表示し、`/exams/[id]` で本文をテキスト表示。関連質問（モック）も同画面に表示。
- 質問投稿（デモ）: `/questions/create` でフォーム入力後、2 秒待機のデモ挙動でリダイレクトするのみ（保存や API 連携なし）。
- 過去問共有（デモ）: `/share` は 2 ステップでメタ情報と本文を入力し、完了後 `/auth/sign-up-success` に遷移するだけ。保存処理は未実装。
- 類題生成: `/exams/generate?professor=...` で過去問を選び、ローカルに保存した OpenAI API キーを使って `/api/generate-similar` を呼び出し生成テキストを表示。
- 追加の類題作成ページ: `/exams/generate` から `/api/generate-similar` を呼び出す簡易 UI を提供（同じ API キーが必要）。
- 設定: `/settings` で OpenAI API キーを入力し `localStorage` に保存。プロフィール項目はモックユーザー表示のみで編集不可。
- アカウント: `/account` にモックユーザーの情報と投稿数（モックから集計）を表示。`/api/auth/logout` はログアウト処理を持たず、ログイン画面へリダイレクトするだけ。
- 認証画面: `/auth/login`・`/auth/sign-up` はフロント側のバリデーションとダミー待機のみで、認証基盤との連携はありません。

---

## 技術スタック

| 領域 | 技術 | バージョン |
| --- | --- | --- |
| フレームワーク | Next.js | 16.0.10 |
| UI | React | 19.2.3 |
| 言語 | TypeScript | ^5 |
| スタイリング | Tailwind CSS | ^4.1.18 |
| コンポーネント | shadcn/ui (Radix UI ベース) | - |
| フォーム | react-hook-form | ^7.68.0 |
| バリデーション | zod | 4.1.13 |
| グラフ/通知 | recharts, sonner | 3.5.1 / ^2.0.7 |

---

## データと制限事項

- データソースは `lib/mock-data.ts` のモック配列のみ。DB や API への保存はありません。
- OpenAI API キーはブラウザの `localStorage` に保存し、サーバーには送信しません（`openai_api_key`）。
- ファイルアップロードや PDF 表示は未実装で、過去問本文はすべてテキスト表示。
- 認証・セッション管理は実装されておらず、ログイン/登録はデモ挙動です。

---

## セットアップ

### 前提
- Node.js 18 以上
- npm または pnpm

### 手順
```bash
git clone https://github.com/al25133/Kakomon.git
cd Kakomon
npm install      # または pnpm install
npm run dev      # または pnpm dev
```

`http://localhost:3000` にアクセスすると `/home` にリダイレクトされます。

### ビルド
```bash
npm run build
npm start        # または pnpm build && pnpm start
```

---

## 主な画面フロー

- ホーム: `/home` から「共有」「閲覧」「類題作成」へ遷移。
- 閲覧: `/study/faculties` → 教授選択 → `/study/professor/[id]` → 過去問一覧 `/exams/view?professor=...` → 詳細 `/exams/[id]`。
- 類題生成: `/exams/generate?professor=...` で過去問選択 → OpenAI で生成。API キー未設定時は警告を表示。
- 質問作成: `/questions/create`（教授または試験 ID をクエリ指定）で投稿フォーム表示。
- 共有: `/share` でメタ情報選択→本文入力→完了画面へ遷移。
- 設定: `/settings` で OpenAI API キーを保存（ローカル専用）。

---

## API

- `POST /api/generate-similar`
	- リクエスト: `{ examContent: string, apiKey: string }`
	- モデル: `gpt-4o-mini`
	- レスポンス: `{ content: string }`（生成された類題テキスト）。失敗時はエラーメッセージを返却。

- `POST /api/auth/logout`
	- セッション処理なしで `/auth/login` にリダイレクト。

---

## 開発用メモ

- 主要モック取得関数: `getMockFaculties`, `getMockDepartments`, `getMockSubjects`, `getMockProfessors`, `getMockExams`, `getMockQuestions` など。
- `app/exams/[id]/page.tsx`・`app/study/professor/[id]/page.tsx` は `generateStaticParams` を使ってモックデータから静的パスを生成。
- 類題生成や質問投稿などのフォームはデモ用のため、サーバー永続化や認証は別途実装が必要です。

---

## todoリスト

- apiキーの暗号化
- 過去問を直接アップロードするのではなく、一部をaiに食わせて改変する
- pdfのアップロード機能の追加
