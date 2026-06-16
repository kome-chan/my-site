import Link from "next/link";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import NewsSection from "@/components/NewsSection";
import { getNews } from "@/lib/news";
import { getSchedule } from "@/lib/schedule";
import { getSlides } from "@/lib/slider";
import {
  getHomeSettings,
  getAboutSettings,
  getJoinSettings,
  getSnsSettings,
  getFooterSettings,
  getChairmanSettings,
  getHistorySettings,
  getActivitiesSettings,
} from "@/lib/settings";
import { getMembers } from "@/lib/members";

export const revalidate = 60;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:outline";

export default async function Home() {
  // 日付の新しい順にソート(YYYY.MM.DD 形式は文字列比較で降順ソート可能)
  const news = (await getNews()).sort((a, b) => b.date.localeCompare(a.date));
  const schedule = await getSchedule();
  const slides = await getSlides();
  const homeSettings = await getHomeSettings();
  const aboutSettings = await getAboutSettings();
  const joinSettings = await getJoinSettings();
  const snsSettings = await getSnsSettings();
  const footerSettings = await getFooterSettings();
  const chairmanSettings = await getChairmanSettings();
  const historySettings = await getHistorySettings();
  const activitiesSettings = await getActivitiesSettings();
  const members = await getMembers();

  return (
    <>
      {/* スキップリンク: 通常は非表示、Tab キーで表示 */}
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:bg-background focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
      >
        メインコンテンツへスキップ
      </a>

      <div className="flex flex-col flex-1">
        <Header />

        <main id="main-content" className="flex flex-1 flex-col">
          {/* HERO — Client Component (スライダー) */}
          <HeroSlider
            slides={slides}
            catchphrase={homeSettings.catchphrase}
            since={homeSettings.since}
            subtext={homeSettings.subtext}
          />

          {/* ABOUT */}
          <section id="about" aria-labelledby="about-heading">
            <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
              <div className="mb-16 flex flex-col gap-4 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="mb-4 text-xs tracking-[0.4em] text-accent" aria-hidden="true">
                    ABOUT
                  </p>
                  <h2 id="about-heading" className="font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
                    和田町会について
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-loose text-foreground/60">
                  横浜国立大学経営者会「和田町会」は、母校で学んだ志を胸に、経営の実践と研鑽を続ける同窓のための集いです。
                </p>
              </div>

              <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
                <article className="flex flex-col gap-6 border-t border-black/10 pt-10">
                  <div className="flex items-baseline justify-between" aria-hidden="true">
                    <span className="font-serif text-xs tracking-[0.3em] text-accent">01</span>
                    <span className="text-xs tracking-[0.3em] text-foreground/40">Overview</span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium leading-snug text-foreground">
                    会の概要
                  </h3>
                  <p className="text-sm leading-loose text-foreground/70">
                    {aboutSettings.description}
                  </p>
                  <dl className="mt-2 space-y-3 text-xs tracking-wider text-foreground/60">
                    <div className="flex gap-6">
                      <dt className="w-20 shrink-0 text-accent/80">設立</dt>
                      <dd>{aboutSettings.establishedYear}</dd>
                    </div>
                    <div className="flex gap-6">
                      <dt className="w-20 shrink-0 text-accent/80">会員数</dt>
                      <dd>{aboutSettings.memberCount}</dd>
                    </div>
                    <div className="flex gap-6">
                      <dt className="w-20 shrink-0 text-accent/80">所在地</dt>
                      <dd>{aboutSettings.location}</dd>
                    </div>
                  </dl>
                </article>

                <article className="flex flex-col gap-6 border-t border-black/10 pt-10">
                  <div className="flex items-baseline justify-between" aria-hidden="true">
                    <span className="font-serif text-xs tracking-[0.3em] text-accent">02</span>
                    <span className="text-xs tracking-[0.3em] text-foreground/40">History</span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium leading-snug text-foreground">
                    設立経緯
                  </h3>
                  <ul className="mt-2 space-y-3 text-xs tracking-wider text-foreground/60">
                    {historySettings.items.map((item) => (
                      <li key={item.year} className="flex gap-6">
                        <span className="w-20 shrink-0 text-accent/80">{item.year}</span>
                        <span>{item.event}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="flex flex-col gap-6 border-t border-black/10 pt-10">
                  <div className="flex items-baseline justify-between" aria-hidden="true">
                    <span className="font-serif text-xs tracking-[0.3em] text-accent">03</span>
                    <span className="text-xs tracking-[0.3em] text-foreground/40">Message</span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium leading-snug text-foreground">
                    会長メッセージ
                  </h3>
                  {chairmanSettings.photo && (
                    <img
                      src={chairmanSettings.photo}
                      alt={`${chairmanSettings.name} 写真`}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  )}
                  <blockquote className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-2 -top-4 font-serif text-5xl leading-none text-accent/40"
                    >
                      "
                    </span>
                    <p className="whitespace-pre-line pl-4 text-sm leading-loose text-foreground/70">
                      {chairmanSettings.message}
                    </p>
                  </blockquote>
                  <div className="mt-2 border-t border-black/10 pt-4">
                    <p className="font-serif text-base text-foreground">{chairmanSettings.name}</p>
                    <p className="mt-1 text-xs tracking-widest text-foreground/60">
                      {chairmanSettings.title}
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* ACTIVITIES */}
          <section id="activities" aria-labelledby="activities-heading">
            <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
              <div className="mb-16 flex flex-col gap-4 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="mb-4 text-xs tracking-[0.4em] text-accent" aria-hidden="true">
                    ACTIVITIES
                  </p>
                  <h2 id="activities-heading" className="font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
                    活動内容
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-loose text-foreground/60">
                  三つの柱を軸に、会員一人ひとりが経営者としての視座と人間性を高めるための機会を提供しています。
                </p>
              </div>
              <ul className="grid gap-6 md:grid-cols-3 md:gap-8">
                {activitiesSettings.items.map((item, index) => (
                  <li key={item.title}>
                    <div className="group relative flex h-full flex-col gap-6 border border-black/10 bg-surface/40 p-8 lg:p-10">
                      <div className="flex items-baseline justify-between" aria-hidden="true">
                        <span className="font-serif text-xs tracking-[0.3em] text-accent">
                          0{index + 1}
                        </span>
                        <span className="text-xs tracking-[0.3em] text-foreground/40">
                          {item.subtitle}
                        </span>
                      </div>
                      <h3 className="font-serif text-3xl font-medium text-foreground lg:text-4xl">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-loose text-foreground/70">
                        {item.description}
                      </p>
                      <span
                        aria-hidden="true"
                        className="mt-4 inline-block h-px w-12 bg-accent/60"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* NEWS — Googleスプレッドシートから取得 */}
          <section id="news" aria-labelledby="news-heading">
            <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
              <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="mb-4 text-xs tracking-[0.4em] text-accent" aria-hidden="true">
                    NEWS
                  </p>
                  <h2 id="news-heading" className="font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
                    最新のお知らせ
                  </h2>
                </div>
              </div>
              <NewsSection news={news} />
            </div>
          </section>

          {/* SCHEDULE */}
          <section id="schedule" aria-labelledby="schedule-heading">
            <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
              <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="mb-4 text-xs tracking-[0.4em] text-accent" aria-hidden="true">
                    SCHEDULE
                  </p>
                  <h2 id="schedule-heading" className="font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
                    今後の予定
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-loose text-foreground/60">
                  直近の例会・講演会・懇親会の日程をご案内します。詳細は会員向けメールにてご連絡いたします。
                </p>
              </div>
              <ul className="divide-y divide-black/10 border-y border-black/10">
                {schedule.map((item) => {
                  const inner = (
                    <>
                      <time className="text-sm tracking-widest text-foreground/60">
                        {item.date}
                      </time>
                      <div className="flex flex-col gap-1">
                        <p className={`font-serif text-base leading-relaxed text-foreground sm:text-lg ${item.link || item.slug ? "underline-offset-4 decoration-accent/60 group-hover:underline" : ""}`}>
                          {item.title}
                        </p>
                        <p className="text-sm leading-loose text-foreground/60">{item.note}</p>
                      </div>
                    </>
                  );
                  const rowClass = "group grid gap-3 py-8 md:grid-cols-[140px_1fr] md:items-start md:gap-8";
                  return (
                    <li key={item.slug || item.title}>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${rowClass} transition-colors hover:text-accent ${focusRing}`}
                        >
                          {inner}
                        </a>
                      ) : item.slug ? (
                        <Link
                          href={`/schedule/${item.slug}`}
                          className={`${rowClass} transition-colors hover:text-accent ${focusRing}`}
                        >
                          {inner}
                        </Link>
                      ) : (
                        <div className={rowClass}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          {/* MEMBERS */}
          <section id="members" aria-labelledby="members-heading">
            <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
              <div className="mb-16 flex flex-col gap-4 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="mb-4 text-xs tracking-[0.4em] text-accent" aria-hidden="true">
                    MEMBERS
                  </p>
                  <h2 id="members-heading" className="font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
                    役員・会員紹介
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-loose text-foreground/60">
                  各界で活躍する会員が、母校への思いと経営への志を共有しています。
                </p>
              </div>
              <ul className="grid gap-6 md:grid-cols-3 md:gap-8">
                {members.map((member, index) => (
                  <li key={member.slug}>
                    <div className="flex flex-col border border-black/10 bg-surface/40">
                      {member.photo && (
                        <img
                          src={member.photo}
                          alt={`${member.name} 写真`}
                          className="h-48 w-full object-cover object-top"
                        />
                      )}
                      {!member.photo && (
                        <div className="flex h-48 w-full items-center justify-center bg-surface/60">
                          <span className="font-serif text-3xl text-foreground/20">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col gap-6 p-8 lg:p-10">
                        <div className="flex items-baseline justify-between" aria-hidden="true">
                          <span className="font-serif text-xs tracking-[0.3em] text-accent">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-xs tracking-[0.3em] text-foreground/60">
                            {member.graduationYear}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="font-serif text-2xl font-medium text-foreground">
                            {member.name}
                          </p>
                          <p className="text-xs tracking-wider text-foreground/60">
                            {member.role}
                          </p>
                        </div>
                        <div className="flex flex-col gap-3 border-t border-black/10 pt-4">
                          {member.companyUrl ? (
                            <a
                              href={member.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.company}（外部リンク）`}
                              className={`text-sm leading-loose text-foreground/70 transition-colors hover:text-accent ${focusRing}`}
                            >
                              {member.company}
                              <span aria-hidden="true" className="ml-2 text-accent/60">↗</span>
                            </a>
                          ) : (
                            <p className="text-sm leading-loose text-foreground/70">
                              {member.company}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* JOIN */}
          <section id="join" aria-labelledby="join-heading">
            <div className="mx-auto w-full max-w-4xl px-6 py-24 text-center lg:py-32">
              <p className="mb-6 text-xs tracking-[0.4em] text-accent" aria-hidden="true">
                JOIN US
              </p>
              <h2 id="join-heading" className="font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
                共に学び、共に高め合う。
              </h2>
              <p className="mx-auto mt-8 max-w-xl text-sm leading-loose text-foreground/70 sm:text-base">
                {joinSettings.description}
              </p>
              <a
                href={joinSettings.formUrl}
                className={`mt-12 inline-flex items-center justify-center gap-3 bg-accent px-12 py-4 text-sm tracking-[0.2em] text-background transition-colors hover:bg-accent/90 ${focusRing}`}
              >
                入会案内を請求する
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </section>

          {/* SNS */}
          <section id="sns" aria-labelledby="sns-heading" className="bg-surface/30">
            <div className="mx-auto w-full max-w-4xl px-6 py-24 text-center lg:py-32">
              <p className="mb-6 text-xs tracking-[0.4em] text-accent" aria-hidden="true">SNS</p>
              <h2 id="sns-heading" className="font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
                公式SNS
              </h2>
              <p className="mx-auto mt-8 max-w-xl text-sm leading-loose text-foreground/70">
                最新の活動情報や講演会のお知らせを発信しています。
              </p>
              <div className="mt-12 flex items-center justify-center gap-8">
                <a
                  href={snsSettings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook公式ページ（外部リンク）"
                  className={`text-foreground/50 transition-colors hover:text-accent ${focusRing}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.271h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={snsSettings.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter公式アカウント（外部リンク）"
                  className={`text-foreground/50 transition-colors hover:text-accent ${focusRing}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-black/10">
          {/* ① リンク集 */}
          <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-12">
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
              {/* 縦2列リンク */}
              <nav aria-label="フッターナビゲーション">
                <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm tracking-wider text-foreground/60">
                  {[
                    { label: "和田町会について", href: "#about" },
                    { label: "今後の予定", href: "#schedule" },
                    { label: "活動内容", href: "#activities" },
                    { label: "入会案内", href: "#join" },
                    { label: "会員紹介", href: "#members" },
                    { label: "公式SNS", href: "#sns" },
                    { label: "最新のお知らせ", href: "#news" },
                  ].map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className={`whitespace-nowrap transition-colors hover:text-accent ${focusRing}`}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              {/* ロゴマーク */}
              <div className="shrink-0">
                <img
                  src="/和田町会ロゴ＿マークのみ.png"
                  alt="和田町会 ロゴマーク"
                  className="h-20 w-auto"
                />
              </div>
            </div>
          </div>

          {/* ② 下部: 基本情報 */}
          <div className="border-t border-black/10">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2 px-6 py-6 text-xs tracking-widest text-foreground/50 md:flex-row md:justify-between lg:px-12">
              <p className="font-serif text-sm tracking-[0.2em] text-foreground/70 text-center md:text-left">
                横浜国立大学経営者会 <span className="text-accent">和田町会</span>
              </p>
              <p className="text-center md:text-right">{footerSettings.copyright}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
