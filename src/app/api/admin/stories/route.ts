import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAllStories, getStoriesByStatus, PublicStory } from "@/lib/supabase";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  if (cookieStore.get("isAdmin")?.value !== "1")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sp = new URL(req.url).searchParams;
  const status = (sp.get("status") || "pending") as PublicStory["status"] | "all";
  
  const list = status === "all" 
    ? await getAllStories()
    : await getStoriesByStatus(status);
    
  return NextResponse.json({ stories: list });
}
