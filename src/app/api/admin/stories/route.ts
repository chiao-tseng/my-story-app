import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import path from "path";
import fs from "fs/promises";

const PUBLIC_PATH = path.join(process.cwd(), "data", "stories.json");
type Story = { id: string; persona: string; content: string; createdAt: string; status: "pending"|"published"|"rejected"|"withdrawn" };

async function readAll(): Promise<Story[]> {
  try { return JSON.parse(await fs.readFile(PUBLIC_PATH, "utf8")) as Story[]; } catch { return []; }
}

export async function GET(req: Request) {
  const cookieStore = await cookies();
  if (cookieStore.get("isAdmin")?.value !== "1")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sp = new URL(req.url).searchParams;
  const status = (sp.get("status") || "pending") as Story["status"] | "all";
  const all = await readAll();
  const list = status === "all" ? all : all.filter(s => s.status === status);
  return NextResponse.json({ stories: list });
}
