import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import { getScheduleBySlug, getAllScheduleSlugs } from "@/lib/schedule";

export async function generateStaticParams() {
  const slugs = await getAllScheduleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getScheduleBySlug(slug);
  if (!item) return {};
  return { title: `${item.title} | 和田町会` };
}

export default async function ScheduleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getScheduleBySlug(slug);
  if (!item) notFound();

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
          {/* 戻るリンク */}
          <Link
            href="/#schedule"
            className="mb-10 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-foreground/50 transition-colors hover:text-accent"
          >
            <span aria-hidden="true">←</span>
            今後の予定一覧へ
          </Link>

          {/* 日付 */}
          <time className="mb-6 block text-sm tracking-widest text-foreground/50">
            {item.date}
          </time>

          {/* タイトル */}
          <h1 className="font-serif text-3xl font-medium leading-snug text-foreground sm:text-4xl">
            {item.title}
          </h1>

          {/* 補足 */}
          {item.note && (
            <p className="mt-6 text-base leading-loose text-foreground/60">{item.note}</p>
          )}

          {/* 詳細(Markdown) */}
          {item.body && (
            <div className="prose-custom mt-10 border-t border-black/10 pt-10">
              <ReactMarkdown>{item.body}</ReactMarkdown>
            </div>
          )}
        </article>
      </main>

      <footer className="border-t border-black/10">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-2 px-6 py-8 text-xs tracking-widest text-foreground/40 md:flex-row md:justify-between lg:px-8">
          <p className="font-serif text-sm tracking-[0.2em] text-foreground/60">
            横浜国立大学経営者会 <span className="text-accent">和田町会</span>
          </p>
          <p>© 2026 横浜国立大学経営者会 All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
