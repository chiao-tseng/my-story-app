import { useEffect, useState } from 'react';

export default function TestStoryPage() {
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStory() {
      try {
        const response = await fetch('/api/stories/d3997354-8bcc-427f-8f1a-6615fdd6471c');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setStory(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    }

    fetchStory();
  }, []);

  if (loading) return <div>載入中...</div>;
  if (error) return <div>錯誤: {error}</div>;
  if (!story) return <div>找不到故事</div>;

  return (
    <div className="p-8">
      <h1>測試故事頁面</h1>
      <div className="mt-4">
        <h2>標題: {story.title}</h2>
        <p>內容: {story.content}</p>
        <p>狀態: {story.status}</p>
        <p>創建時間: {story.created_at}</p>
      </div>
    </div>
  );
}
