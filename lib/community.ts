// 社区留言 + 访问统计（localStorage 持久化，MVP 方案）

export type Comment = {
  id: string;
  author: string;
  text: string;
  createdAt: number;
  section: "kol" | "projects" | "general";
};

const C_KEY = "openmeme-comments";
const S_KEY = "openmeme-stats";

// ── 留言 ──────────────────────────────────────────────

export function getComments(section: Comment["section"] = "general"): Comment[] {
  if (typeof window === "undefined") return [];
  try {
    const all = JSON.parse(localStorage.getItem(C_KEY) ?? "[]") as Comment[];
    return all.filter((c) => c.section === section).sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

export function addComment(
  text: string,
  section: Comment["section"] = "general",
  author = "匿名撸毛人",
): Comment | null {
  if (typeof window === "undefined") return null;
  const trimmed = text.trim();
  if (!trimmed) return null;
  const comment: Comment = {
    id: `c_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    author: author.trim() || "匿名撸毛人",
    text: trimmed.slice(0, 300),
    createdAt: Date.now(),
    section,
  };
  const all = JSON.parse(localStorage.getItem(C_KEY) ?? "[]") as Comment[];
  all.push(comment);
  localStorage.setItem(C_KEY, JSON.stringify(all.slice(-200)));  // 最多保留 200 条
  return comment;
}

export function deleteComment(id: string) {
  if (typeof window === "undefined") return;
  const all = JSON.parse(localStorage.getItem(C_KEY) ?? "[]") as Comment[];
  localStorage.setItem(C_KEY, JSON.stringify(all.filter((c) => c.id !== id)));
}

export function commentCount(section: Comment["section"] = "general"): number {
  return getComments(section).length;
}

// ── 访问统计 ──────────────────────────────────────────

export type SiteStats = {
  /** 总访问次数（每次打开 +1） */
  totalVisits: number;
  /** 今日访问 */
  todayVisits: number;
  /** 今日日期 YYYY-MM-DD */
  today: string;
  /** 各板块浏览次数 */
  sections: Record<string, number>;
  /** 首次访问时间 */
  firstVisit: number;
  /** 关注转化（点了多少次关注按钮） */
  followClicks: number;
  /** 一键发推使用次数 */
  tweetShares: number;
  /** 投票总数 */
  votes: number;
};

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function defaultStats(): SiteStats {
  return {
    totalVisits: 0,
    todayVisits: 0,
    today: todayStr(),
    sections: {},
    firstVisit: Date.now(),
    followClicks: 0,
    tweetShares: 0,
    votes: 0,
  };
}

export function getStats(): SiteStats {
  if (typeof window === "undefined") return defaultStats();
  try {
    const raw = localStorage.getItem(S_KEY);
    if (!raw) return defaultStats();
    const s = JSON.parse(raw) as SiteStats;
    // 日期跨天重置
    const t = todayStr();
    if (s.today !== t) {
      s.today = t;
      s.todayVisits = 0;
      localStorage.setItem(S_KEY, JSON.stringify(s));
    }
    return s;
  } catch {
    return defaultStats();
  }
}

function saveStats(s: SiteStats) {
  localStorage.setItem(S_KEY, JSON.stringify(s));
}

/** 页面加载时调用一次 */
export function recordVisit(): SiteStats {
  if (typeof window === "undefined") return defaultStats();
  const s = getStats();
  s.totalVisits += 1;
  s.todayVisits += 1;
  saveStats(s);
  return s;
}

/** 板块曝光时调用 */
export function recordSectionView(section: string): SiteStats {
  if (typeof window === "undefined") return defaultStats();
  const s = getStats();
  s.sections[section] = (s.sections[section] ?? 0) + 1;
  saveStats(s);
  return s;
}

/** 关注按钮点击 */
export function recordFollow(): SiteStats {
  if (typeof window === "undefined") return defaultStats();
  const s = getStats();
  s.followClicks += 1;
  saveStats(s);
  return s;
}

/** 一键发推 */
export function recordTweet(): SiteStats {
  if (typeof window === "undefined") return defaultStats();
  const s = getStats();
  s.tweetShares += 1;
  saveStats(s);
  return s;
}

export function recordVote(): SiteStats {
  if (typeof window === "undefined") return defaultStats();
  const s = getStats();
  s.votes += 1;
  saveStats(s);
  return s;
}

/** 格式化大数 */
export function fmtNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

export function fmtRelative(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "刚刚";
  if (min < 60) return `${min} 分钟前`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} 小时前`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} 天前`;
  return new Date(ts).toLocaleDateString("zh-CN");
}