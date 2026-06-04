import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import NewsSection from "@/components/NewsSection";
import { getNews } from "@/lib/news";
import { getSchedule } from "@/lib/schedule";

export const revalidate = 60;

const navItems = [
  { label: "和田町会について", href: "#about" },
  { label: "活動内容", href: "#activities" },
  { label: "お知らせ", href: "#news" },
  { label: "今後の予定", href: "#schedule" },
  { label: "会員紹介", href: "#members" },
  { label: "入会案内", href: "#join" },
  { label: "SNS", href: "#sns" },
];

const activities = [
  {
    title: "講義",
    subtitle: "Lecture",
    description:
      "各界の第一線で活躍する経営者・研究者を招き、最新の経営理論と実践知に触れる定例講義を開催しています。",
    href: "/lecture",
  },
  {
    title: "交流",
    subtitle: "Networking",
    description:
      "業界・世代を超えた会員同士が、信頼に基づく対話を重ねながら、長期的なネットワークを築く場を提供します。",
    href: "/networking",
  },
  {
    title: "成長",
    subtitle: "Growth",
    description:
      "学び続ける姿勢こそ経営の本質。研鑽の機会を通じて、個と組織の持続的な成長を支援します。",
    href: "/growth",
  },
];

type SnsLink = { label: string; href: string };

type Member = {
  name: string;
  company: string;
  role: string;
  year: string;
  companyUrl?: string;
  sns?: SnsLink[];
};

