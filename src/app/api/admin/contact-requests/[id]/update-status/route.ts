import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { updateContactRequestStatus, getAllContactRequests } from "@/lib/supabase";

export async function POST(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  if (cookieStore.get("isAdmin")?.value !== "1")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const { status } = await req.json();
    
    if (!status || !["pending", "processed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    
    const contactRequests = await getAllContactRequests();
    const contactRequest = contactRequests.find(cr => cr.id === id);
    
    if (!contactRequest) {
      return NextResponse.json({ error: "Contact request not found" }, { status: 404 });
    }
    
    await updateContactRequestStatus(id, status);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('更新聯繫請求狀態失敗:', error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
