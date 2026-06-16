import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Member = {
  slug: string;
  name: string;
  role: string;
  company: string;
  graduationYear: string;
  photo: string;
  companyUrl: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content/members");

const DEFAULT_MEMBERS: Member[] = [
  { slug: "default-1", name: "山田 太郎", role: "会長 / 代表取締役社長", company: "山田商事株式会社", graduationYear: "1985年卒", photo: "", companyUrl: "" },
  { slug: "default-2", name: "鈴木 花子", role: "副会長 / 取締役会長", company: "鈴木工業株式会社", graduationYear: "1988年卒", photo: "", companyUrl: "" },
  { slug: "default-3", name: "田中 一郎", role: "幹事 / 代表取締役", company: "田中コンサルティング", graduationYear: "1991年卒", photo: "", companyUrl: "" },
  { slug: "default-4", name: "佐藤 次郎", role: "幹事 / 代表取締役社長", company: "佐藤製造株式会社", graduationYear: "1993年卒", photo: "", companyUrl: "" },
  { slug: "default-5", name: "伊藤 美穂", role: "会計 / 取締役副社長", company: "伊藤不動産株式会社", graduationYear: "1996年卒", photo: "", companyUrl: "" },
  { slug: "default-6", name: "渡辺 健司", role: "監事 / 代表取締役", company: "渡辺物流株式会社", graduationYear: "1999年卒", photo: "", companyUrl: "" },
];

export async function getMembers(): Promise<Member[]> {
  if (!fs.existsSync(CONTENT_DIR)) return DEFAULT_MEMBERS;

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  if (files.length === 0) return DEFAULT_MEMBERS;

  return files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      name: String(data.name ?? ""),
      role: String(data.role ?? ""),
      company: String(data.company ?? ""),
      graduationYear: String(data.graduationYear ?? ""),
      photo: String(data.photo ?? ""),
      companyUrl: String(data.companyUrl ?? ""),
    };
  });
}
