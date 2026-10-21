// 币圈华语区 KOL 排行榜数据
// 说明：所有 handle 均为真实公开账号（33 个已通过 api.fxtwitter.com 验证存在）
// 评分为 @ruoxi01 基于公开信息的初始基线评估。
// 用户可通过投票动态调整排名（localStorage 本地存储）。

export type KOLDimension = "overall" | "influence" | "accuracy" | "activity" | "rising";

export type KOL = {
  handle: string;
  name: string;
  avatar: string;
  category: string;
  bio: string;
  scores: Record<KOLDimension, number>;
  followers: number | null;
  calls: number | null;
  hitRate: number | null;
  tweetsPerWeek: number | null;
  verified?: boolean;
  blue_verified?: boolean;
  joined?: string;
  tags: string[];
};

export const dimensionMeta: Record<
  KOLDimension,
  { zh: string; en: string; icon: string; desc: { zh: string; en: string } }
> = {
  overall:   { zh: "综合",   en: "Overall",   icon: "★", desc: { zh: "影响力 + 准确率 + 活跃度 综合加权", en: "Influence + accuracy + activity" } },
  influence: { zh: "影响力", en: "Influence", icon: "◎", desc: { zh: "粉丝量 + 互动率 + 传播广度",         en: "Followers + engagement + reach" } },
  accuracy:  { zh: "准确率", en: "Accuracy",  icon: "✓", desc: { zh: "喊单命中 / 风险提示准确度",           en: "Call hit rate / alert accuracy" } },
  activity:  { zh: "活跃度", en: "Activity",  icon: "⚡", desc: { zh: "发推频率 + 内容更新稳定性",           en: "Posting frequency + consistency" } },
  rising:    { zh: "新星榜", en: "Rising",    icon: "↗", desc: { zh: "近 30 天涨粉 / 声量增速最快",         en: "Fastest follower & mention growth (30d)" } },
};

export const kolCategories = [
  "中文资讯", "链上数据", "交易所官方", "撸毛", "Meme",
];

