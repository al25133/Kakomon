import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "Kakomon"; // GitHubリポジトリ名

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  // 必要に応じて他の設定を追加
};

export default nextConfig;