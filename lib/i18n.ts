// Simple i18n dictionary — Chinese (default) + English
// All section components use this via t(lang, key)

export type Lang = "zh" | "en";

type Dict = {
  nav: Record<string, string>;
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    desc: string;
    ctaFollow: string;
    ctaScroll: string;
    stats: { value: string; label: string }[];
  };
  kol: {
    sectionTitle: string;
    sectionSubtitle: string;
    views: { featured: string; grid: string; table: string };
    sortHint: string;
    stats: { total: string; high: string; mid: string; low: string; risky: string };
    card: { score: string; high: string; mid: string; low: string; details: string; tweet: string };
    filter: { all: string; cat: string };
    modal: {
      close: string;
      intro: string;
      highlights: string;
      risk: string;
      data: string;
      score: string;
      followX: string;
      followHint: string;
      fields: { chain: string; token: string; listed: string; founded: string; funding: string; twitter: string };
      status: { live: string; upcoming: string; noToken: string; tbd: string };
    };
    legend: { high: string; mid: string; low: string; risky: string };
  };
  twitterIntent: string;  // for share buttons
  loading: string;
  banner: string;
  footer: { disclaimer: string };
};

export const dict: Record<Lang, Dict> = {
  zh: {
    nav: {
      home: "首页",
      about: "关于",
      kol: "𝕏 KOL",
    },
    hero: {
      badge: "每日更新 · 𝕏 KOL 实时信号",
      title: "撸毛信号",
      titleAccent: "比所有人早一步",
      desc: "币圈华语区 KOL 排行榜 + 新项目大白话分析 · 由 @ruoxi01 每日整理 · 一键发推分享",
      ctaFollow: "𝕏 关注 @ruoxi01",
      ctaScroll: "看今日榜单 ↓",
      stats: [
        { value: "24", label: "华语 KOL" },
        { value: "5", label: "评分维度" },
        { value: "中/EN", label: "双语支持" },
        { value: "1-click", label: "一键发推" },
      ],
    },
    kol: {
      sectionTitle: "𝕏 KOL 推荐项目",
      sectionSubtitle: "由 @ruoxi01 关注并筛选 · 评分 1-10 · 一键发推分享到你的推特",
      views: { featured: "⭐ 精选", grid: "▦ 网格", table: "☰ 列表" },
      sortHint: "排序: 评分 ↓",
      stats: { total: "个", high: "高分", mid: "中等", low: "观察", risky: "需谨慎" },
      card: { score: "评分", high: "高分", mid: "中等", low: "观察", details: "点击查看详情 →", tweet: "一键发推" },
      filter: { all: "全部", cat: "" },
      modal: {
        close: "关闭",
        intro: "项目简介",
        highlights: "关键亮点",
        risk: "风险提示",
        data: "项目数据",
        score: "参与度评分",
        followX: "𝕏 在推特上关注 @{handle} →",
        followHint: "关注 @ruoxi01 获取每日更新",
        fields: { chain: "所在链", token: "代币符号", listed: "上市平台", founded: "创立时间", funding: "融资情况", twitter: "Twitter 评分" },
        status: { live: "已发币", upcoming: "即将发币", noToken: "未发币", tbd: "发币待定" },
      },
      legend: { high: "高分 8-10", mid: "中等 6-7", low: "观察 1-5", risky: "⚠ 标 = 需谨慎" },
    },
    twitterIntent: "在浏览器中打开",
    loading: "加载中…",
    banner: "实时跟单 · 关注 𝕏 @ruoxi01 → 获取每日撸毛信号",
    footer: { disclaimer: "本平台仅供信息聚合与研究参考, 不构成任何投资建议。" },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      kol: "𝕏 KOL",
    },
    hero: {
      badge: "Updated daily · 𝕏 KOL signals",
      title: "Airdrop signals",
      titleAccent: "before everyone else",
      desc: "𝕏 KOL projects monitored by @ruoxi01 · AI-filtered + human-curated · 1-click share to your 𝕏",
      ctaFollow: "𝕏 Follow @ruoxi01",
      ctaScroll: "See today's picks ↓",
      stats: [
        { value: "15", label: "KOL projects" },
        { value: "3", label: "high score" },
        { value: "中/EN", label: "bilingual" },
        { value: "1-click", label: "share to 𝕏" },
      ],
    },
    kol: {
      sectionTitle: "𝕏 KOL recommended projects",
      sectionSubtitle: "Curated by @ruoxi01 · Score 1-10 · 1-click share to your 𝕏",
      views: { featured: "⭐ Featured", grid: "▦ Grid", table: "☰ List" },
      sortHint: "Sorted: score ↓",
      stats: { total: "total", high: "high", mid: "mid", low: "low", risky: "risky" },
      card: { score: "Score", high: "high", mid: "mid", low: "low", details: "Click for details →", tweet: "Tweet" },
      filter: { all: "All", cat: "" },
      modal: {
        close: "Close",
        intro: "About",
        highlights: "Highlights",
        risk: "Risk",
        data: "Project data",
        score: "Engagement score",
        followX: "𝕏 Follow @{handle} →",
        followHint: "Follow @ruoxi01 for daily updates",
        fields: { chain: "Chain", token: "Token", listed: "Listed on", founded: "Founded", funding: "Funding", twitter: "Twitter score" },
        status: { live: "Live", upcoming: "Upcoming", noToken: "No token", tbd: "TBD" },
      },
      legend: { high: "high 8-10", mid: "mid 6-7", low: "low 1-5", risky: "⚠ = risky" },
    },
    twitterIntent: "Open in browser",
    loading: "Loading…",
    banner: "Live signals · Follow 𝕏 @ruoxi01 → for daily airdrop picks",
    footer: { disclaimer: "Information only, not financial advice." },
  },
};

// Type for the t() function: returns same type as the path
// For our use case, we want `t("hero.stats")` to return the array type.
// We use a generic that preserves the type.

// Use loose typing for t to allow both strings and arrays
export type DictPath = string; // intentionally loose

export function t<K extends string>(
  lang: Lang,
  key: K,
  vars?: Record<string, string | number>,
): any {
  const parts = key.split(".");
  let cur: any = dict[lang];
  for (const p of parts) {
    if (cur == null) return key;
    cur = cur[p];
  }
  if (typeof cur === "string") {
    if (!vars) return cur;
    return cur.replace(/\{(\w+)\}/g, (_, k) =>
      vars[k] != null ? String(vars[k]) : `{${k}}`,
    );
  }
  return cur; // return arrays/objects as-is
}

export const STORAGE_KEY = "openmeme-lang";
