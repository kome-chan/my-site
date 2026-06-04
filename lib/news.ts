import Papa from "papaparse";

export type NewsItem = {
  date: string;
  category: string;
  title: string;
  link: string;
};

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSVlnmHmIM9vtFuF1tUvUgRHpnP3W0tM-nyY-QJP9DUMhz-zlSiH5clUf-1lHrUw82lVLRpcMjFmIOX/pub?gid=0&single=true&output=csv";

export async function getNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const csv = await res.text();
    const { data } = Papa.parse<NewsItem>(csv, {
      header: true,
      skipEmptyLines: true,
    });
    return data;
  } catch (err) {
    console.error("[getNews] fetch failed:", err);
    return [];
  }
}
