import { NextRequest, NextResponse } from "next/server";
import { defaultRateLimit } from "@/lib/rateLimit";
import { saveContactRequest } from "@/lib/supabase";

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

  try {
    const { storyId, requesterContact, message } = await req.json().catch(() => ({}));
    
    if (!requesterContact || String(requesterContact).trim().length < 3) {
      return NextResponse.json({ error: "請提供可聯繫方式" }, { status: 400 });
    }

    const contactRequest = {
      story_id: storyId || null,
      requester_contact: String(requesterContact).trim(),
      message: (message || "").toString().slice(0, 2000),
      status: "pending" as const,
    };

    await saveContactRequest(contactRequest);
    
    return NextResponse.json({ ok: true, message: "聯繫請求已提交" });
  } catch (error) {
    console.error('聯繫請求提交失敗:', error);
    return NextResponse.json({ error: "提交失敗，請稍後再試" }, { status: 500 });
  }
}
