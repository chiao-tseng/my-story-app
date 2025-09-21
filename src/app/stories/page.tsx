"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import PixelAvatar from "@/components/PixelAvatar";

type Story = {
  id: string;
  persona: string;
  content: string;
  createdAt: string;
  status: "published" | "pending" | "rejected";
};

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stories", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        setStories(data.stories || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch stories:', error);
        setStories([]);
        setLoading(false);
      });
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-8 py-16">
      {/* 雜誌風格頁面標題 */}
      <div className="text-center mb-16">
        <div className="magazine-caption mb-4">STORY COLLECTION</div>
        <h1 className="magazine-title mb-6">故事列表</h1>
        <p className="magazine-body text-gray-600 max-w-2xl mx-auto">
          僅顯示已公開的匿名故事。請尊重投稿者與當事人。
        </p>
      </div>

      {loading && (
        <div className="text-center py-20">
          <div className="magazine-caption">載入中…</div>
        </div>
      )}

      {/* 雜誌風格故事網格 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((s) => (
          <article key={s.id} className="magazine-card p-6 group">
            {/* 故事頭部 */}
            <div className="flex items-center justify-between mb-4">
              <div className="magazine-caption">
                {new Date(s.createdAt).toLocaleDateString('zh-TW')}
              </div>
              <StatusBadge status={s.status} />
            </div>

            {/* 角色頭像 */}
            <div className="flex items-center gap-4 mb-4">
              <PixelAvatar description={s.persona} size={64} />
              <div>
                <h2 className="magazine-heading">匿名故事</h2>
              </div>
            </div>

            {/* 故事預覽 */}
            <div className="mb-6">
              <p className="magazine-body text-gray-700 leading-relaxed">
                {s.content.length > 150 ? s.content.slice(0, 150) + "…" : s.content}
              </p>
            </div>

            {/* 行動按鈕 */}
            <div className="space-y-3">
              <Link 
                href={`/stories/${s.id}`} 
                className="magazine-button block text-center py-3 text-sm"
              >
                閱讀全文
              </Link>
              <Link 
                href={`/contact?storyId=${encodeURIComponent(s.id)}`} 
                className="magazine-caption text-center block hover:text-red-600 transition-colors"
              >
                聯繫出版社
              </Link>
            </div>
          </article>
        ))}

        {!loading && stories.length === 0 && (
          <div className="col-span-full text-center py-20">
            <div className="magazine-caption mb-4">目前尚無公開故事</div>
            <p className="magazine-body text-gray-600 mb-8">
              歡迎成為第一位投稿者！
            </p>
            <Link 
              href="/submit" 
              className="magazine-button-accent inline-block px-8 py-3"
            >
              開始投稿
            </Link>
          </div>
        )}
      </div>

      {/* 底部裝飾 */}
      {stories.length > 0 && (
        <div className="mt-20 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="magazine-caption">更多故事持續更新中</p>
          </div>
        </div>
      )}
    </main>
  );
}
