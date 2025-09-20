"use client";
import { useEffect, useState } from "react";
import StatusBadge from "@/components/StatusBadge";

type Story = { id:string; persona:string; content:string; createdAt:string; status:"pending"|"published"|"rejected"|"withdrawn" };

export default function AdminPage() {
  const [pwd, setPwd] = useState("");
  const [logged, setLogged] = useState(false);
  const [tab, setTab] = useState<"pending"|"published"|"rejected"|"withdrawn">("pending");
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd }),
    });
    setLoading(false);
    if (r.ok) { setLogged(true); load(); }
    else alert("密碼錯誤");
  }
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setLogged(false); setStories([]);
  }
  async function load(s = tab) {
    const r = await fetch(`/api/admin/stories?status=${s}`, { cache: "no-store" });
    if (r.ok) {
      const data = await r.json();
      setStories(data.stories || []);
      setLogged(true);
    } else {
      setLogged(false);
    }
  }
  useEffect(() => { load(); }, [tab]);

  async function act(id: string, action: "publish" | "reject" | "withdraw" | "republish") {
    const r = await fetch(`/api/admin/stories/${id}/${action}`, { method: "POST" });
    if (r.ok) load();
    else alert("操作失敗");
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">管理後台</h1>

      {!logged && (
        <form onSubmit={login} className="max-w-sm space-y-3">
          <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)}
                 placeholder="輸入管理密碼" className="w-full border p-3 rounded-lg" />
          <button disabled={loading} className="rounded-lg bg-blue-600 text-white px-4 py-2">
            {loading ? "登入中…" : "登入"}
          </button>
        </form>
      )}

      {logged && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              {(["pending","published","rejected","withdrawn"] as const).map(s=>(
                <button key={s} onClick={()=>setTab(s)}
                        className={`px-3 py-1.5 rounded ${tab===s?"bg-black text-white":"border"}`}>
                  {s === "pending" ? "待審核" :
                   s === "published" ? "已發布" :
                   s === "rejected" ? "已退稿" : "已撤稿"}
                </button>
              ))}
            </div>
            <button onClick={logout} className="text-gray-600 underline">登出</button>
          </div>

          <div className="space-y-4">
            {stories.map(s=>(
              <div key={s.id} className="border rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs text-gray-500">
                    {new Date(s.createdAt).toLocaleString()} · {s.id}
                  </div>
                  <StatusBadge status={s.status} />
                </div>
                <h2 className="font-semibold mb-2">{s.persona || "未命名角色"}</h2>
                <p className="whitespace-pre-wrap text-gray-800">{s.content}</p>
                {(() => {
                  // 根據當前分頁顯示對應的動作按鈕
                  if (tab === "pending") {
                    return (
                      <div className="mt-3 flex gap-2">
                        <button onClick={()=>act(s.id,"publish")} className="px-3 py-1.5 rounded bg-green-600 text-white hover:bg-green-700">發布</button>
                        <button onClick={()=>act(s.id,"reject")} className="px-3 py-1.5 rounded bg-red-600 text-white hover:bg-red-700">退稿</button>
                      </div>
                    );
                  } else if (tab === "published") {
                    return (
                      <div className="mt-3 flex gap-2">
                        <button onClick={()=>act(s.id,"withdraw")} className="px-3 py-1.5 rounded bg-gray-600 text-white hover:bg-gray-700">撤稿</button>
                      </div>
                    );
                  } else if (tab === "rejected") {
                    return (
                      <div className="mt-3 flex gap-2">
                        <button onClick={()=>act(s.id,"republish")} className="px-3 py-1.5 rounded bg-green-600 text-white hover:bg-green-700">重新發布</button>
                      </div>
                    );
                  } else if (tab === "withdrawn") {
                    return (
                      <div className="mt-3 flex gap-2">
                        <button onClick={()=>act(s.id,"republish")} className="px-3 py-1.5 rounded bg-green-600 text-white hover:bg-green-700">重新發布</button>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            ))}
            {stories.length===0 && <div className="text-gray-500">沒有資料。</div>}
          </div>
        </>
      )}
    </main>
  );
}
