import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { defaultRateLimit } from "@/lib/rateLimit";

const CONTACT_PATH = path.join(process.cwd(), "data", "contact_requests.json");

type ContactReq = {
  id: string;
  storyId?: string;
  requesterContact: string;
  message?: string;
  createdAt: string;
  status: "pending" | "processed";
};

async function readJson<T>(p: string, fallback: T): Promise<T> {
  try { return JSON.parse(await fs.readFile(p, "utf8")) as T; } catch { return fallback; }
}
async function writeJson<T>(p: string, data: T) {
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p, JSON.stringify(data, null, 2), "utf8");
}

export async function POST(req: NextRequest) {
  // 速率限制檢查
  const rateLimitResult = defaultRateLimit(req);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "請求過於頻繁，請稍後再試" },
      { 
        status: 429,
        headers: {
          "Retry-After": Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
        }
      }
    );
  }

  const { storyId, requesterContact, message } = await req.json().catch(() => ({}));
  if (!requesterContact || String(requesterContact).trim().length < 3) {
    return NextResponse.json({ error: "請提供可聯繫方式" }, { status: 400 });
  }
  const all = await readJson<ContactReq[]>(CONTACT_PATH, []);
  const rec: ContactReq = {
    id: crypto.randomUUID(),
    storyId,
    requesterContact: String(requesterContact).trim(),
    message: (message || "").toString().slice(0, 2000),
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  all.unshift(rec);
  await writeJson(CONTACT_PATH, all);
  return NextResponse.json({ ok: true, id: rec.id });
}
