import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const PUBLIC_PATH = path.join(process.cwd(), "data", "stories.json");

type Story = {
  id: string;
  persona: string;
  content: string;
  createdAt: string;
  status: "published" | "pending" | "rejected";
};

async function readStories(): Promise<Story[]> {
  try {
    const raw = await fs.readFile(PUBLIC_PATH, "utf8");
    return JSON.parse(raw) as Story[];
  } catch {
    return [];
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const all = await readStories();
  const story = all.find((s) => s.id === id && s.status === "published");
  if (!story) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(story);
}
