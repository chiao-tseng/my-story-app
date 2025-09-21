import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase client not initialized' }, { status: 500 });
    }

    // 測試不同的查詢方式
    const tests = [];

    // 測試 1: 基本查詢
    try {
      const { data, error } = await supabase.from('stories').select('*');
      tests.push({
        name: 'Basic select *',
        data: data?.length || 0,
        error: error?.message || null
      });
    } catch (e) {
      tests.push({
        name: 'Basic select *',
        data: 0,
        error: e instanceof Error ? e.message : 'Unknown error'
      });
    }

    // 測試 2: 查詢特定欄位
    try {
      const { data, error } = await supabase.from('stories').select('id, status');
      tests.push({
        name: 'Select specific fields',
        data: data?.length || 0,
        error: error?.message || null
      });
    } catch (e) {
      tests.push({
        name: 'Select specific fields',
        data: 0,
        error: e instanceof Error ? e.message : 'Unknown error'
      });
    }

    // 測試 3: 查詢 pending 狀態
    try {
      const { data, error } = await supabase.from('stories').select('*').eq('status', 'pending');
      tests.push({
        name: 'Select pending status',
        data: data?.length || 0,
        error: error?.message || null
      });
    } catch (e) {
      tests.push({
        name: 'Select pending status',
        data: 0,
        error: e instanceof Error ? e.message : 'Unknown error'
      });
    }

    // 測試 4: 查詢 published 狀態
    try {
      const { data, error } = await supabase.from('stories').select('*').eq('status', 'published');
      tests.push({
        name: 'Select published status',
        data: data?.length || 0,
        error: error?.message || null
      });
    } catch (e) {
      tests.push({
        name: 'Select published status',
        data: 0,
        error: e instanceof Error ? e.message : 'Unknown error'
      });
    }

    return NextResponse.json({
      success: true,
      tests,
      environment: {
        supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    });

  } catch (error) {
    return NextResponse.json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
