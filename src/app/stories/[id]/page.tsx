import Link from "next/link";
import PixelAvatar from "@/components/PixelAvatar";

type Story = {
  id: string;
  persona: string;
  content: string;
  createdAt: string;
};

async function getStory(id: string): Promise<Story | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/stories/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function StoryDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const story = await getStory(id);

  if (!story) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-gray-600">找不到這篇故事。</p>
        <Link href="/stories" className="text-blue-600 underline">回列表</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="text-sm text-gray-500 mb-2">
        {new Date(story.createdAt).toLocaleString()}
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <PixelAvatar description={story.persona} size={80} />
        <h1 className="text-2xl font-bold">{story.persona || "未命名角色"}</h1>
      </div>
      <article className="prose prose-neutral max-w-none whitespace-pre-wrap">
        {story.content}
      </article>

      <div className="mt-8 flex gap-4">
        <Link href="/stories" className="text-gray-600 underline">← 回列表</Link>
        <Link
          href={`/contact?storyId=${encodeURIComponent(story.id)}`}
          className="text-blue-600 underline"
        >
          我針對這個故事有想了解的地方，聯繫出版社
        </Link>
      </div>
    </main>
  );
}
