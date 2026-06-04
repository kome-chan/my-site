import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type SlideItem = {
  slug: string;
  order: number;
  image: string;
  alt: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content/slider");

const DEFAULT_SLIDES: SlideItem[] = [
  {
    slug: "default-1",
    order: 1,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600",
    alt: "大学キャンパスの卒業式・学術的な場の様子",
  },
  {
    slug: "default-2",
    order: 2,
    image: "https://images.unsplash.com/photo-1560523159-6b681a1e1852?w=1600",
    alt: "ビジネスリーダーたちの交流・ネットワーキングの様子",
  },
  {
    slug: "default-3",
    order: 3,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1600",
    alt: "経営者・研究者が集うカンファレンスの様子",
  },
];

export async function getSlides(): Promise<SlideItem[]> {
  if (!fs.existsSync(CONTENT_DIR)) return DEFAULT_SLIDES;

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"));

  if (files.length === 0) return DEFAULT_SLIDES;

  const items: SlideItem[] = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      order: typeof data.order === "number" ? data.order : 1,
      image: String(data.image ?? ""),
      alt: String(data.alt ?? ""),
    };
  });

  return items.sort((a, b) => a.order - b.order);
}
