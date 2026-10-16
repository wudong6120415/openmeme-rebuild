export type EarlySignal = {
  name: string;
  symbol: string;
  chain: "Solana" | "BSC" | "Base" | "Ethereum" | "Robinhood Chain" | "Sui" | "TON" | "Monad";
  tagline: string;
  tags: string[];
  daysToTGE: number;
  twitter?: string;
  website?: string;
  marketCap?: string;
  stage?: "TGE 倒计时" | "刚启动" | "已上线" | "空投前";
  highlight?: string;
};

// 真实早期项目 · 来源 crypto.news / CoinGecko / DeFiLlama / Solflare (2026-10)
export const signals: EarlySignal[] = [
  {
    name: "Super Inu Force",
    symbol: "SIF",
    chain: "Robinhood Chain",
    tagline: "AI + 柴犬主题 · 10/4 启动后 24h 涨 389% · ATH $0.021 · 24h 交易量 $82.9M",
    tags: ["动物", "AI", "Robinhood"],
    daysToTGE: 0,
    stage: "已上线",
    marketCap: "$20.6M",
    highlight: "ATH 涨幅榜",
    twitter: "https://x.com/superinuforce",
  },
  {
    name: "Meme Agency",
    symbol: "MEMEAGENCY",
    chain: "Solana",
    tagline: "虚构的\"互联网 meme 情报局\" · Pump.fun 启动 24h 内 5390 持有者 · 14000+ 交易",
    tags: ["Meme", "Pump.fun", "社区"],
    daysToTGE: 0,
    stage: "已上线",
    marketCap: "$2M",
    twitter: "https://x.com/memeagency",
  },
  {
    name: "PunchCard",
    symbol: "PUNCH",
    chain: "Solana",
    tagline: "本地商户社区币 · 连接咖啡店/餐厅/服务业 · Solana 已上线 · 早期埋伏期",
    tags: ["实用", "社区", "Solana"],
    daysToTGE: 1,
    stage: "刚启动",
    marketCap: "$44K",
  },
  {
    name: "LAPTOP",
    symbol: "LAPTOP",
    chain: "Base",
    tagline: "Hunter Biden 政治 meme · Base 主网上线前先做空投 · 政治 + meme 双题材",
    tags: ["政治", "Base", "空投"],
    daysToTGE: 5,
    stage: "空投前",
    highlight: "即将空投",
    twitter: "https://x.com/laptopmeme",
  },
  {
    name: "Remittix",
    symbol: "RTX",
    chain: "Ethereum",
    tagline: "跨境支付 + 汇款协议 · 11/24 TGE 公开交易 · 完成多轮融资 · 实用型代币",
    tags: ["支付", "DeFi", "TGE"],
    daysToTGE: 7,
    stage: "TGE 倒计时",
    highlight: "本月 TGE",
  },
  {
    name: "Starknet",
    symbol: "STRK",
    chain: "Ethereum",
    tagline: "ZK Rollup L2 · 刚投票通过量子安全升级脱离 ETH · STRK 24h 涨 25% · 大资金关注",
    tags: ["L2", "ZK", "升级"],
    daysToTGE: 0,
    stage: "已上线",
    marketCap: "$2.4B",
    highlight: "老牌 L2",
    twitter: "https://x.com/StarknetEco",
  },
];
