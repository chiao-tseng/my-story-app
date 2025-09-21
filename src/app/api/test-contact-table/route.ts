import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const envCheck = {
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseClient: !!supabase,
  };

  if (!supabase) {
    return NextResponse.json({ 
      success: false, 
      error: 'Supabase client not initialized',
      envCheck 
    }, { status: 500 });
  }

  try {
    // 測試 contact_requests 表是否存在
    const { data, error, count } = await supabase
      .from('contact_requests')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      success: true,
      envCheck,
      tableExists: !error,
      tableError: error?.message || null,
      tableCount: count || 0,
      sampleInsert: {
        story_id: null,
        requester_contact: "test@example.com",
        message: "Test message",
        status: "pending"
      }
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      envCheck
    }, { status: 500 });
  }
}
