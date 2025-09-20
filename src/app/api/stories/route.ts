import { NextRequest, NextResponse } from "next/server";
import { strictRateLimit } from "@/lib/rateLimit";
import { 
  getAllStories, 
  saveStory, 
  savePrivateInfo, 
  PublicStory, 
  PrivateInfo 
} from "@/lib/supabase";

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

// 類型定義已移至 @/lib/kv

export async function GET() {
  const stories = await getAllStories();
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

  const newStory = {
    id,
    persona: safePersona,
    content: safeContent,
    status: "pending" as const,
  };
  const priv = {
    story_id: id,
    author_name: authorName,
    author_contact: authorContact,
  };

  await saveStory(newStory);
  await savePrivateInfo(priv);

  return NextResponse.json({ ok: true, id });
}
