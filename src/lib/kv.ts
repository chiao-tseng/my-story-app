import { kv } from '@vercel/kv';

// 故事資料類型
export type PublicStory = {
  id: string;
  persona: string;
  content: string;
  createdAt: string;
  status: "published" | "pending" | "rejected" | "withdrawn";
  reviewedAt?: string;
};

export type PrivateInfo = {
  storyId: string;
  authorName?: string;
  authorContact?: string;
};

// 讀取所有故事
export async function getAllStories(): Promise<PublicStory[]> {
  try {
    const stories = await kv.get<PublicStory[]>('stories') || [];
    return stories;
  } catch (error) {
    console.error('讀取故事失敗:', error);
    return [];
  }
}

// 讀取所有私人資訊
export async function getAllPrivateInfo(): Promise<PrivateInfo[]> {
  try {
    const privateInfo = await kv.get<PrivateInfo[]>('story_private') || [];
    return privateInfo;
  } catch (error) {
    console.error('讀取私人資訊失敗:', error);
    return [];
  }
}

// 儲存故事
export async function saveStory(story: PublicStory): Promise<void> {
  try {
    const stories = await getAllStories();
    stories.unshift(story); // 新增到開頭
    await kv.set('stories', stories);
  } catch (error) {
    console.error('儲存故事失敗:', error);
    throw error;
  }
}

// 儲存私人資訊
export async function savePrivateInfo(privateInfo: PrivateInfo): Promise<void> {
  try {
    const privateInfos = await getAllPrivateInfo();
    privateInfos.unshift(privateInfo); // 新增到開頭
    await kv.set('story_private', privateInfos);
  } catch (error) {
    console.error('儲存私人資訊失敗:', error);
    throw error;
  }
}

// 更新故事狀態
export async function updateStoryStatus(storyId: string, status: PublicStory['status']): Promise<void> {
  try {
    const stories = await getAllStories();
    const storyIndex = stories.findIndex(s => s.id === storyId);
    
    if (storyIndex !== -1) {
      stories[storyIndex].status = status;
      stories[storyIndex].reviewedAt = new Date().toISOString();
      await kv.set('stories', stories);
    }
  } catch (error) {
    console.error('更新故事狀態失敗:', error);
    throw error;
  }
}

// 根據狀態篩選故事
export async function getStoriesByStatus(status: PublicStory['status']): Promise<PublicStory[]> {
  const stories = await getAllStories();
  return stories.filter(s => s.status === status);
}
