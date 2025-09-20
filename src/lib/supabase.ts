import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseKey
  });
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// 故事資料類型
export type PublicStory = {
  id: string;
  persona: string;
  content: string;
  created_at: string;
  status: "published" | "pending" | "rejected" | "withdrawn";
  reviewed_at?: string;
};

export type PrivateInfo = {
  id: string;
  story_id: string;
  author_name?: string;
  author_contact?: string;
  created_at: string;
};

// 讀取所有故事
export async function getAllStories(): Promise<PublicStory[]> {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('讀取故事失敗:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('讀取故事失敗:', error);
    return [];
  }
}

// 讀取所有私人資訊
export async function getAllPrivateInfo(): Promise<PrivateInfo[]> {
  try {
    const { data, error } = await supabase
      .from('story_private')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('讀取私人資訊失敗:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('讀取私人資訊失敗:', error);
    return [];
  }
}

// 儲存故事
export async function saveStory(story: Omit<PublicStory, 'created_at'>): Promise<void> {
  try {
    const { error } = await supabase
      .from('stories')
      .insert([{
        ...story,
        created_at: new Date().toISOString()
      }]);
    
    if (error) {
      console.error('儲存故事失敗:', error);
      throw error;
    }
  } catch (error) {
    console.error('儲存故事失敗:', error);
    throw error;
  }
}

// 儲存私人資訊
export async function savePrivateInfo(privateInfo: Omit<PrivateInfo, 'id' | 'created_at'>): Promise<void> {
  try {
    const { error } = await supabase
      .from('story_private')
      .insert([{
        ...privateInfo,
        created_at: new Date().toISOString()
      }]);
    
    if (error) {
      console.error('儲存私人資訊失敗:', error);
      throw error;
    }
  } catch (error) {
    console.error('儲存私人資訊失敗:', error);
    throw error;
  }
}

// 更新故事狀態
export async function updateStoryStatus(storyId: string, status: PublicStory['status']): Promise<void> {
  try {
    const { error } = await supabase
      .from('stories')
      .update({ 
        status,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', storyId);
    
    if (error) {
      console.error('更新故事狀態失敗:', error);
      throw error;
    }
  } catch (error) {
    console.error('更新故事狀態失敗:', error);
    throw error;
  }
}

// 根據狀態篩選故事
export async function getStoriesByStatus(status: PublicStory['status']): Promise<PublicStory[]> {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('篩選故事失敗:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('篩選故事失敗:', error);
    return [];
  }
}

// 根據故事 ID 獲取私人資訊
export async function getPrivateInfoByStoryId(storyId: string): Promise<PrivateInfo | null> {
  try {
    const { data, error } = await supabase
      .from('story_private')
      .select('*')
      .eq('story_id', storyId)
      .single();
    
    if (error) {
      console.error('獲取私人資訊失敗:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('獲取私人資訊失敗:', error);
    return null;
  }
}
