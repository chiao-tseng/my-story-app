import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import path from "path";
import fs from "fs/promises";

const REPORTS_PATH = path.join(process.cwd(), "data", "reports.json");

type Report = {
  id: string;
  storyId?: string;
  reporterContact: string;
  reason: string;
  description?: string;
  createdAt: string;
  status: "pending" | "processed" | "dismissed";
};

async function readReports(): Promise<Report[]> {
  try {
    const data = await fs.readFile(REPORTS_PATH, "utf8");
    return JSON.parse(data) as Report[];
  } catch {
    return [];
  }
}

export async function GET(req: Request) {
  const cookieStore = await cookies();
  if (cookieStore.get("isAdmin")?.value !== "1") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sp = new URL(req.url).searchParams;
  const status = (sp.get("status") || "pending") as Report["status"] | "all";
  const reports = await readReports();
  const filtered = status === "all" ? reports : reports.filter(r => r.status === status);
  
  return NextResponse.json({ reports: filtered });
}
