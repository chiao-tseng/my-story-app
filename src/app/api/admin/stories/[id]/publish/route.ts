import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { updateStoryStatus, getAllStories } from "@/lib/supabase";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  if (cookieStore.get("isAdmin")?.value !== "1")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const stories = await getAllStories();
    const story = stories.find(s => s.id === id);
    
    if (!story) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    
    await updateStoryStatus(id, "published");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('發布故事失敗:', error);
    return NextResponse.json({ error: "Write error" }, { status: 500 });
  }
}
