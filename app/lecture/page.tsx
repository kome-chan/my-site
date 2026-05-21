"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "和田町会について", href: "/#about" },
  { label: "活動内容", href: "/#activities" },
  { label: "お知らせ", href: "/#news" },
  { label: "入会案内", href: "/#join" },
];

type Lecture = {
  no: number;
  title: string;
  speaker: string;
  date: string;
};

const lectures: Record<string, Lecture[]> = {
  "2024": [
    {
      no: 51,
      title: "生成AIと経営意思決定――不確実性の時代における戦略論",
      speaker: "田中 一郎（株式会社AI経営研究所 代表取締役）",
      date: "2025年2月",
    },
    {
      no: 50,
      title: "グローバル経営とローカル戦略の両立",
      speaker: "鈴木 花子（元・多国籍企業CEO、横浜国立大学特任教授）",
      date: "2024年11月",
    },
    {
      no: 49,
      title: "サステナビリティ経営の実践――ESGから本質的価値創造へ",
      speaker: "佐藤 誠（東証プライム上場企業 CFO）",
      date: "2024年8月",
    },
    {
      no: 48,
      title: "これからの企業統治と長期的価値創造",
      speaker: "伊藤 健二（横浜国立大学大学院 教授）",
      date: "2024年5月",
    },
  ],
  "2023": [
    {
      no: 47,
      title: "組織変革とリーダーシップ論――現場から見たDXの真実",
      speaker: "中村 正夫（経営コンサルタント、MBA）",
      date: "2024年2月",
    },
    {
      no: 46,
      title: "DXと中小企業経営――デジタル化の本質を問い直す",
      speaker: "小林 康夫（神奈川県中小企業診断士協会 会長）",
      date: "2023年11月",
    },
    {
      no: 45,
      title: "ポストコロナ時代の経営戦略――回復から変革へ",
      speaker: "渡辺 真理子（経営学博士、早稲田大学准教授）",
      date: "2023年8月",
    },
    {
      no: 44,
      title: "創業者精神と事業承継――百年企業を目指す経営哲学",
      speaker: "山本 龍二（老舗企業3代目経営者）",
      date: "2023年5月",
    },
  ],
};

const schedule = [
  { month: "4月", event: "通常総会・懇親会", type: "special" },
  { month: "5月", event: "第1回定例講義", type: "lecture" },
  { month: "6月", event: "研究部会", type: "study" },
  { month: "7月", event: "第2回定例講義（夏季）", type: "lecture" },
  { month: "8月", event: "夏季休暇", type: "break" },
  { month: "9月", event: "研究部会・懇親会", type: "study" },
  { month: "10月", event: "第3回定例講義", type: "lecture" },
  { month: "11月", event: "交流懇親会", type: "special" },
  { month: "12月", event: "年末懇親会", type: "special" },
  { month: "1月", event: "新年会・懇親会", type: "special" },
  { month: "2月", event: "第4回定例講義", type: "lecture" },
  { month: "3月", event: "年度まとめ・懇親会", type: "special" },
];

