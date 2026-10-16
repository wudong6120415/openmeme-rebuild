export type EarlySignal = {
  name: string;
  symbol: string;
  chain: "Solana" | "BSC" | "Base" | "Ethereum" | "Sui" | "TON";
  tagline: string;
  tags: string[];
  daysToTGE: number;
  twitter?: string;
};

export const signals: EarlySignal[] = [
  {
    name: "PenguCoin",
    symbol: "pengu",
    chain: "Solana",
    tagline: "Pump.fun 起盘, 推特大V喊单后 24h 涨 800%。社区强, 但要注意早期风险。",
    tags: ["动物", "Pump", "社区"],
    daysToTGE: 3,
    twitter: "https://x.com/pengu",
  },
  {
    name: "CatWifHat 续作",
    symbol: "CWH2",
    chain: "Solana",
    tagline: "CWH 团队新作, 还没官宣 TGE 时间, 但早期筹码开始发散, 适合埋伏。",
    tags: ["Meme续作", "动物"],
    daysToTGE: 7,
    twitter: "https://x.com/cwh2",
  },
  {
    name: "BaseDog",
    symbol: "BDOG",
    chain: "Base",
    tagline: "Base 生态动物系, 已被 Coinbase Wallet 收录。TVL 48h 涨 12x。",
    tags: ["Base", "动物", "Coinbase"],
    daysToTGE: 5,
    twitter: "https://x.com/basedog",
  },
  {
    name: "TrumpFi",
    symbol: "TRFI",
    chain: "BSC",
    tagline: "政治 + DeFi 题材, 链上交易量刚突破 200 万美元。撸毛窗口期。",
    tags: ["政治", "DeFi"],
    daysToTGE: 10,
  },
  {
    name: "BinanceSquare Airdrop",
    symbol: "BSQ",
    chain: "BSC",
    tagline: "币安广场积分项目, 1 月 25 日快照。完成任务即可空投。",
    tags: ["币安", "快照"],
    daysToTGE: 14,
  },
  {
    name: "SuiLayer",
    symbol: "SLR",
    chain: "Sui",
    tagline: "Sui 生态 Layer2, 刚开测试网交互, 早期交互 = 早期空投。",
    tags: ["Sui", "测试网", "交互"],
    daysToTGE: 12,
    twitter: "https://x.com/suilayer",
  },
];
