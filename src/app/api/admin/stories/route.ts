import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAllStories, getStoriesByStatus, PublicStory } from "@/lib/supabase";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  if (cookieStore.get("isAdmin")?.value !== "1")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const sp = new URL(req.url).searchParams;
    const status = (sp.get("status") || "pending") as PublicStory["status"] | "all";
    
    const list = status === "all" 
      ? await getAllStories()
      : await getStoriesByStatus(status);
      
    console.log(`Admin API: Fetched ${list.length} stories with status ${status}`);
    return NextResponse.json({ stories: list });
  } catch (error) {
    console.error('Admin API Error:', error);
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}
