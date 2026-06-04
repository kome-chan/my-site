"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { SlideItem } from "@/lib/slider";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 focus-visible:outline";

export default function HeroSlider({ slides }: { slides: SlideItem[] }) {
  const [current, setCurrent] = useState(0);
  const multiple = slides.length > 1;

  // タッチ操作用
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const go = useCallback(
    (index: number) => {
      setCurrent((index + slides.length) % slides.length);
    },
    [slides.length]
  );

  const prev = useCallback(() => go(current - 1), [current, go]);
  const next = useCallback(() => go(current + 1), [current, go]);

  // 自動切替: current が変わるたびタイマーをリセット
  useEffect(() => {
    if (!multiple) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, slides.length, multiple]);

  // キーボード操作
  useEffect(() => {
    if (!multiple) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, multiple]);

  // タッチ操作
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // 縦スクロールより横移動が大きい場合のみ反応
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      dx < 0 ? next() : prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      aria-label="ヒーロー"
      className="relative h-screen overflow-hidden"
      onTouchStart={multiple ? onTouchStart : undefined}
      onTouchEnd={multiple ? onTouchEnd : undefined}
    >
      {/* 画像レイヤー */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.slug}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: index === current ? 1 : 0 }}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* ヒーローテキスト */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-6 lg:px-12">
        <p className="mb-8 flex items-center gap-4 text-xs tracking-[0.4em] text-accent">
          <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
          SINCE 1952
        </p>
        <h1 className="font-serif text-4xl font-medium leading-[1.3] text-white sm:text-5xl lg:text-6xl lg:leading-[1.25]">
          知を磨き、
          <br />
          次代の経営を拓く。
        </h1>
        <p className="mt-10 max-w-2xl text-base leading-loose text-white/70 sm:text-lg">
          横浜国立大学経営者会は、卒業生有志により設立された経営者・実務家のための学びと交流の場です。
          半世紀以上にわたり、経営の知見を深め合い、社会への責任を果たす人材を輩出してきました。
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#join"
            className={`inline-flex items-center justify-center gap-3 bg-accent px-10 py-4 text-sm tracking-[0.2em] text-background transition-colors hover:bg-accent/90 ${focusRing}`}
          >
            入会案内を見る
            <span aria-hidden="true">→</span>
          </a>
          <a
            href="#about"
            className={`inline-flex items-center justify-center gap-3 border border-white/40 px-10 py-4 text-sm tracking-[0.2em] text-white transition-colors hover:border-accent hover:text-accent ${focusRing}`}
          >
            和田町会について
          </a>
        </div>
      </div>

      {/* 矢印 + ドットインジケーター */}
      {multiple && (
        <div
          role="group"
          aria-label="スライドナビゲーション"
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4"
        >
          {/* 前へ */}
          <button
            aria-label="前の画像へ"
            onClick={prev}
            className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/30 text-white transition-colors hover:bg-white/50 ${focusRing}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* ドット */}
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.slug}
                aria-label={`画像${index + 1}へ`}
                aria-pressed={index === current}
                onClick={() => go(index)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
                  index === current
                    ? "w-6 bg-accent"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* 次へ */}
          <button
            aria-label="次の画像へ"
            onClick={next}
            className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/30 text-white transition-colors hover:bg-white/50 ${focusRing}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