export default function LecturePage() {
  const [activeYear, setActiveYear] = useState<"2024" | "2023">("2024");

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
          <Link
            href="/"
            className="font-serif text-base tracking-[0.2em] text-foreground sm:text-lg"
          >
            <span className="text-accent">横浜国立大学経営者和田町会</span>
          </Link>
          <ul className="hidden items-center gap-10 text-sm tracking-wider text-foreground/80 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#join"
            className="hidden border border-accent/60 px-5 py-2 text-xs tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-background md:inline-block"
          >
            JOIN US
          </Link>
        </nav>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="border-b border-black/10 bg-surface/30">
          <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
            <p className="mb-6 flex items-center gap-4 text-xs tracking-[0.4em] text-accent">
              <Link
                href="/"
                className="transition-colors hover:text-accent/70"
              >
                TOP
              </Link>
              <span className="inline-block h-px w-6 bg-accent/40" />
              <Link
                href="/#activities"
                className="transition-colors hover:text-accent/70"
              >
                活動内容
              </Link>
              <span className="inline-block h-px w-6 bg-accent/40" />
              <span>講義・勉強会</span>
            </p>
            <p className="mb-4 text-xs tracking-[0.4em] text-accent">
              LECTURE
            </p>
            <h1 className="font-serif text-4xl font-medium leading-[1.3] text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.25]">
              講義・勉強会
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-loose text-foreground/70 sm:text-lg">
              各界の第一線で活躍する経営者・研究者を招き、<br className="hidden sm:inline" />
              最新の経営理論と実践知に触れる定例講義を開催しています。
            </p>
          </div>
        </section>

        {/* Description */}
        <section>
          <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
              <article className="flex flex-col gap-6 border-t border-black/10 pt-10">
                <span className="font-serif text-xs tracking-[0.3em] text-accent">
                  01
                </span>
                <h3 className="font-serif text-2xl font-medium leading-snug text-foreground">
                  開催概要
                </h3>
                <p className="text-sm leading-loose text-foreground/70">
                  月1回を基本として、年間4〜5回の定例講義を開催しています。会場は横浜市内の施設を中心に、オンライン参加にも対応しています。
                </p>
                <dl className="mt-2 space-y-3 text-xs tracking-wider text-foreground/60">
                  <div className="flex gap-6">
                    <dt className="w-20 shrink-0 text-accent/80">頻度</dt>
                    <dd>年4〜5回（月1回を目安）</dd>
                  </div>
                  <div className="flex gap-6">
                    <dt className="w-20 shrink-0 text-accent/80">時間</dt>
                    <dd>18:30〜20:30（懇親会含む）</dd>
                  </div>
                  <div className="flex gap-6">
                    <dt className="w-20 shrink-0 text-accent/80">会場</dt>
                    <dd>横浜市内・オンライン</dd>
                  </div>
                </dl>
              </article>

              <article className="flex flex-col gap-6 border-t border-black/10 pt-10">
                <span className="font-serif text-xs tracking-[0.3em] text-accent">
                  02
                </span>
                <h3 className="font-serif text-2xl font-medium leading-snug text-foreground">
                  テーマ・内容
                </h3>
                <p className="text-sm leading-loose text-foreground/70">
                  経営戦略・組織論・財務・テクノロジーなど幅広いテーマを取り上げます。理論と実践の架け橋となる、現場の知見に富んだ講義が特徴です。
                </p>
                <ul className="mt-2 space-y-2 text-xs tracking-wider text-foreground/60">
                  {["経営戦略・競争優位論", "組織論・リーダーシップ", "DX・テクノロジー経営", "サステナビリティ・ESG", "財務・ファイナンス"].map((topic) => (
                    <li key={topic} className="flex items-center gap-3">
                      <span className="inline-block h-px w-4 bg-accent/40" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="flex flex-col gap-6 border-t border-black/10 pt-10">
                <span className="font-serif text-xs tracking-[0.3em] text-accent">
                  03
                </span>
                <h3 className="font-serif text-2xl font-medium leading-snug text-foreground">
                  講師について
                </h3>
                <p className="text-sm leading-loose text-foreground/70">
                  会員企業の経営者・研究者のほか、横浜国立大学の教授陣、外部の専門家など、各分野のエキスパートをお招きしています。講義後の懇親会では講師と直接対話する機会も設けています。
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Past Lectures */}
        <section className="bg-surface/30">
          <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-4 text-xs tracking-[0.4em] text-accent">
                  ARCHIVE
                </p>
                <h2 className="font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
                  過去の講義一覧
                </h2>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-10 flex gap-0 border-b border-black/10">
              {(["2024", "2023"] as const).map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-8 py-4 text-sm tracking-[0.2em] transition-colors ${
                    activeYear === year
                      ? "border-b-2 border-accent text-accent"
                      : "text-foreground/50 hover:text-foreground/80"
                  }`}
                >
                  {year}年度
                </button>
              ))}
            </div>

            <ul className="divide-y divide-black/10 border-y border-black/10">
              {lectures[activeYear].map((item) => (
                <li key={item.no}>
                  <div className="grid gap-3 py-8 md:grid-cols-[80px_120px_1fr] md:items-start md:gap-8">
                    <span className="font-serif text-sm tracking-widest text-accent">
                      第{item.no}回
                    </span>
                    <time className="text-sm tracking-widest text-foreground/60">
                      {item.date}
                    </time>
                    <div className="flex flex-col gap-2">
                      <p className="font-serif text-base leading-relaxed text-foreground sm:text-lg">
                        {item.title}
                      </p>
                      <p className="text-xs tracking-wider text-foreground/50">
                        {item.speaker}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Annual Schedule */}
        <section>
          <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
            <div className="mb-16">
              <p className="mb-4 text-xs tracking-[0.4em] text-accent">
                SCHEDULE
              </p>
              <h2 className="font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
                年間スケジュール
              </h2>
              <p className="mt-4 text-sm leading-loose text-foreground/60">
                ※ 年度により変更となる場合があります。詳細は各開催案内をご確認ください。
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {schedule.map((item) => (
                <div
                  key={item.month}
                  className={`flex flex-col gap-3 border p-6 ${
                    item.type === "lecture"
                      ? "border-accent/40 bg-accent/5"
                      : "border-black/10 bg-surface/30"
                  }`}
                >
                  <span
                    className={`font-serif text-lg font-medium ${
                      item.type === "lecture" ? "text-accent" : "text-foreground/60"
                    }`}
                  >
                    {item.month}
                  </span>
                  <p className="text-sm leading-snug text-foreground/80">
                    {item.event}
                  </p>
                  {item.type === "lecture" && (
                    <span className="inline-block w-fit border border-accent/50 px-2 py-0.5 text-xs tracking-widest text-accent">
                      定例講義
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to join */}
        <section className="bg-surface/30">
          <div className="mx-auto w-full max-w-4xl px-6 py-24 text-center lg:py-32">
            <p className="mb-6 text-xs tracking-[0.4em] text-accent">
              PARTICIPATION
            </p>
            <h2 className="font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
              参加方法
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-sm leading-loose text-foreground/70 sm:text-base">
              定例講義は原則として会員の方を対象に開催しております。入会をご希望の方は、入会案内ページよりご請求ください。会員の方は各回の開催案内メールにてご案内いたします。
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/#join"
                className="inline-flex items-center justify-center gap-3 bg-accent px-10 py-4 text-sm tracking-[0.2em] text-background transition-colors hover:bg-accent/90"
              >
                入会案内を見る
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 border border-foreground/20 px-10 py-4 text-sm tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                トップへ戻る
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 text-xs tracking-widest text-foreground/50 sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <p className="font-serif text-sm tracking-[0.2em] text-foreground/80">
            <span className="text-accent">横浜国立</span>大学経営者会
          </p>
          <p>© 2025 横浜国立大学経営者会  All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
