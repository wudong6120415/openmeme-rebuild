export type Tool = {
  name: string;
  url: string;
  emoji: string;
  tagline: string;
  category: "扫链" | "防骗" | "任务" | "钱包" | "数据";
  must?: boolean;
  highlight?: string;
};

// 撸毛人 Top 10 工具，按日常使用频度排序
export const tools: Tool[] = [
  {
    name: "DexScreener",
    url: "https://dexscreener.com",
    emoji: "📡",
    tagline: "新 meme 涨幅榜第一屏 · 全链 DEX 聚合 · 撸毛人每天必开",
    category: "扫链",
    must: true,
    highlight: "每日必看",
  },
  {
    name: "GMGN",
    url: "https://gmgn.ai",
    emoji: "🐸",
    tagline: "Solana/BSC meme 跟单神器 · 聪明钱监控 · 抢新币",
    category: "扫链",
    must: true,
    highlight: "聪明钱追踪",
  },
  {
    name: "Bubblemaps",
    url: "https://bubblemaps.com",
    emoji: "🫧",
    tagline: "钱包分布图 · 一眼看穿老鼠仓和貔貅盘 · meme 时代刚需",
    category: "防骗",
    must: true,
    highlight: "防割神器",
  },
  {
    name: "DeBank",
    url: "https://debank.com",
    emoji: "👛",
    tagline: "多链 Portfolio 追踪 · 撸毛人首选 · 私钥不上传",
    category: "钱包",
    must: true,
    highlight: "撸毛标配",
  },
  {
    name: "Galxe",
    url: "https://galxe.com",
    emoji: "🎯",
    tagline: "最大空投任务平台 · 15M+ 用户 · 撸毛主战场",
    category: "任务",
    must: true,
  },
  {
    name: "Zealy",
    url: "https://zealy.io",
    emoji: "✨",
    tagline: "社区任务平台 · XP 排行榜 · 撸毛人日常签到",
    category: "任务",
  },
  {
    name: "TokenSniffer",
    url: "https://tokensniffer.com",
    emoji: "🛡️",
    tagline: "代币合约自动扫描 · 买入前查 · 识破 honeypot",
    category: "防骗",
  },
  {
    name: "TokenUnlocks",
    url: "https://token.unlocks.app",
    emoji: "🔓",
    tagline: "代币解锁日历 · 看懂砸盘时间点 · 找最佳入场",
    category: "数据",
    highlight: "避坑必备",
  },
  {
    name: "DefiLlama",
    url: "https://defillama.com",
    emoji: "🦙",
    tagline: "DeFi TVL + 收益排行 · 撸协议收益必看 · 行业最权威",
    category: "数据",
  },
  {
    name: "CoinGecko",
    url: "https://coingecko.com",
    emoji: "🦎",
    tagline: "全球币价 + 链上数据 · 撸毛人查价标配 · API 免费",
    category: "数据",
  },
];
