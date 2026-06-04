"use client";

import { useState } from "react";

const navItems = [
  { label: "和田町会について", href: "#about" },
  { label: "活動内容", href: "#activities" },
  { label: "お知らせ", href: "#news" },
  { label: "今後の予定", href: "#schedule" },
  { label: "会員紹介", href: "#members" },
  { label: "入会案内", href: "#join" },
  { label: "SNS", href: "#sns" },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:outline";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <nav
        aria-label="メインナビゲーション"
        className="flex w-full items-center justify-between px-6 py-3 lg:px-12"
      >
        <a href="/" className={`flex items-center gap-3 ${focusRing}`}>
          <img
            src="/和田町会ロゴ＿横組み.png"
            alt="横浜国立大学 和田町会 ロゴ"
            className="h-14 w-auto"
          />
        </a>

        {/* デスクトップナビ (lg以上) */}
        <div className="hidden items-center gap-4 lg:flex">
          <ul className="flex items-center gap-4 text-sm tracking-wider text-foreground/80">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`whitespace-nowrap transition-colors hover:text-accent ${focusRing}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook（外部リンク）"
              className={`text-foreground/40 transition-colors hover:text-accent ${focusRing}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.271h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter（外部リンク）"
              className={`text-foreground/40 transition-colors hover:text-accent ${focusRing}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#join"
              className={`border border-accent/60 px-5 py-2 text-xs tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-background ${focusRing}`}
            >
              JOIN US
            </a>
          </div>
        </div>

        {/* ハンバーガーボタン (lg未満) */}
        <button
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className={`flex flex-col justify-center gap-1.5 p-1 lg:hidden ${focusRing}`}
        >
          <span
            className={`block h-px w-6 bg-foreground transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="border-t border-black/10 bg-background/95 px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-4 text-sm tracking-wider text-foreground/80">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-1 transition-colors hover:text-accent ${focusRing}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-4 border-t border-black/10 pt-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook（外部リンク）"
              className={`text-foreground/40 transition-colors hover:text-accent ${focusRing}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.271h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter（外部リンク）"
              className={`text-foreground/40 transition-colors hover:text-accent ${focusRing}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#join"
              onClick={() => setMenuOpen(false)}
              className={`border border-accent/60 px-5 py-2 text-xs tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-background ${focusRing}`}
            >
              JOIN US
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
