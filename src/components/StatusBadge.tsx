type StoryStatus = "published" | "pending" | "rejected" | "withdrawn";

interface StatusBadgeProps {
  status: StoryStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const map = {
    published: { text: "已發布", cls: "bg-green-100 text-green-700 border-green-200" },
    pending:   { text: "待審核", cls: "bg-amber-100 text-amber-700 border-amber-200" },
    rejected:  { text: "已退稿", cls: "bg-red-100 text-red-700 border-red-200" },
    withdrawn: { text: "已撤稿", cls: "bg-slate-100 text-slate-700 border-slate-200" },
  } as const;

  const config = map[status] ?? map.published;

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${config.cls}`}>
      {config.text}
    </span>
  );
}
