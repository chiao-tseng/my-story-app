import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import PWAInstallButton from "@/components/PWAInstallButton";

export const metadata: Metadata = {
  title: "感情壞蛋記錄簿",
  description: "匿名分享、彼此保護。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-dvh bg-white text-black">
        {/* 雜誌風格導覽列 */}
        <header className="border-b border-black bg-white sticky top-0 z-50">
          <nav className="mx-auto max-w-6xl px-8 py-4 flex items-center justify-between">
            <Link href="/" className="magazine-heading tracking-tight">
              感情壞蛋記錄簿
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/" className="magazine-caption hover:text-red-600 transition-colors">
                首頁
              </Link>
              <Link href="/stories" className="magazine-caption hover:text-red-600 transition-colors">
                故事
              </Link>
              <Link
                href="/submit"
                className="magazine-button-accent text-sm"
              >
                我要投稿
              </Link>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        {/* PWA 安裝按鈕 - 暫時禁用 */}
        {/* <PWAInstallButton /> */}

        {/* 雜誌風格頁尾 */}
        <footer className="mt-20 border-t border-black bg-black text-white">
          <div className="mx-auto max-w-6xl px-8 py-12">
            <div className="flex flex-wrap gap-8 justify-center mb-8">
              <Link href="/legal/terms" className="magazine-caption text-white hover:text-red-400 transition-colors">
                服務條款
              </Link>
              <Link href="/legal/privacy" className="magazine-caption text-white hover:text-red-400 transition-colors">
                隱私政策
              </Link>
              <Link href="/legal/content-policy" className="magazine-caption text-white hover:text-red-400 transition-colors">
                內容政策
              </Link>
            </div>
            <div className="text-center">
              <p className="magazine-caption text-white/70">
                © {new Date().getFullYear()} 感情壞蛋記錄簿
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
