import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import { getNewsBySlug, getAllNewsSlugs } from "@/lib/news";

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return {};
  return { title: `${item.title} | 和田町会` };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
          {/* 戻るリンク */}
          <Link
            href="/#news"
            className="mb-10 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-foreground/50 transition-colors hover:text-accent"
          >
            <span aria-hidden="true">←</span>
            お知らせ一覧へ
          </Link>

          {/* メタ情報 */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <time className="text-sm tracking-widest text-foreground/50">{item.date}</time>
            {item.category && (
              <span className="inline-block border border-accent/50 px-3 py-1 text-xs tracking-widest text-accent">
                {item.category}
              </span>
            )}
          </div>

          {/* タイトル */}
          <h1 className="font-serif text-3xl font-medium leading-snug text-foreground sm:text-4xl">
            {item.title}
          </h1>

          {/* サムネイル */}
          {item.thumbnail && (
            <div className="mt-10">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full rounded-none object-cover"
              />
            </div>
          )}

          {/* 本文 */}
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
