import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // 檢查環境變數
    const envCheck = {
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseClient: !!supabase
    };

    if (!supabase) {
      return NextResponse.json({ 
        error: 'Supabase client not initialized',
        envCheck 
      }, { status: 500 });
    }

    // 測試 Supabase 連接
    const { data, error, count } = await supabase
      .from('stories')
      .select('*', { count: 'exact' });

    return NextResponse.json({
      success: true,
      envCheck,
      supabaseResult: { data, error, count },
      totalCount: count || 0,
      sampleData: data?.slice(0, 2) || [] // 顯示前 2 筆資料作為樣本
    });

  } catch (error) {
    return NextResponse.json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
