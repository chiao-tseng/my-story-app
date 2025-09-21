import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAllContactRequests, getContactRequestsByStatus, ContactRequest } from "@/lib/supabase";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  if (cookieStore.get("isAdmin")?.value !== "1")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const sp = new URL(req.url).searchParams;
    const status = (sp.get("status") || "all") as ContactRequest["status"] | "all";
    
    const list = status === "all" 
      ? await getAllContactRequests()
      : await getContactRequestsByStatus(status);
      
    console.log(`Admin API: Fetched ${list.length} contact requests with status ${status}`);
    return NextResponse.json({ contactRequests: list });
  } catch (error) {
    console.error('Admin Contact API Error:', error);
    return NextResponse.json({ error: "Failed to fetch contact requests" }, { status: 500 });
  }
}
