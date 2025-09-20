import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { strictRateLimit } from "@/lib/rateLimit";

// 檔案路徑
const PUBLIC_PATH = path.join(process.cwd(), "data", "stories.json");
const PRIVATE_PATH = path.join(process.cwd(), "data", "story_private.json");

// 讀寫工具
async function readJson<T>(p: string, fallback: T): Promise<T> {
  try {
    const buf = await fs.readFile(p, "utf8");
    return JSON.parse(buf) as T;
  } catch {
    return fallback;
  }
}
async function writeJson<T>(p: string, data: T) {
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p, JSON.stringify(data, null, 2), "utf8");
}

// 簡單去識別：遮蔽 email / 手機
function sanitizeText(t: string) {
  if (!t) return t;
  // 先擋 email
  t = t.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[email 已遮蔽]");
  // 再擋台灣常見電話（含 09xx-xxx-xxx）
  t = t.replace(
    /(?:\+?886[-\s]?|0)?(?:9\d{2}[-\s]?\d{3}[-\s]?\d{3}|\d{1,2}[-\s]?\d{3,4}[-\s]?\d{3,4})/g,
    "[電話已遮蔽]"
  );
  // 擋 @handle（避免露出 IG/Line id），保留 email 已被前面處理
  t = t.replace(/(^|\s)@[\w.]{2,}/g, "$1[@已遮蔽]");
  return t.trim();
}

type PublicStory = {
  id: string;
  persona: string;
  content: string;
  createdAt: string;
  status: "published" | "pending" | "rejected" | "withdrawn";
};

type PrivateInfo = {
  storyId: string;
  authorName?: string;
  authorContact?: string;
};

export async function GET() {
  const stories = await readJson<PublicStory[]>(PUBLIC_PATH, []);
  return NextResponse.json({ stories: stories.filter(s => s.status === "published") });
}

export async function POST(req: NextRequest) {
  // 速率限制檢查
  const rateLimitResult = strictRateLimit(req);
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

  const body = await req.json().catch(() => ({}));
  const { persona, content, authorName, authorContact } = body as {
    persona?: string;
    content?: string;
    authorName?: string;
    authorContact?: string;
  };

  if (!persona || !content || !authorName || !authorContact) {
    return NextResponse.json({ error: "所有欄位都是必填的" }, { status: 400 });
  }

  const safePersona = sanitizeText(persona);
  const safeContent = sanitizeText(content);

  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const newStory: PublicStory = {
    id,
    persona: safePersona,
    content: safeContent,
    createdAt: now,
    status: "pending", // ← 由原本 published 改為 pending
  };
  const priv: PrivateInfo = {
    storyId: id,
    authorName,
    authorContact,
  };

  const stories = await readJson<PublicStory[]>(PUBLIC_PATH, []);
  const privs = await readJson<PrivateInfo[]>(PRIVATE_PATH, []);
  stories.unshift(newStory);
  privs.unshift(priv);

  await writeJson(PUBLIC_PATH, stories);
  await writeJson(PRIVATE_PATH, privs);

  return NextResponse.json({ ok: true, id });
}
