import Link from "next/link";

type Story = {
  id: string;
  title: string;
  persona: string;
  content: string;
  created_at: string;
  status: string;
  reviewed_at?: string;
};

async function getStory(id: string): Promise<Story | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    console.log('Debug: baseUrl =', baseUrl);
    console.log('Debug: fetching from', `${baseUrl}/api/stories/${id}`);
    
    const res = await fetch(`${baseUrl}/api/stories/${id}`, { cache: "no-store" });
    console.log('Debug: response status =', res.status);
    console.log('Debug: response ok =', res.ok);
    
    if (!res.ok) {
      console.error(`API request failed: ${res.status} ${res.statusText}`);
      return null;
    }
    
    const data = await res.json();
    console.log('Debug: story data =', data);
    return data;
  } catch (error) {
    console.error('Debug: Error fetching story:', error);
    return null;
  }
}

export default async function DebugStoryPage() {
  const testId = "d3997354-8bcc-427f-8f1a-6615fdd6471c";
  const story = await getStory(testId);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">調試故事頁面</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">環境變數</h2>
        <p>NEXT_PUBLIC_BASE_URL: {process.env.NEXT_PUBLIC_BASE_URL || '未設置'}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">測試結果</h2>
        {story ? (
          <div className="bg-green-100 p-4 rounded">
            <p className="text-green-800">✅ 成功獲取故事</p>
            <div className="mt-2">
              <p><strong>ID:</strong> {story.id}</p>
              <p><strong>標題:</strong> {story.title}</p>
              <p><strong>狀態:</strong> {story.status}</p>
              <p><strong>內容:</strong> {story.content}</p>
            </div>
          </div>
        ) : (
          <div className="bg-red-100 p-4 rounded">
            <p className="text-red-800">❌ 無法獲取故事</p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">測試連結</h2>
        <div className="space-y-2">
          <div>
            <Link 
              href={`/stories/${testId}`} 
              className="text-blue-600 underline"
            >
              訪問故事詳情頁面
            </Link>
          </div>
          <div>
            <Link 
              href="/stories" 
              className="text-blue-600 underline"
            >
              返回故事列表
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
