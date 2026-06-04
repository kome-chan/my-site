import Papa from "papaparse";

export type ScheduleItem = {
  date: string;
  title: string;
  note: string;
  link: string;
};

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSVlnmHmIM9vtFuF1tUvUgRHpnP3W0tM-nyY-QJP9DUMhz-zlSiH5clUf-1lHrUw82lVLRpcMjFmIOX/pub?gid=913372338&single=true&output=csv";

export async function getSchedule(): Promise<ScheduleItem[]> {
  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const csv = await res.text();
    const { data } = Papa.parse<ScheduleItem>(csv, {
      header: true,
      skipEmptyLines: true,
    });
    return data.sort((a, b) => a.date.localeCompare(b.date));
  } catch (err) {
    console.error("[getSchedule] fetch failed:", err);
    return [];
  }
}
