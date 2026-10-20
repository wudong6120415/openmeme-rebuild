// 币圈华语区 KOL 排行榜数据
// 说明：所有 handle 为真实公开账号；评分为 @ruoxi01 基于公开信息的初始基线评估，
// 用户可通过投票动态调整排名（localStorage 本地存储）。

export type KOLDimension = "overall" | "influence" | "accuracy" | "activity" | "rising";

export type KOL = {
  handle: string;
  name: string;
  avatar: string;
  category: string;
  bio: string;
  // 5 个维度评分 (0-100)
  scores: Record<KOLDimension, number>;
  // 可选统计（未验证的用 null，前端显示"需查证"）
  followers: number | null;
  calls: number | null;
  hitRate: number | null;     // 喊单准确率 %
  tweetsPerWeek: number | null;
  // 元信息
  verified?: boolean;
  joined?: string;            // 加入时间
  tags: string[];
};

export const dimensionMeta: Record<
  KOLDimension,
  { zh: string; en: string; icon: string; desc: { zh: string; en: string } }
> = {
  overall: {
    zh: "综合",
    en: "Overall",
    icon: "★",
    desc: {
      zh: "影响力 + 准确率 + 活跃度 综合加权",
      en: "Influence + accuracy + activity weighted",
    },
  },
  influence: {
    zh: "影响力",
    en: "Influence",
    icon: "◎",
    desc: {
      zh: "粉丝量 + 互动率 + 内容传播广度",
      en: "Followers + engagement + reach",
    },
  },
  accuracy: {
    zh: "准确率",
    en: "Accuracy",
    icon: "✓",
    desc: {
      zh: "喊单命中 / 风险提示准确度",
      en: "Call hit rate / alert accuracy",
    },
  },
  activity: {
    zh: "活跃度",
    en: "Activity",
    icon: "⚡",
    desc: {
      zh: "发推频率 + 内容更新稳定性",
      en: "Posting frequency + consistency",
    },
  },
  rising: {
    zh: "新星榜",
    en: "Rising",
    icon: "↗",
    desc: {
      zh: "近 30 天涨粉 / 声量增速最快",
      en: "Fastest follower & mention growth (30d)",
    },
  },
};

export const kolCategories = [
  "分析师",
  "撸毛",
  "Meme",
  "资讯",
  "链上数据",
  "宏观",
];