export const kols: KOL[] = [
  // ── 中文核心 / 一线 (全部已通过 fxtwitter 验证真实存在) ──
  {
    handle: "cz_binance", name: "CZ 🔶 BNB", avatar: "/kol-avatar/cz_binance.png",
    category: "交易所官方",
    bio: "Binance 创始人 · 加密行业最具影响力人物之一。",
    scores: { overall: 100, influence: 100, accuracy: 90, activity: 80, rising: 40 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 10,
    verified: true, blue_verified: true, joined: "2017",
    tags: ["Binance 创始人", "BNB", "传奇"],
  },
  {
    handle: "justinsuntron", name: "H.E. Justin Sun 👨‍🚀 🌞", avatar: "/kol-avatar/justinsuntron.png",
    category: "交易所官方",
    bio: "Tron 创始人 · 多家交易所实控人。",
    scores: { overall: 95, influence: 95, accuracy: 70, activity: 88, rising: 50 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 20,
    verified: true, blue_verified: true,
    tags: ["Tron", "多交易所", "话题人物"],
  },
  {
    handle: "VitalikButerin", name: "vitalik.eth", avatar: "/kol-avatar/VitalikButerin.png",
    category: "交易所官方",
    bio: "Ethereum 创始人 · 加密世界精神领袖。",
    scores: { overall: 98, influence: 98, accuracy: 95, activity: 75, rising: 30 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 8,
    verified: true, blue_verified: true,
    tags: ["Ethereum 创始人", "V 神"],
  },
  {
    handle: "WuBlockchain", name: "吴说区块链", avatar: "/kol-avatar/WuBlockchain.png",
    category: "中文资讯",
    bio: "中文加密圈最权威的资讯源之一，新闻覆盖广、深度报道强。",
    scores: { overall: 90, influence: 92, accuracy: 88, activity: 90, rising: 55 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 35,
    verified: true, joined: "2018",
    tags: ["中文资讯", "深度报道", "老牌媒体"],
  },
  {
    handle: "BlockBeats", name: "BlockBeats", avatar: "/kol-avatar/BlockBeats.png",
    category: "中文资讯",
    bio: "BlockBeats 中文站 · 中英双语新闻，链上项目深度报道。",
    scores: { overall: 88, influence: 90, accuracy: 87, activity: 92, rising: 60 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 40,
    verified: true,
    tags: ["中文资讯", "中英双语", "项目研究"],
  },
  {
    handle: "WatcherGuru", name: "Watcher.Guru", avatar: "/kol-avatar/WatcherGuru.png",
    category: "中文资讯",
    bio: "链上异动 + 鲸鱼监控 + 智能合约事件全网快讯。",
    scores: { overall: 85, influence: 88, accuracy: 86, activity: 95, rising: 45 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 60,
    verified: true, blue_verified: true,
    tags: ["链上异动", "鲸鱼监控", "快讯"],
  },
  {
    handle: "btcdayu", name: "大宇", avatar: "/kol-avatar/btcdayu.png",
    category: "中文资讯",
    bio: "BTC 大宇 · 中文本土活跃 KOL，行情 + 项目分析双线。",
    scores: { overall: 80, influence: 78, accuracy: 82, activity: 86, rising: 50 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 30,
    verified: true,
    tags: ["行情分析", "中文KOL"],
  },
  {
    handle: "hexiecs", name: "冷静冷静再冷静", avatar: "/kol-avatar/hexiecs.png",
    category: "中文资讯",
    bio: "Twitter Score 86.9/1000 · 冷静派，强调 DYOR 和风险控制。",
    scores: { overall: 78, influence: 80, accuracy: 92, activity: 75, rising: 38 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 22,
    verified: true,
    tags: ["冷静派", "高 Twitter 评分", "风险控制"],
  },
  {
    handle: "_FORAB", name: "AB Kuai.Dong", avatar: "/kol-avatar/_FORAB.png",
    category: "中文资讯",
    bio: "热愛研究與分享的科技產業觀察，Web3 项目与公司分析为主。",
    scores: { overall: 76, influence: 74, accuracy: 80, activity: 78, rising: 55 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 24,
    verified: true,
    tags: ["公司观察", "Web3 投资"],
  },
  {
    handle: "searchin", name: "searchin", avatar: "/kol-avatar/searchin.png",
    category: "中文资讯",
    bio: "中文加密快讯，专注项目进度和链上动态。",
    scores: { overall: 72, influence: 75, accuracy: 74, activity: 88, rising: 60 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 40,
    tags: ["中文快讯", "项目动态"],
  },

  // ── 链上数据 ──
  {
    handle: "lookonchain", name: "Lookonchain", avatar: "/kol-avatar/lookonchain.png",
    category: "链上数据",
    bio: "Top on-chain analytics · 鲸鱼动向 + 项目异动实时播报。",
    scores: { overall: 92, influence: 90, accuracy: 85, activity: 95, rising: 60 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 80,
    verified: true, blue_verified: true,
    tags: ["链上数据", "鲸鱼监控", "国际"],
  },
  {
    handle: "ArkhamIntel", name: "Arkham", avatar: "/kol-avatar/ArkhamIntel.png",
    category: "链上数据",
    bio: "链上情报平台官方 · 实体标签 + 地址分析 + 资金流图谱。",
    scores: { overall: 84, influence: 90, accuracy: 88, activity: 80, rising: 75 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 35,
    verified: true, blue_verified: true,
    tags: ["官方", "链上情报"],
  },
  {
    handle: "spotonchain", name: "Spot On Chain", avatar: "/kol-avatar/spotonchain.png",
    category: "链上数据",
    bio: "Spot On Chain · 鲸鱼追踪 + 项目透明数据面板。",
    scores: { overall: 82, influence: 85, accuracy: 86, activity: 80, rising: 55 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 30,
    verified: true,
    tags: ["鲸鱼追踪", "数据面板"],
  },
  {
    handle: "MessariCrypto", name: "Messari", avatar: "/kol-avatar/MessariCrypto.png",
    category: "链上数据",
    bio: "Messari · 加密研究领域的权威机构，深度报告 + State of Crypto。",
    scores: { overall: 86, influence: 88, accuracy: 95, activity: 70, rising: 35 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 18,
    verified: true, blue_verified: true,
    tags: ["机构研究", "State of Crypto"],
  },
  {
    handle: "0xScope", name: "Scope Protocol", avatar: "/kol-avatar/0xScope.png",
    category: "链上数据",
    bio: "Scope Protocol 官方 · 链上标签和数据可视化。",
    scores: { overall: 70, influence: 68, accuracy: 78, activity: 75, rising: 70 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 20,
    verified: true,
    tags: ["Scope Protocol", "数据可视化"],
  },
  {
    handle: "GlassnodeAlerts", name: "glassnode alerts", avatar: "/kol-avatar/GlassnodeAlerts.png",
    category: "链上数据",
    bio: "Glassnode 官方警报 · 链上指标阈值触发实时推送。",
    scores: { overall: 80, influence: 85, accuracy: 92, activity: 75, rising: 30 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 15,
    verified: true, blue_verified: true,
    tags: ["Glassnode", "指标告警"],
  },

  // ── 撸毛 / airdrop ──
  {
    handle: "BensonTWN", name: "Benson Sun", avatar: "/kol-avatar/BensonTWN.png",
    category: "撸毛",
    bio: "中文撸毛 OG · 任务拆解 + 教程类内容多。",
    scores: { overall: 75, influence: 72, accuracy: 76, activity: 86, rising: 65 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 30,
    verified: true,
    tags: ["撸毛 OG", "任务拆解", "教程"],
  },
  {
    handle: "DaanCrypto", name: "Daan Crypto Trades", avatar: "/kol-avatar/DaanCrypto.png",
    category: "撸毛",
    bio: "Daan Crypto · 加密教育与交易策略内容。",
    scores: { overall: 74, influence: 76, accuracy: 78, activity: 80, rising: 60 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 28,
    verified: true,
    tags: ["交易策略", "加密教育"],
  },
  {
    handle: "Kyla_0x", name: "kyla", avatar: "/kol-avatar/Kyla_0x.png",
    category: "撸毛",
    bio: "中文撸毛社区活跃成员，任务拆解和播报风格。",
    scores: { overall: 70, influence: 66, accuracy: 72, activity: 84, rising: 70 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 32,
    tags: ["撸毛", "任务拆解"],
  },
  {
    handle: "franklin_deng", name: "Delight", avatar: "/kol-avatar/franklin_deng.png",
    category: "撸毛",
    bio: "Web3 项目研究 · 中文社区活跃。",
    scores: { overall: 68, influence: 64, accuracy: 74, activity: 76, rising: 60 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 20,
    tags: ["项目研究"],
  },
  {
    handle: "Web3Lucia", name: "Lucia", avatar: "/kol-avatar/Web3Lucia.png",
    category: "撸毛",
    bio: "Web3 教育向内容，新人友好。",
    scores: { overall: 62, influence: 68, accuracy: 70, activity: 70, rising: 66 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 18,
    tags: ["教育", "新人友好"],
  },

  // ── Meme / 社区 ──
  {
    handle: "0xMaki", name: "0xMaki", avatar: "/kol-avatar/0xMaki.png",
    category: "Meme",
    bio: "Sui / Aptos / LayerZero 生态核心贡献者。",
    scores: { overall: 82, influence: 84, accuracy: 85, activity: 78, rising: 55 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 18,
    verified: true,
    tags: ["Sui", "Aptos", "LayerZero"],
  },
  {
    handle: "0xSun", name: "sun.sun", avatar: "/kol-avatar/0xSun.png",
    category: "Meme",
    bio: "华语区早期玩家 · 链上早期叙事，深度长文见长。",
    scores: { overall: 75, influence: 72, accuracy: 80, activity: 75, rising: 60 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 20,
    verified: true,
    tags: ["早期 OG", "长文"],
  },
  {
    handle: "beinz", name: "Vincent B.", avatar: "/kol-avatar/beinz.png",
    category: "Meme",
    bio: "撸毛 / 空投头部 KOL，新项目早期发现率高。",
    scores: { overall: 80, influence: 78, accuracy: 76, activity: 90, rising: 80 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 45,
    verified: true,
    tags: ["空投猎手", "高频"],
  },
  {
    handle: "chasewild", name: "木ﾉ花", avatar: "/kol-avatar/chasewild.png",
    category: "Meme",
    bio: "撸毛 OG，新项目早期埋伏，活跃度高。",
    scores: { overall: 76, influence: 70, accuracy: 72, activity: 92, rising: 70 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 50,
    tags: ["撸毛 OG", "埋伏"],
  },
  {
    handle: "0x_aladdin", name: "Aladdin", avatar: "/kol-avatar/0x_aladdin.png",
    category: "Meme",
    bio: "中文社区 Meme 早期发现 + 互动。",
    scores: { overall: 70, influence: 68, accuracy: 70, activity: 84, rising: 75 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 30,
    tags: ["Meme", "早期发现"],
  },
  {
    handle: "0xCat", name: ".", avatar: "/kol-avatar/0xCat.png",
    category: "Meme",
    bio: "Meme 板块活跃账号，传播持续。",
    scores: { overall: 65, influence: 60, accuracy: 58, activity: 80, rising: 70 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 28,
    tags: ["Meme", "传播"],
  },
  {
    handle: "0xMika", name: "0xMika", avatar: "/kol-avatar/0xMika.png",
    category: "Meme",
    bio: "Meme 板块快讯与互动。",
    scores: { overall: 60, influence: 58, accuracy: 60, activity: 75, rising: 65 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 22,
    tags: ["Meme", "快讯"],
  },
  {
    handle: "ArthurMa", name: "arthurma", avatar: "/kol-avatar/ArthurMa.png",
    category: "Meme",
    bio: "Web3 社区活跃用户，meme 与项目研究。",
    scores: { overall: 60, influence: 55, accuracy: 64, activity: 76, rising: 70 },
    followers: null, calls: null, hitRate: null, tweetsPerWeek: 22,
    tags: ["Meme", "研究"],
  },
];

// ── voting / sorting ────────────────────────────────────
const VOTE_KEY = "openmeme-kol-votes";

export function getVotes(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(VOTE_KEY) ?? "{}"); }
  catch { return {}; }
}

export function setVote(handle: string, delta: 1 | -1 | 0) {
  const votes = getVotes();
  const prev = votes[handle] ?? 0;
  const next = prev + delta;
  if (next > 0) votes[handle] = next; else delete votes[handle];
  localStorage.setItem(VOTE_KEY, JSON.stringify(votes));
}

export function getVote(handle: string): number {
  return getVotes()[handle] ?? 0;
}

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