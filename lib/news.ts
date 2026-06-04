import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type NewsItem = {
  slug: string;
  date: string;
  category: string;
  title: string;
  body: string;
  thumbnail?: string;
  link?: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content/news");

function formatDate(raw: unknown): string {
  if (!raw) return "";
  const d = raw instanceof Date ? raw : new Date(String(raw));
  if (isNaN(d.getTime())) return String(raw).slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function readFile(filename: string): NewsItem {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    date: formatDate(data.date),
    category: String(data.category ?? ""),
    title: String(data.title ?? ""),
    body: content,
    thumbnail: data.thumbnail ?? undefined,
  };
}

function mdFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
}

export async function getNews(): Promise<NewsItem[]> {
  const items = mdFiles().map(readFile);
  return items.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const filename = `${slug}.md`;
  const filepath = path.join(CONTENT_DIR, filename);
  if (!fs.existsSync(filepath)) return null;
  return readFile(filename);
}

export async function getAllNewsSlugs(): Promise<string[]> {
  return mdFiles().map((f) => f.replace(/\.md$/, ""));
}
