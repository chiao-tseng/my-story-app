import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!supabase) {
      return NextResponse.json({ error: "Database not available" }, { status: 500 });
    }

    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', id)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching story:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
