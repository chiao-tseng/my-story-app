"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function ContactForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const storyId = sp.get("storyId") || "";
  const [loading, setLoading] = useState(false);
  
  // 如果有故事ID，嘗試獲取故事資訊來顯示
  const [storyInfo, setStoryInfo] = useState<{id: string, persona: string} | null>(null);
  
  useEffect(() => {
    if (storyId) {
      // 獲取故事資訊用於顯示
      fetch(`/api/stories/${storyId}`)
        .then(res => res.json())
        .then(data => {
          if (data.id) {
            setStoryInfo({ id: data.id, persona: data.persona });
          }
        })
        .catch(() => {
          // 如果獲取失敗，可能是故事不存在或未發布
          setStoryInfo(null);
        });
    }
  }, [storyId]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      storyId: storyId || (fd.get("storyId") as string),
      requesterContact: fd.get("requesterContact"),
      message: fd.get("message"),
    };
    const res = await fetch("/api/contact-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (!res.ok) {
      alert("送出失敗，請檢查欄位");
      return;
    }
    alert("已送出聯繫需求。我們會盡快回覆你。");
    router.push("/stories");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold mb-2">聯繫出版社</h1>
      
      {/* 如果有關聯的故事，顯示故事資訊 */}
      {storyInfo && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="font-semibold text-blue-900 mb-1">關於這篇故事</h2>
          <p className="text-blue-800">
            <strong>角色：</strong>{storyInfo.persona}
          </p>
          <p className="text-sm text-blue-600 mt-1">
            你的聯繫需求將與這篇故事關聯
          </p>
        </div>
      )}
      
      <p className="text-gray-600 mb-6">
        {storyInfo 
          ? "如果你對這篇故事有疑問或想與投稿者進一步溝通，請填寫以下資訊。"
          : "如果你對某篇故事有疑問或想與投稿者進一步溝通，請填寫以下資訊。"
        }
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* 隱藏的故事ID欄位 */}
        {storyId && (
          <input
            type="hidden"
            name="storyId"
            value={storyId}
          />
        )}
        
        <div>
          <label htmlFor="requesterContact" className="block text-sm font-medium text-gray-700 mb-2">
            你的聯絡方式 *
          </label>
          <input
            id="requesterContact"
            name="requesterContact"
            required
            placeholder="Email、電話、Line ID 皆可"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            想了解的重點或說明
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="請說明你想了解的重點，例如：想確認是否為當事人、想了解更多細節等..."
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <button
          disabled={loading}
          type="submit"
          className="w-full rounded-xl bg-blue-600 text-white py-3 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "送出中…" : "送出聯繫需求"}
        </button>
      </form>
      
      {/* 如果沒有關聯故事，提供說明 */}
      {!storyInfo && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">如何關聯特定故事？</h3>
          <p className="text-gray-600 text-sm">
            如果你想針對特定故事提出聯繫需求，請先到故事列表頁面，點擊該故事下方的「聯繫出版社」連結。
          </p>
        </div>
      )}
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div>載入中...</div>}>
      <ContactForm />
    </Suspense>
  );
}
