import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import path from "path";
import fs from "fs/promises";

const PUBLIC_PATH = path.join(process.cwd(), "data", "stories.json");

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  if (cookieStore.get("isAdmin")?.value !== "1")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const all = JSON.parse(await fs.readFile(PUBLIC_PATH, "utf8")) as Array<{id: string; status: string; reviewedAt?: string}>;
    const i = all.findIndex(s => s.id === id);
    if (i === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    all[i].status = "rejected";
    all[i].reviewedAt = new Date().toISOString();
    await fs.writeFile(PUBLIC_PATH, JSON.stringify(all, null, 2), "utf8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Write error" }, { status: 500 });
  }
}
