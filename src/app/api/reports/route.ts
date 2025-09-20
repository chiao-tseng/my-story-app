import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { defaultRateLimit } from "@/lib/rateLimit";

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

async function writeReports(reports: Report[]): Promise<void> {
  await fs.mkdir(path.dirname(REPORTS_PATH), { recursive: true });
  await fs.writeFile(REPORTS_PATH, JSON.stringify(reports, null, 2), "utf8");
}

export async function POST(req: NextRequest) {
  // 速率限制檢查
  const rateLimitResult = defaultRateLimit(req);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "請求過於頻繁，請稍後再試" },
      { 
        status: 429,
        headers: {
          "Retry-After": Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
        }
      }
    );
  }

  const { storyId, reporterContact, reason, description } = await req.json().catch(() => ({}));
  
  if (!reporterContact || !reason) {
    return NextResponse.json({ error: "請提供聯絡方式和檢舉原因" }, { status: 400 });
  }

  const reports = await readReports();
  const newReport: Report = {
    id: crypto.randomUUID(),
    storyId,
    reporterContact: String(reporterContact).trim(),
    reason: String(reason).trim(),
    description: description ? String(description).slice(0, 1000) : "",
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  reports.unshift(newReport);
  await writeReports(reports);

  return NextResponse.json({ ok: true, id: newReport.id });
}
