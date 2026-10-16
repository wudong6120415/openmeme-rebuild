export type Tool = {
  name: string;
  url: string;
  emoji: string;
  tagline: string;
  category: "扫链" | "防骗" | "任务" | "钱包" | "推特";
  must?: boolean;        // 必装标记
  highlight?: string;    // 特色标签
};

// 撸毛人 Top 10 工具，按重要度排序
export const tools: Tool[] = [
  {
    name: "DexScreener",
    url: "https://dexscreener.com",
    emoji: "📡",
    tagline: "新 meme 币涨幅榜 · 全链 DEX 聚合 · 撸毛人第一屏",
    category: "扫链",
    must: true,
    highlight: "每日必看",
  },
  {
    name: "Bubblemaps",
    url: "https://bubblemaps.com",
    emoji: "🫧",
    tagline: "钱包分布图 · 识破老鼠仓和貔貅盘 · meme 时代刚需",
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
    name: "GMGN",
    url: "https://gmgn.ai",
    emoji: "🐸",
    tagline: "Solana/BSC meme 跟单神器 · 内置聪明钱监控",
    category: "扫链",
    must: true,
    highlight: "聪明钱追踪",
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
    name: "Layer3",
    url: "https://layer3.xyz",
    emoji: "✨",
    tagline: "跨链任务 · CUBEs 凭证 · 撸 L2 必备",
    category: "任务",
  },
  {
    name: "TokenSniffer",
    url: "https://tokensniffer.com",
    emoji: "🛡️",
    tagline: "代币合约自动扫描 · 一键识别貔貅盘和 honeypot",
    category: "防骗",
  },
  {
    name: "GoPlus Security",
    url: "https://goplus.com",
    emoji: "🔒",
    tagline: "Token 安全 API · 撸毛脚本风控常用",
    category: "防骗",
  },
  {
    name: "Kaito",
    url: "https://kaito.ai",
    emoji: "🧠",
    tagline: "CT KOL 智能搜索 · 看谁在喊什么币",
    category: "推特",
    highlight: "找 KOL",
  },
  {
    name: "De.Fi",
    url: "https://defi.fi",
    emoji: "💼",
    tagline: "DeFi 一站式 + 内置风险扫描 · 撸毛资产管理",
    category: "钱包",
  },
];
