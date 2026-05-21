"use client";

import { useEffect, useRef } from "react";

const activities = [
  {
    title: "講義",
    subtitle: "LECTURE",
    description:
      "各界の第一線で活躍する経営者・研究者を招き、最新の経営理論と実践知に触れる定例講義を開催しています。",
  },
  {
    title: "交流",
    subtitle: "NETWORKING",
    description:
      "業界・世代を超えた会員同士が、信頼に基づく対話を重ねながら、長期的なネットワークを築く場を提供します。",
  },
  {
    title: "成長",
    subtitle: "GROWTH",
    description:
      "学び続ける姿勢こそ経営の本質。研鑽の機会を通じて、個と組織の持続的な成長を支援します。",
  },
];

const news = [
  {
    date: "2026.05.12",
    title:
      "第48回定例講演会「これからの企業統治と長期的価値創造」開催のお知らせ",
  },
  {
    date: "2026.04.20",
    title:
      "2026年度通常総会・懇親会の開催および新役員選任に関するご報告",
  },
  {
    date: "2026.03.15",
    title: "和田町会奨学基金 2026年度給付対象者を決定いたしました",
  },
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export default function Keieisha() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.4,
    }));

    const mouse = { x: width / 2, y: height / 2, active: false };

    const waves = Array.from({ length: 4 }, (_, i) => ({
      amplitude: 24 + i * 18,
      frequency: 0.004 + i * 0.0012,
      phase: (i * Math.PI) / 2,
      speed: 0.0008 + i * 0.0004,
      yOffset: 0.18 + i * 0.22,
    }));

    let time = 0;
    let raf = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      for (let i = 0; i < waves.length; i++) {
        const w = waves[i];
        ctx.beginPath();
        const y0 = height * w.yOffset;
        ctx.moveTo(0, y0);
        for (let x = 0; x <= width; x += 4) {
          const y =
            y0 +
            Math.sin(x * w.frequency + time * w.speed + w.phase) * w.amplitude;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle =
          i % 2 === 0 ? "rgba(26,95,173,0.22)" : "rgba(91,163,224,0.28)";
        ctx.lineWidth = 1;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(26,95,173,0.25)";
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      for (const p of particles) {
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 250 * 250 && d2 > 1) {
            const d = Math.sqrt(d2);
            const f = 0.015 * (1 - d / 250);
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        if (Math.abs(p.vx) < 0.04) p.vx += (Math.random() - 0.5) * 0.04;
        if (Math.abs(p.vy) < 0.04) p.vy += (Math.random() - 0.5) * 0.04;
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120) {
            const d = Math.sqrt(d2);
            const a = (1 - d / 120) * 0.35;
            ctx.strokeStyle = `rgba(26,95,173,${a})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(26,95,173,0.75)";
        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgba(26,95,173,0.4)";
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    const els = document.querySelectorAll<HTMLElement>("[data-fade]");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-[#05112A]">
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
      />

      <div className="relative z-10">
        <section className="relative flex min-h-screen items-center justify-center px-6">
          <div
            data-fade
            className="text-center opacity-0 translate-y-8 transition-all duration-[1400ms] ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
          >
            <h1 className="font-serif font-medium leading-[1.15] tracking-tight text-[clamp(2.75rem,10vw,9rem)]">
              知を磨き、
              <br />
              次代の経営を拓く。
            </h1>
            <p className="mt-12 text-[0.65rem] tracking-[0.4em] text-[#05112A]/60 sm:text-xs lg:text-sm">
              YOKOHAMA NATIONAL UNIVERSITY{" "}
              <span className="text-[#1A5FAD]">経営者和田町会</span>
            </p>
          </div>
          <div
            aria-hidden
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <span
              className="block animate-pulse text-2xl text-[#05112A]/40"
              style={{ animationDuration: "2.6s" }}
            >
              ↓
            </span>
          </div>
        </section>

        <section className="relative px-6 py-32 lg:py-48">
          <div className="mx-auto max-w-6xl">
            {activities.map((a, i) => (
              <div
                key={a.title}
                data-fade
                className="relative py-20 opacity-0 translate-y-12 transition-all duration-[1400ms] ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 lg:py-32"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 select-none font-serif font-medium leading-none text-[#1A5FAD]/[0.08] text-[clamp(8rem,25vw,22rem)]"
                >
                  0{i + 1}
                </span>
                <div className="relative max-w-2xl pl-4 lg:pl-24">
                  <p className="text-xs tracking-[0.4em] text-[#1A5FAD]">
                    {a.subtitle}
                  </p>
                  <h3 className="mt-6 font-serif font-medium leading-tight text-5xl lg:text-7xl">
                    {a.title}
                  </h3>
                  <p className="mt-8 text-base leading-loose text-[#05112A]/60 lg:text-lg">
                    {a.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative px-6 py-32 lg:py-40">
          <div
            data-fade
            className="mx-auto max-w-4xl opacity-0 translate-y-8 transition-all duration-[1400ms] ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
          >
            <p className="mb-4 text-xs tracking-[0.4em] text-[#1A5FAD]">NEWS</p>
            <h2 className="mb-16 font-serif font-medium leading-tight text-4xl lg:text-6xl">
              お知らせ
            </h2>
            <ul className="border-l-2 border-[#1A5FAD]">
              {news.map((n) => (
                <li key={n.title}>
                  <a
                    href="#"
                    className="group flex flex-col gap-2 py-6 pl-8 transition-colors sm:flex-row sm:items-baseline sm:gap-8 lg:py-8"
                  >
                    <time className="shrink-0 text-xs tracking-widest text-[#1A5FAD]">
                      {n.date}
                    </time>
                    <p className="font-serif text-base leading-relaxed text-[#05112A]/60 transition-colors group-hover:text-[#05112A] sm:text-lg lg:text-xl">
                      {n.title}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative flex items-center justify-center px-6 py-40 lg:py-56">
          <div
            data-fade
            className="text-center opacity-0 translate-y-8 transition-all duration-[1400ms] ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
          >
            <h2 className="font-serif font-medium leading-tight text-[clamp(2rem,6vw,5rem)]">
              共に学び、
              <br />
              共に高め合う。
            </h2>
            <a
              href="#"
              className="mt-16 inline-block border border-[#1A5FAD] px-16 py-5 text-sm tracking-[0.3em] text-[#1A5FAD] transition-colors duration-500 hover:bg-[#1A5FAD] hover:text-white"
            >
              入会案内を見る
            </a>
          </div>
        </section>

        <footer className="relative px-6 py-10 text-center text-[0.65rem] tracking-[0.3em] text-[#05112A]/40">
          © 2025 横浜国立大学経営者和田町会
        </footer>
      </div>
    </div>
  );
}
