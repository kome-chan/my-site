import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const SETTINGS_DIR = path.join(process.cwd(), "content/settings");

function loadYml<T>(filename: string, defaults: T): T {
  const filePath = path.join(SETTINGS_DIR, filename);
  if (!fs.existsSync(filePath)) return defaults;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return { ...defaults, ...(yaml.load(raw) as Partial<T>) };
  } catch {
    return defaults;
  }
}

export type HomeSettings = {
  catchphrase: string;
  since: string;
};

export type AboutSettings = {
  description: string;
  memberCount: string;
  location: string;
  establishedYear: string;
};

export type JoinSettings = {
  description: string;
  formUrl: string;
};

export type SnsSettings = {
  facebook: string;
  twitter: string;
};

export type FooterSettings = {
  copyright: string;
};

export async function getHomeSettings(): Promise<HomeSettings> {
  return loadYml<HomeSettings>("home.yml", {
    catchphrase: "知を磨き、次代の経営を拓く。",
    since: "SINCE 1952",
  });
}

export async function getAboutSettings(): Promise<AboutSettings> {
  return loadYml<AboutSettings>("about.yml", {
    description:
      "和田町会は、横浜国立大学の卒業生を中心に、企業経営者・実務家・研究者をもって構成される任意団体です。",
    memberCount: "約100名",
    location: "横浜市保土ケ谷区",
    establishedYear: "1952年",
  });
}

export async function getJoinSettings(): Promise<JoinSettings> {
  return loadYml<JoinSettings>("join.yml", {
    description:
      "入会を希望される方、活動にご関心をお持ちの方は、下記より入会案内をご請求ください。",
    formUrl: "#",
  });
}

export async function getSnsSettings(): Promise<SnsSettings> {
  return loadYml<SnsSettings>("sns.yml", {
    facebook: "#",
    twitter: "#",
  });
}

export async function getFooterSettings(): Promise<FooterSettings> {
  return loadYml<FooterSettings>("footer.yml", {
    copyright: "© 和田町会 横浜国立大学経営者会",
  });
}
