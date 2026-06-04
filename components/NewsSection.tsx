"use client";

import { useState } from "react";
import type { NewsItem } from "@/lib/news";

const PER_PAGE = 3;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:outline";

export default function NewsSection({ news }: { news: NewsItem[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(news.length / PER_PAGE));
  const items = news.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <ul className="divide-y divide-black/10 border-y border-black/10">
        {items.map((item) =>
          item.link ? (
            <li key={item.title}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group grid gap-3 py-8 transition-colors hover:text-accent md:grid-cols-[140px_120px_1fr] md:items-center md:gap-8 ${focusRing}`}
              >
                <time className="text-sm tracking-widest text-foreground/60">
                  {item.date}
                </time>
                <span className="inline-block w-fit border border-accent/50 px-3 py-1 text-xs tracking-widest text-accent">
                  {item.category}
                </span>
                <p className="font-serif text-base leading-relaxed underline-offset-4 decoration-accent/60 group-hover:underline sm:text-lg">
                  {item.title}
                </p>
              </a>
            </li>
          ) : (
            <li key={item.title}>
              <div className="grid gap-3 py-8 md:grid-cols-[140px_120px_1fr] md:items-center md:gap-8">
                <time className="text-sm tracking-widest text-foreground/60">
                  {item.date}
                </time>
                <span className="inline-block w-fit border border-accent/50 px-3 py-1 text-xs tracking-widest text-accent">
                  {item.category}
                </span>
                <p className="font-serif text-base leading-relaxed sm:text-lg">
                  {item.title}
                </p>
              </div>
            </li>
          )
        )}
      </ul>

      {/* ページネーション */}
      {totalPages > 1 && (
        <nav
          aria-label="お知らせのページナビゲーション"
          className="mt-10 flex items-center justify-center gap-1"
        >
          {/* ← 前へ */}
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            aria-label="前のページへ"
            className={`flex h-8 w-8 items-center justify-center text-sm text-foreground/50 transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 ${focusRing}`}
          >
            ←
          </button>

          {/* ページ番号 */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              aria-label={`${n}ページ目`}
              aria-current={n === page ? "page" : undefined}
              className={`flex h-8 w-8 items-center justify-center text-xs tracking-widest transition-colors ${focusRing} ${
                n === page
                  ? "border border-accent text-accent"
                  : "text-foreground/50 hover:text-accent"
              }`}
            >
              {n}
            </button>
          ))}

          {/* → 次へ */}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            aria-label="次のページへ"
            className={`flex h-8 w-8 items-center justify-center text-sm text-foreground/50 transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 ${focusRing}`}
          >
            →
          </button>
        </nav>
      )}
    </>
  );
}
