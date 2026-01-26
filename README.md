git clone https://github.com/al25133/Kakomon.git
## Kakomon - 過去問共有デモ

芝浦工業大学の過去問をモックデータで閲覧・共有し、OpenAI API を使った簡易な類題生成を試せる Next.js デモアプリです。モックデータと一部の簡易 API（PDF アップロード、類題生成 API）で動作します。DB や本格的な認証は未実装で、永続化は限定的です。

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
| フレームワーク | Next.js | ^16.1.4 |
| UI | React | 19.2.3 |
| 言語 | TypeScript | ^5 |
| スタイリング | Tailwind CSS | ^4.1.18 |
| コンポーネント | shadcn/ui (Radix UI ベース) | - |
| フォーム | react-hook-form | ^7.71.1 |
| バリデーション | zod | 4.3.6 |
| グラフ/通知 | recharts, sonner | 3.7.0 / ^2.0.7 |

---

## データと制限事項

- データソースは `lib/mock-data.ts` のモック配列のみ。DB や API への保存はありません。
- OpenAI API キーはブラウザの `localStorage` に保存し、サーバーには送信しません（`openai_api_key`）。
 - ただし、簡易的な PDF アップロード API (`POST /api/upload`) を実装しており、受け取った PDF は `public/uploads` に保存されます（静的ファイルとして参照可能）。一部の画面はローカルプレビューを用いるため、UI 側でアップロード API を呼ばない場合もあります。
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

(注) 上記のうち「pdfのアップロード機能の追加」はサーバー側 API は追加済みですが、運用面（認証・検査）の強化が必要です。

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

- `POST /api/upload`
	- リクエスト: FormData（`file` フィールドに `application/pdf`）
	- 動作: 受信した PDF を `public/uploads` 配下に保存し、公開 URL を返却します（例: `/uploads/<safe-name>`）。
	- 備考: 現在は PDF のみ許可。アップロード時の認証やマルウェアチェック等は未実装です。

- `POST /api/auth/logout`
	- セッション処理なしで `/auth/login` にリダイレクト。

---

## 開発用メモ

## 新機能（最近の追加）

- PDF アップロード API を追加: `app/api/upload/route.ts` によりクライアントから PDF を受け取り、`public/uploads` に保存します。
- PDF のクライアントプレビュー: `/exams/generate` などで選択した PDF をローカルプレビューで埋め込み表示できます。
- 類題生成の API 実装: `app/api/generate-similar/route.ts` で `gpt-4o-mini` を使った類題生成を行います。

## 今後の展望 / Roadmap

- API キーの安全な保存・暗号化（サーバー側保管、Vault 等の導入）。
- 認証とユーザー管理（永続化されたアカウント、投稿の所有権）。
- 過去問の永続化（データベース導入）と管理画面。
- PDF のテキスト抽出・OCR、問題の自動パースとメタデータ抽出。
- CI / CD の整備（GitHub Actions ワークフロー更新、Node バージョン固定など）。
- アクセス制御やウイルススキャンを含むアップロードの強化。

- 主要モック取得関数: `getMockFaculties`, `getMockDepartments`, `getMockSubjects`, `getMockProfessors`, `getMockExams`, `getMockQuestions` など。
- `app/exams/[id]/page.tsx`・`app/study/professor/[id]/page.tsx` は `generateStaticParams` を使ってモックデータから静的パスを生成。
- 類題生成や質問投稿などのフォームはデモ用のため、サーバー永続化や認証は別途実装が必要です。

---