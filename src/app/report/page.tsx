"use client";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function ReportForm() {
  const searchParams = useSearchParams();
  const storyId = searchParams.get("storyId") || "";
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      storyId: storyId || formData.get("storyId"),
      reporterContact: formData.get("reporterContact"),
      reason: formData.get("reason"),
      description: formData.get("description"),
    };

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("檢舉已送出，我們會盡快處理。");
        window.location.href = "/stories";
      } else {
        alert("檢舉送出失敗，請稍後再試。");
      }
    } catch (error) {
      alert("檢舉送出失敗，請稍後再試。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold mb-2">檢舉內容</h1>
      <p className="text-gray-600 mb-6">
        如果您發現不當內容，請填寫以下表單進行檢舉。我們會盡快處理您的檢舉。
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="storyId"
          defaultValue={storyId}
          placeholder="（可選）故事ID"
          className="w-full border p-3 rounded-lg"
        />
        
        <input
          name="reporterContact"
          required
          placeholder="您的聯絡方式（Email、電話等）"
          className="w-full border p-3 rounded-lg"
        />
        
        <select
          name="reason"
          required
          className="w-full border p-3 rounded-lg"
        >
          <option value="">請選擇檢舉原因</option>
          <option value="不當內容">不當內容</option>
          <option value="人身攻擊">人身攻擊</option>
          <option value="虛假資訊">虛假資訊</option>
          <option value="侵犯隱私">侵犯隱私</option>
          <option value="其他">其他</option>
        </select>
        
        <textarea
          name="description"
          rows={4}
          placeholder="詳細說明（可選）"
          className="w-full border p-3 rounded-lg"
        />
        
        <button
          disabled={loading}
          type="submit"
          className="w-full rounded-xl bg-red-600 text-white py-3"
        >
          {loading ? "送出中…" : "送出檢舉"}
        </button>
      </form>
    </main>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div>載入中...</div>}>
      <ReportForm />
    </Suspense>
  );
}
