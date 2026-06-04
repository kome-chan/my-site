import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ScheduleItem = {
  slug: string;
  date: string;
  title: string;
  note: string;
  body?: string;
  link?: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content/schedule");

function formatDate(raw: unknown): string {
  if (!raw) return "";
  const d = raw instanceof Date ? raw : new Date(String(raw));
  if (isNaN(d.getTime())) return String(raw).slice(0, 10);
  return d.toISOString().slice(0, 10);
}

export async function getSchedule(): Promise<ScheduleItem[]> {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"));

  const items: ScheduleItem[] = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      date: formatDate(data.date),
      title: String(data.title ?? ""),
      note: String(data.note ?? ""),
      body: content || undefined,
    };
  });

  return items.sort((a, b) => a.date.localeCompare(b.date));
}