const members: Member[] = [
  {
    name: "山田 太郎",
    company: "山田商事株式会社",
    role: "会長 / 代表取締役社長",
    year: "1985年卒",
    companyUrl: "https://example.com",
    sns: [
      { label: "X", href: "https://x.com/example" },
      { label: "LinkedIn", href: "https://linkedin.com/in/example" },
    ],
  },
  {
    name: "鈴木 花子",
    company: "鈴木工業株式会社",
    role: "副会長 / 取締役会長",
    year: "1988年卒",
    companyUrl: "https://example.com",
  },
  {
    name: "田中 一郎",
    company: "田中コンサルティング",
    role: "幹事 / 代表取締役",
    year: "1991年卒",
    sns: [{ label: "note", href: "https://note.com/example" }],
  },
  {
    name: "佐藤 次郎",
    company: "佐藤製造株式会社",
    role: "幹事 / 代表取締役社長",
    year: "1993年卒",
    companyUrl: "https://example.com",
    sns: [{ label: "LinkedIn", href: "https://linkedin.com/in/example" }],
  },
  {
    name: "伊藤 美穂",
    company: "伊藤不動産株式会社",
    role: "会計 / 取締役副社長",
    year: "1996年卒",
  },
  {
    name: "渡辺 健司",
    company: "渡辺物流株式会社",
    role: "監事 / 代表取締役",
    year: "1999年卒",
    companyUrl: "https://example.com",
  },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:outline";

export default async function Home() {
  // 日付の新しい順にソート(YYYY.MM.DD 形式は文字列比較で降順ソート可能)
  const news = (await getNews()).sort((a, b) => b.date.localeCompare(a.date));
  const schedule = await getSchedule();

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
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
          <nav
            aria-label="メインナビゲーション"
            className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-12"
          >
            <a href="/" className={`flex items-center gap-3 ${focusRing}`}>
              <img
                src="/和田町会_ロゴ.JPG"
                alt="横浜国立大学 和田町会 ロゴ"
                className="h-10 w-auto"
              />
              <span className="font-serif text-base tracking-[0.2em] text-foreground sm:text-lg">
                <span className="text-accent">和田町会横浜国大経営者会</span>
              </span>
            </a>
            <ul className="hidden items-center gap-6 text-sm tracking-wider text-foreground/80 md:flex">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`transition-colors hover:text-accent ${focusRing}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="hidden items-center gap-4 md:flex">
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
          </nav>
        </header>

        <main id="main-content" className="flex flex-1 flex-col">
          {/* HERO — Client Component (スライダー) */}
          <HeroSlider />

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
                    和田町会は、横浜国立大学の卒業生を中心に、企業経営者・実務家・研究者をもって構成される任意団体です。定例講演会、研究部会、地域交流、後進育成のための奨学支援など、多面的な活動を通じて、会員相互の研鑽と母校の発展に資することを目的としています。
                  </p>
                  <dl className="mt-2 space-y-3 text-xs tracking-wider text-foreground/60">
                    <div className="flex gap-6">
                      <dt className="w-20 shrink-0 text-accent/80">設立</dt>
                      <dd>1952年</dd>
                    </div>
                    <div className="flex gap-6">
                      <dt className="w-20 shrink-0 text-accent/80">会員数</dt>
                      <dd>約100名</dd>
                    </div>
                    <div className="flex gap-6">
                      <dt className="w-20 shrink-0 text-accent/80">所在地</dt>
                      <dd>横浜市保土ケ谷区</dd>
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
                  <p className="text-sm leading-loose text-foreground/70">
                    戦後復興の只中にあった1952年、横浜国立大学の前身校に学んだ実業家有志が、母校の所在地「和田町」の名を冠して結成したのが本会の始まりです。以来70年以上にわたり、時代の変遷とともに会の役割を拡げながらも、「学び続ける経営者の集い」という創立の理念を変わらず受け継いでいます。
                  </p>
                  <ul className="mt-2 space-y-3 text-xs tracking-wider text-foreground/60">
                    <li className="flex gap-6">
                      <span className="w-20 shrink-0 text-accent/80">1952</span>
                      <span>和田町会 創立</span>
                    </li>
                    <li className="flex gap-6">
                      <span className="w-20 shrink-0 text-accent/80">1978</span>
                      <span>定例講演会の通算100回を達成</span>
                    </li>
                    <li className="flex gap-6">
                      <span className="w-20 shrink-0 text-accent/80">2002</span>
                      <span>創立50周年記念事業・奨学基金を設立</span>
                    </li>
                    <li className="flex gap-6">
                      <span className="w-20 shrink-0 text-accent/80">2022</span>
                      <span>創立70周年を迎える</span>
                    </li>
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
                  <blockquote className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-2 -top-4 font-serif text-5xl leading-none text-accent/40"
                    >
                      "
                    </span>
                    <p className="pl-4 text-sm leading-loose text-foreground/70">
                      経営とは、答えのない問いに向き合い続ける営みです。和田町会は、立場や世代を超えた仲間とともに、その問いを磨き合う場でありたいと願っております。母校で培った知と縁を礎に、社会の持続的発展へと貢献してまいります。
                    </p>
                  </blockquote>
                  <div className="mt-2 border-t border-black/10 pt-4">
                    <p className="font-serif text-base text-foreground">山田 太郎</p>
                    <p className="mt-1 text-xs tracking-widest text-foreground/60">
                      第18代 会長 / 1985年経営学部卒
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
                {activities.map((item, index) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className={`group relative flex flex-col gap-6 border border-black/10 bg-surface/40 p-8 transition-all duration-300 hover:border-accent/50 hover:scale-105 cursor-pointer lg:p-10 ${focusRing}`}
                    >
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
                        className="mt-4 inline-block h-px w-12 bg-accent/60 transition-all group-hover:w-20"
                      />
                    </Link>
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
                {schedule.map((item) => (
                  <li key={item.title}>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group grid gap-3 py-8 md:grid-cols-[140px_1fr] md:items-start md:gap-8 ${focusRing}`}
                      >
                        <time className="text-sm tracking-widest text-foreground/60">
                          {item.date}
                        </time>
                        <div className="flex flex-col gap-1">
                          <p className="font-serif text-base leading-relaxed text-foreground underline-offset-4 decoration-accent/60 group-hover:underline sm:text-lg">
                            {item.title}
                          </p>
                          <p className="text-sm leading-loose text-foreground/60">
                            {item.note}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="grid gap-3 py-8 md:grid-cols-[140px_1fr] md:items-start md:gap-8">
                        <time className="text-sm tracking-widest text-foreground/60">
                          {item.date}
                        </time>
                        <div className="flex flex-col gap-1">
                          <p className="font-serif text-base leading-relaxed text-foreground sm:text-lg">
                            {item.title}
                          </p>
                          <p className="text-sm leading-loose text-foreground/60">
                            {item.note}
                          </p>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
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
                  <li key={member.name}>
                    <div className="flex flex-col border border-black/10 bg-surface/40">
                      <div className="flex flex-col gap-6 p-8 lg:p-10">
                        <div className="flex items-baseline justify-between" aria-hidden="true">
                          <span className="font-serif text-xs tracking-[0.3em] text-accent">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-xs tracking-[0.3em] text-foreground/60">
                            {member.year}
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
                          {member.sns && member.sns.length > 0 && (
                            <ul className="flex flex-wrap gap-2">
                              {member.sns.map((link) => (
                                <li key={link.label}>
                                  <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${member.name}の${link.label}（外部リンク）`}
                                    className={`inline-block border border-accent/40 px-3 py-1 text-xs tracking-widest text-accent/80 transition-colors hover:border-accent hover:text-accent ${focusRing}`}
                                  >
                                    {link.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
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
                入会を希望される方、活動にご関心をお持ちの方は、下記より入会案内をご請求ください。
              </p>
              <a
                href="#"
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
                  href="#"
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
                  href="#"
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
          <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
              {/* カラム1: コンテンツ */}
              <div>
                <p className="mb-4 border-b border-black/10 pb-3 text-xs tracking-[0.3em] text-accent">
                  CONTENTS
                </p>
                <ul className="space-y-3 text-sm tracking-wider text-foreground/60">
                  {[
                    { label: "和田町会について", href: "#about" },
                    { label: "活動内容", href: "#activities" },
                    { label: "会員紹介", href: "#members" },
                  ].map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className={`transition-colors hover:text-accent ${focusRing}`}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* カラム2: お知らせ・予定 */}
              <div>
                <p className="mb-4 border-b border-black/10 pb-3 text-xs tracking-[0.3em] text-accent">
                  NEWS &amp; SCHEDULE
                </p>
                <ul className="space-y-3 text-sm tracking-wider text-foreground/60">
                  {[
                    { label: "最新のお知らせ", href: "#news" },
                    { label: "今後の予定", href: "#schedule" },
                  ].map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className={`transition-colors hover:text-accent ${focusRing}`}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* カラム3: 入会・SNS */}
              <div>
                <p className="mb-4 border-b border-black/10 pb-3 text-xs tracking-[0.3em] text-accent">
                  JOIN &amp; SNS
                </p>
                <ul className="space-y-3 text-sm tracking-wider text-foreground/60">
                  {[
                    { label: "入会案内", href: "#join" },
                    { label: "公式SNS", href: "#sns" },
                  ].map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className={`transition-colors hover:text-accent ${focusRing}`}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ② 下部: 基本情報 */}
          <div className="border-t border-black/10">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-8 text-xs tracking-widest text-foreground/50 sm:flex-row sm:items-center sm:justify-between lg:px-12">
              <p className="font-serif text-sm tracking-[0.2em] text-foreground/70">
                横浜国立大学経営者会 <span className="text-accent">和田町会</span>
              </p>
              <p>© 2025 横浜国立大学経営者会 All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
