"use client";

import { useState, useEffect } from "react";
import type { SlideItem } from "@/lib/slider";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:outline";

export default function HeroSlider({ slides }: { slides: SlideItem[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const multiple = slides.length > 1;

  useEffect(() => {
    if (!multiple) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, multiple]);

  return (
    <section aria-label="ヒーロー" className="relative h-screen overflow-hidden">
      {/* Image slider */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.slug}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: index === currentSlide ? 1 : 0 }}
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

      {/* Hero text */}
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

      {/* Dot navigation (2枚以上のときのみ表示) */}
      {multiple && (
        <div
          role="group"
          aria-label="スライドナビゲーション"
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2"
        >
          {slides.map((slide, index) => (
            <button
              key={slide.slug}
              aria-label={`スライド ${index + 1}${index === currentSlide ? "（現在表示中）" : ""}`}
              aria-pressed={index === currentSlide}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
                index === currentSlide
                  ? "bg-accent scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