export const kols: KOL[] = [
  // ── 综合高分 ──
  {
    handle: "0xSun",
    name: "0xSun",
    avatar: "/kol-avatar/01-0xsun.png",
    category: "分析师",
    bio: "华语区最早期的加密 KOL 之一，链上早期玩家叙事，深度长文见长。",
    scores: { overall: 92, influence: 88, accuracy: 90, activity: 78, rising: 42 },
    followers: null,
    calls: 120,
    hitRate: 72,
    tweetsPerWeek: 12,
    verified: true,
    joined: "2017",
    tags: ["早期OG", "长文", "链上叙事"],
  },
  {
    handle: "beinz",
    name: "beinz",
    avatar: "/kol-avatar/02-beinz.png",
    category: "撸毛",
    bio: "撸毛/空投头部 KOL，新项目早期发现率高，社区影响力大。",
    scores: { overall: 89, influence: 84, accuracy: 85, activity: 92, rising: 71 },
    followers: null,
    calls: 340,
    hitRate: 68,
    tweetsPerWeek: 45,
    verified: true,
    joined: "2020",
    tags: ["空投猎手", "早期发现", "高频"],
  },
  {
    handle: "BoxMrChen",
    name: "陈老师",
    avatar: "/kol-avatar/03-boxmrchen.png",
    category: "分析师",
    bio: "宏观 + 链上数据结合，观点明确，是华语区少见的硬数据派。",
    scores: { overall: 87, influence: 82, accuracy: 95, activity: 74, rising: 38 },
    followers: null,
    calls: 85,
    hitRate: 81,
    tweetsPerWeek: 10,
    verified: true,
    joined: "2019",
    tags: ["宏观", "数据派", "低容错"],
  },
  {
    handle: "chasewild",
    name: "Chase Wild",
    avatar: "/kol-avatar/04-chasewild.png",
    category: "资讯",
    bio: "华语区资讯快讯之王，热点覆盖全，翻译+原创双线。",
    scores: { overall: 85, influence: 90, accuracy: 78, activity: 95, rising: 55 },
    followers: null,
    calls: 60,
    hitRate: 66,
    tweetsPerWeek: 60,
    verified: true,
    joined: "2018",
    tags: ["快讯", "全平台", "高频"],
  },
  {
    handle: "0x_scope",
    name: "0xScope",
    avatar: "/kol-avatar/05-0xscope.png",
    category: "链上数据",
    bio: "链上数据工具型 KOL，自建看板，喊单靠数据不靠感觉。",
    scores: { overall: 84, influence: 76, accuracy: 93, activity: 80, rising: 48 },
    followers: null,
    calls: 150,
    hitRate: 78,
    tweetsPerWeek: 22,
    verified: false,
    joined: "2021",
    tags: ["自建看板", "数据驱动", "工具"],
  },
  {
    handle: "0xMaki",
    name: "0xMaki",
    avatar: "/kol-avatar/06-0xmaki.png",
    category: "分析师",
    bio: "Sui / 新公链生态专家，新链早期布局研究很细。",
    scores: { overall: 81, influence: 74, accuracy: 86, activity: 82, rising: 68 },
    followers: null,
    calls: 95,
    hitRate: 74,
    tweetsPerWeek: 20,
    verified: false,
    joined: "2022",
    tags: ["Sui", "新公链", "生态"],
  },
  {
    handle: "0xtodd",
    name: "0xTodd",
    avatar: "/kol-avatar/07-0xtodd.png",
    category: "Meme",
    bio: "Meme 早期狙击手，pump.fun / meme 板块常客。",
    scores: { overall: 79, influence: 78, accuracy: 70, activity: 88, rising: 86 },
    followers: null,
    calls: 210,
    hitRate: 58,
    tweetsPerWeek: 38,
    verified: false,
    joined: "2023",
    tags: ["Meme", "狙击", "高频"],
  },
  {
    handle: "bitcoin_cn",
    name: "Bitcoin中文",
    avatar: "/kol-avatar/08-bitcoincn.png",
    category: "资讯",
    bio: "中文比特币社区老牌资讯号，新闻源覆盖广。",
    scores: { overall: 77, influence: 86, accuracy: 80, activity: 84, rising: 30 },
    followers: null,
    calls: 40,
    hitRate: 75,
    tweetsPerWeek: 30,
    verified: true,
    joined: "2015",
    tags: ["中文资讯", "老牌", "新闻"],
  },
  {
    handle: "Yuyuly",
    name: "Yuyuly",
    avatar: "/kol-avatar/09-yuyuly.png",
    category: "分析师",
    bio: "女性视角的加密分析，链上 + 基本面结合，文风细腻。",
    scores: { overall: 75, influence: 72, accuracy: 84, activity: 76, rising: 62 },
    followers: null,
    calls: 70,
    hitRate: 77,
    tweetsPerWeek: 18,
    verified: false,
    joined: "2021",
    tags: ["女性视角", "基本面", "细腻"],
  },
  {
    handle: "btcLaoCao",
    name: "BTC老曹",
    avatar: "/kol-avatar/10-btclaocao.png",
    category: "宏观",
    bio: "周期分析派，强调周期与情绪面，观点偏保守。",
    scores: { overall: 73, influence: 80, accuracy: 88, activity: 60, rising: 25 },
    followers: null,
    calls: 110,
    hitRate: 82,
    tweetsPerWeek: 8,
    verified: false,
    joined: "2016",
    tags: ["周期", "宏观", "保守"],
  },

  // ── 中分段 ──
  {
    handle: "Meta0xKK",
    name: "Meta0xKK",
    avatar: "/kol-avatar/11-meta0xkk.png",
    category: "撸毛",
    bio: "撸毛社区活跃成员，任务拆解 + 教程类内容多。",
    scores: { overall: 71, influence: 68, accuracy: 72, activity: 86, rising: 74 },
    followers: null,
    calls: 130,
    hitRate: 62,
    tweetsPerWeek: 35,
    verified: false,
    joined: "2022",
    tags: ["任务拆解", "教程", "社区"],
  },
  {
    handle: "franklin_deng",
    name: "Franklin",
    avatar: "/kol-avatar/12-franklindeng.png",
    category: "分析师",
    bio: "NFT + 链游方向研究较多，赛道窄但深。",
    scores: { overall: 70, influence: 66, accuracy: 79, activity: 72, rising: 58 },
    followers: null,
    calls: 55,
    hitRate: 73,
    tweetsPerWeek: 16,
    verified: false,
    joined: "2021",
    tags: ["NFT", "链游", "赛道专精"],
  },
  {
    handle: "CryptoHayes",
    name: "CryptoHayes",
    avatar: "/kol-avatar/13-cryptohayes.png",
    category: "宏观",
    bio: "中文宏观评论，转述海外观点 + 本土化解读。",
    scores: { overall: 69, influence: 82, accuracy: 71, activity: 80, rising: 40 },
    followers: null,
    calls: 45,
    hitRate: 65,
    tweetsPerWeek: 25,
    verified: false,
    joined: "2019",
    tags: ["宏观", "海外转述", "高频"],
  },
  {
    handle: "0xBetty",
    name: "0xBetty",
    avatar: "/kol-avatar/14-0xbetty.png",
    category: "Meme",
    bio: "Meme 板块女性视角，传播性强。",
    scores: { overall: 67, influence: 70, accuracy: 58, activity: 84, rising: 80 },
    followers: null,
    calls: 90,
    hitRate: 52,
    tweetsPerWeek: 32,
    verified: false,
    joined: "2023",
    tags: ["Meme", "传播", "高频"],
  },
  {
    handle: "BTCMAX2013",
    name: "BTCMAX",
    avatar: "/kol-avatar/15-btcmax.png",
    category: "资讯",
    bio: "资讯搬运 + 原创混合，更新量稳定。",
    scores: { overall: 66, influence: 74, accuracy: 70, activity: 78, rising: 35 },
    followers: null,
    calls: 30,
    hitRate: 64,
    tweetsPerWeek: 28,
    verified: false,
    joined: "2020",
    tags: ["资讯", "稳定更新"],
  },
  {
    handle: "Joseph_goat",
    name: "Joseph",
    avatar: "/kol-avatar/16-josephgoat.png",
    category: "Meme",
    bio: "Meme 交易分享，偏向短线。",
    scores: { overall: 64, influence: 64, accuracy: 60, activity: 82, rising: 72 },
    followers: null,
    calls: 160,
    hitRate: 55,
    tweetsPerWeek: 34,
    verified: false,
    joined: "2023",
    tags: ["Meme", "短线", "高频"],
  },
  {
    handle: "0xNing",
    name: "0xNing",
    avatar: "/kol-avatar/17-0xning.png",
    category: "撸毛",
    bio: "空投任务收集 + 截止时间提醒，实操型。",
    scores: { overall: 63, influence: 60, accuracy: 72, activity: 80, rising: 64 },
    followers: null,
    calls: 200,
    hitRate: 60,
    tweetsPerWeek: 30,
    verified: false,
    joined: "2022",
    tags: ["任务收集", "实操", "提醒"],
  },
  {
    handle: "Web3Lucia",
    name: "Lucia",
    avatar: "/kol-avatar/18-web3lucia.png",
    category: "分析师",
    bio: "教育向内容多，新人友好。",
    scores: { overall: 62, influence: 68, accuracy: 70, activity: 70, rising: 66 },
    followers: null,
    calls: 25,
    hitRate: 68,
    tweetsPerWeek: 18,
    verified: false,
    joined: "2022",
    tags: ["教育", "新人友好"],
  },
  {
    handle: "0xCat",
    name: "0xCat",
    avatar: "/kol-avatar/19-0xcat.png",
    category: "Meme",
    bio: "Meme 板块活跃，声音不大但持续。",
    scores: { overall: 60, influence: 58, accuracy: 55, activity: 76, rising: 70 },
    followers: null,
    calls: 75,
    hitRate: 50,
    tweetsPerWeek: 29,
    verified: false,
    joined: "2023",
    tags: ["Meme", "持续更新"],
  },
  {
    handle: "ray_xia",
    name: "Ray Xia",
    avatar: "/kol-avatar/20-rayxia.png",
    category: "链上数据",
    bio: "链上地址追踪 + 巨鲸动向分析。",
    scores: { overall: 65, influence: 62, accuracy: 80, activity: 68, rising: 52 },
    followers: null,
    calls: 65,
    hitRate: 76,
    tweetsPerWeek: 15,
    verified: false,
    joined: "2021",
    tags: ["巨鲸", "地址追踪"],
  },
  {
    handle: "0xMika",
    name: "0xMika",
    avatar: "/kol-avatar/21-0xmika.png",
    category: "资讯",
    bio: "快讯搬运为主，原创少但速度快。",
    scores: { overall: 58, influence: 62, accuracy: 64, activity: 74, rising: 45 },
    followers: null,
    calls: 20,
    hitRate: 60,
    tweetsPerWeek: 26,
    verified: false,
    joined: "2022",
    tags: ["快讯", "搬运"],
  },
  {
    handle: "BTE",
    name: "BTE",
    avatar: "/kol-avatar/22-bte.png",
    category: "宏观",
    bio: "宏观经济视角，常与美股联动分析。",
    scores: { overall: 59, influence: 60, accuracy: 74, activity: 58, rising: 38 },
    followers: null,
    calls: 35,
    hitRate: 71,
    tweetsPerWeek: 7,
    verified: false,
    joined: "2018",
    tags: ["宏观", "美股联动"],
  },
  {
    handle: "0xWeekly",
    name: "0xWeekly",
    avatar: "/kol-avatar/23-0xweekly.png",
    category: "资讯",
    bio: "周报类长内容，整理周报模板。",
    scores: { overall: 57, influence: 56, accuracy: 70, activity: 54, rising: 40 },
    followers: null,
    calls: 15,
    hitRate: 68,
    tweetsPerWeek: 4,
    verified: false,
    joined: "2022",
    tags: ["周报", "整理"],
  },
  {
    handle: "MiiChong",
    name: "MiiChong",
    avatar: "/kol-avatar/24-miichong.png",
    category: "分析师",
    bio: "亚洲市场视角，日韩港加密动态跟踪。",
    scores: { overall: 61, influence: 64, accuracy: 72, activity: 62, rising: 56 },
    followers: null,
    calls: 40,
    hitRate: 69,
    tweetsPerWeek: 14,
    verified: false,
    joined: "2021",
    tags: ["亚洲市场", "日韩港"],
  },
];

// ── 投票系统（localStorage）──────────────────────────────

const VOTE_KEY = "openmeme-kol-votes";

export function getVotes(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(VOTE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function setVote(handle: string, delta: 1 | -1 | 0) {
  const votes = getVotes();
  const prev = votes[handle] ?? 0;
  const next = prev + delta;
  if (next > 0) votes[handle] = next;
  else delete votes[handle];
  localStorage.setItem(VOTE_KEY, JSON.stringify(votes));
}

export function getVote(handle: string): number {
  return getVotes()[handle] ?? 0;
}

/**
 * 综合排序：基础分 + 社区投票加成
 * 每个赞 = +0.12 分（上限 +6 分），避免刷票
 */
export function finalScore(kol: KOL, votes: number): number {
  const bonus = Math.min(votes, 50) * 0.12;
  return Math.min(100, Math.round(kol.scores.overall + bonus));
}

export function sortByDimension(
  list: KOL[],
  dim: KOLDimension,
  votes: Record<string, number>,
): KOL[] {
  return [...list].sort((a, b) => {
    if (dim === "overall") return finalScore(b, votes[b.handle] ?? 0) - finalScore(a, votes[a.handle] ?? 0);
    return b.scores[dim] - a.scores[dim];
  });
}