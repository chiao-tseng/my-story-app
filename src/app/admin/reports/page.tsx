"use client";
import { useEffect, useState } from "react";

type Report = {
  id: string;
  storyId?: string;
  reporterContact: string;
  reason: string;
  description?: string;
  createdAt: string;
  status: "pending" | "processed" | "dismissed";
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"pending" | "processed" | "dismissed">("pending");

  async function loadReports() {
    try {
      const res = await fetch(`/api/admin/reports?status=${tab}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
      }
    } catch (error) {
      console.error("載入檢舉失敗:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, [tab]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">檢舉管理</h1>

      <div className="flex gap-2 mb-4">
        {(["pending", "processed", "dismissed"] as const).map(status => (
          <button
            key={status}
            onClick={() => setTab(status)}
            className={`px-3 py-1.5 rounded ${
              tab === status ? "bg-black text-white" : "border"
            }`}
          >
            {status === "pending" ? "待處理" : 
             status === "processed" ? "已處理" : "已駁回"}
          </button>
        ))}
      </div>

      {loading && <div>載入中…</div>}

      <div className="space-y-4">
        {reports.map(report => (
          <div key={report.id} className="border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">
                {new Date(report.createdAt).toLocaleString()}
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                report.status === "pending" ? "bg-amber-100 text-amber-700" :
                report.status === "processed" ? "bg-green-100 text-green-700" :
                "bg-red-100 text-red-700"
              }`}>
                {report.status === "pending" ? "待處理" :
                 report.status === "processed" ? "已處理" : "已駁回"}
              </span>
            </div>

            <div className="space-y-2">
              <p><strong>檢舉原因：</strong>{report.reason}</p>
              <p><strong>聯絡方式：</strong>{report.reporterContact}</p>
              {report.storyId && <p><strong>故事ID：</strong>{report.storyId}</p>}
              {report.description && (
                <p><strong>詳細說明：</strong>{report.description}</p>
              )}
            </div>
          </div>
        ))}

        {!loading && reports.length === 0 && (
          <div className="text-gray-500">沒有檢舉資料。</div>
        )}
      </div>
    </main>
  );
}
