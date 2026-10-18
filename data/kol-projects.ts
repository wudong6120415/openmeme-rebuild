export type TokenStatus = "live" | "upcoming" | "noToken" | "tbd";

export type KOLProject = {
  handle: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  score: number;
  twitter: string;
  logo: string;
  highlights?: string[];
  risk?: string;
  chain?: string;
  token?: string;
  listedOn?: string;
  founded?: string;
  funding?: string;
  // 新字段
  tokenStatus: TokenStatus;       // 代币状态
  launchDate?: string;            // 发币日期 / 预期
  tweetText: string;              // 一键发推内容（中文 / 自动翻译英文）
  tweetTextEn: string;            // 英文版推文
};

// 15 个 Twitter 账号 · 2026-10 评估
export const kolProjects: KOLProject[] = [
  {
    handle: "paboxoxyz",
    name: "Pabox",
    category: "预测市场",
    tagline: "Twitter 早期玩家关注的预测市场项目",
    description: "Pabox 是 Twitter 早期玩家关注的预测市场项目,公开信息有限,处于探索阶段。",
    score: 3,
    twitter: "https://x.com/paboxoxyz",
    logo: "/kol/01-paboxoxyz.png",
    tokenStatus: "noToken",
    founded: "近期",
    funding: "需查证",
    tweetText:
      "🆕 撸到一个 Twitter 早期玩家在做的预测市场项目 @paboxoxyz\n\n大白话: 还很早期,信息少,适合观察,等他们发币再看。\n\n完整分析 → openmeme.art/#kol\n@ruoxi01 整理",
    tweetTextEn:
      "🆕 Spotted an early prediction market project by Twitter OGs @paboxoxyz\n\nTL;DR: Very early, sparse info, worth watching until they launch a token.\n\nFull analysis → openmeme.art/#kol\nCurated by @ruoxi01",
  },
  {
    handle: "eloscapeHQ",
    name: "Eloscape",
    category: "Web3 生态",
    tagline: "新兴 web3 生态项目",
    description: "Eloscape 是一个新兴的 web3 生态项目,具体定位和产品形态尚未完全公开。",
    score: 3,
    twitter: "https://x.com/eloscapeHQ",
    logo: "/kol/02-eloscapeHQ.png",
    tokenStatus: "noToken",
    founded: "近期",
    funding: "需查证",
    tweetText:
      "🆕 @eloscapeHQ 是个新 web3 生态项目\n\n大白话: 还在讲故事阶段,产品形态不清晰。\n\n完整分析 → openmeme.art/#kol\n@ruoxi01 整理",
    tweetTextEn:
      "🆕 @eloscapeHQ is a new web3 ecosystem project\n\nTL;DR: Story stage, product not yet clear.\n\nFull analysis → openmeme.art/#kol\nCurated by @ruoxi01",
  },
  {
    handle: "forevercultfund",
    name: "Forever Cult Fund",
    category: "Meme 基金",
    tagline: "Meme 文化基金 · 小众圈层运营",
    description: "Meme 文化导向的社区基金,小众圈层运营,适合 meme 赛道关注者参与。",
    score: 4,
    twitter: "https://x.com/forevercultfund",
    logo: "/kol/03-forevercultfund.png",
    tokenStatus: "noToken",
    highlights: ["Meme 赛道"],
    funding: "需查证",
    tweetText:
      "🆕 @forevercultfund — Meme 文化基金\n\n大白话: 小众但专注 meme 赛道的社区基金,跟着文化人混总没错。\n\n完整分析 → openmeme.art/#kol\n@ruoxi01 整理",
    tweetTextEn:
      "🆕 @forevercultfund — Meme culture fund\n\nTL;DR: Niche but dedicated meme fund, follow the culture kids.\n\nFull analysis → openmeme.art/#kol\nCurated by @ruoxi01",
  },
  {
    handle: "LPPoolParty",
    name: "LP Pool Party",
    category: "LP / DeFi",
    tagline: "Robinhood Chain 上的 LP 协议 · LPPP 代币已发",
    description: "Robinhood Chain 上的 LP 协议,已发行 LPPP 代币,提供流动性激励和 farming 机会。",
    score: 6,
    twitter: "https://x.com/LPPoolParty",
    logo: "/kol/04-LPPoolParty.png",
    tokenStatus: "live",
    launchDate: "2025-11",
    highlights: ["已上线代币", "Robinhood Chain"],
    chain: "Robinhood Chain",
    token: "LPPP",
    listedOn: "Etherscan",
    tweetText:
      "🆕 @LPPoolParty — Robinhood Chain 上的 LP 协议\n\n大白话: LPPP 已发币,新链项目适合撸早期 LP 收益。\n💡 Robinhood Chain 是撸毛新热土,值得埋伏。\n\n完整分析 → openmeme.art/#kol\n@ruoxi01 整理",
    tweetTextEn:
      "🆕 @LPPoolParty — LP protocol on Robinhood Chain\n\nTL;DR: LPPP live, new chain = early LP yield opportunities.\n💡 Robinhood Chain is the new alpha, worth positioning.\n\nFull analysis → openmeme.art/#kol\nCurated by @ruoxi01",
  },
  {
    handle: "metricxyz",
    name: "Metric",
    category: "DEX",
    tagline: "去中心化交易所 · 支持多链",
    description: "去中心化交易所 (DEX),已正式上线,支持 Robinhood Chain 等多链网络,与 Chainlink 建立合作。",
    score: 8,
    twitter: "https://x.com/metricxyz",
    logo: "/kol/05-metricxyz.png",
    tokenStatus: "upcoming",
    launchDate: "2026-Q4 (预计)",
    highlights: ["DEX 已上线", "多链支持", "Chainlink 合作"],
    chain: "多链 (含 Robinhood Chain)",
    tweetText:
      "🆕 @metricxyz — 已上线的去中心化交易所\n\n大白话: DEX 已跑通 + 跟 Chainlink 合作,基础设施扎实。\n💡 Robinhood Chain 重点布局,新链 DEX 有早期红利。\n\n完整分析 → openmeme.art/#kol\n@ruoxi01 整理",
    tweetTextEn:
      "🆕 @metricxyz — live DEX\n\nTL;DR: DEX operational + Chainlink partnership, solid infrastructure.\n💡 Robinhood Chain focus = early红利 on new chain.\n\nFull analysis → openmeme.art/#kol\nCurated by @ruoxi01",
  },
  {
    handle: "FissionXYZ",
    name: "Fission",
    category: "DeFi / RWA",
    tagline: "代币化私募股权 · RWA 新方向",
    description: "DeFi 平台,致力于通过代币化技术重塑私募股权投资,属于 RWA (真实世界资产) 赛道的新方向。",
    score: 7,
    twitter: "https://x.com/FissionXYZ",
    logo: "/kol/06-FissionXYZ.png",
    tokenStatus: "tbd",
    highlights: ["RWA 赛道", "私募股权代币化"],
    chain: "需查证",
    tweetText:
      "🆕 @FissionXYZ — RWA 赛道新方向\n\n大白话: 把私募股权代币化,讲的是传统金融 + 链上化的故事。\n💡 RWA 一直是大户在玩的赛道,跟着布局正当时。\n\n完整分析 → openmeme.art/#kol\n@ruoxi01 整理",
    tweetTextEn:
      "🆕 @FissionXYZ — RWA new direction\n\nTL;DR: Tokenized PE, TradFi × on-chain story.\n💡 RWA is where big money plays, time to position.\n\nFull analysis → openmeme.art/#kol\nCurated by @ruoxi01",
  },
  {
    handle: "TitanExchange_",
    name: "Titan Exchange",
    category: "DEX / 永续",
    tagline: "Jupiter 赞助的 Solana DEX",
    description: "去中心化交易所,由 Jupiter 和 StonkFun 赞助,提供 swap 和交易服务。TITAN 代币已上线。",
    score: 7,
    twitter: "https://x.com/TitanExchange_",
    logo: "/kol/07-TitanExchange_.png",
    tokenStatus: "live",
    launchDate: "2025",
    highlights: ["Jupiter 赞助", "StonkFun 赞助"],
    chain: "Solana",
    token: "TITAN",
    tweetText:
      "🆕 @TitanExchange_ — Jupiter 赞助的 Solana DEX\n\n大白话: Jupiter 是 Solana 上的顶级 DEX,Titan 拿到它的赞助 = 实力背书。\n💡 $TITAN 已发,可以小仓埋伏等 Solana meme 周期。\n\n完整分析 → openmeme.art/#kol\n@ruoxi01 整理",
    tweetTextEn:
      "🆕 @TitanExchange_ — Solana DEX backed by Jupiter\n\nTL;DR: Jupiter is Solana's top DEX, Titan has its backing = strong signal.\n💡 $TITAN live, small position for Solana meme cycle.\n\nFull analysis → openmeme.art/#kol\nCurated by @ruoxi01",
  },
  {
    handle: "instinct_xyz",
    name: "Instinct",
    category: "AI / 估值",
    tagline: "AI 项目 · $1B 融资 · $10B 估值",
    description: "AI 领域的明星项目,据报道完成 10 亿美元融资,估值达 100 亿美元。是当前 AI 加密赛道最受关注的项目之一。",
    score: 9,
    twitter: "https://x.com/instinct_xyz",
    logo: "/kol/08-instinct_xyz.png",
    tokenStatus: "tbd",
    highlights: ["$1B 融资", "$10B 估值", "AI 热门"],
    funding: "$1B 融资 · $10B 估值",
    tweetText:
      "🆕 @instinct_xyz — AI 加密的狠角色\n\n大白话: $1B 融资 + $10B 估值,AI 赛道目前最猛的项目之一。\n⚠️ 估值高意味着回调风险也大,小仓参与为佳。\n\n完整分析 → openmeme.art/#kol\n@ruoxi01 整理",
    tweetTextEn:
      "🆕 @instinct_xyz — AI x crypto heavyweight\n\nTL;DR: $1B raised + $10B valuation, one of the hottest AI x crypto plays.\n⚠️ High val = high pullback risk, size small.\n\nFull analysis → openmeme.art/#kol\nCurated by @ruoxi01",
  },
  {
    handle: "stonkrobbers",
    name: "StonkRobbers",
    category: "Meme 交易",
    tagline: "StonkFun 风格 meme 交易平台",
    description: "StonkFun 风格的 meme 代币交易平台,聚焦 meme 文化的代币发行和交易。",
    score: 5,
    twitter: "https://x.com/stonkrobbers",
    logo: "/kol/09-stonkrobbers.png",
    tokenStatus: "tbd",
    tweetText:
      "🆕 @stonkrobbers — Meme 交易小平台\n\n大白话: 跟 StonkFun 一个路子,撸 meme 代币的发射和交易。\n💡 小平台流动性差,小钱试水。\n\n完整分析 → openmeme.art/#kol\n@ruoxi01 整理",
    tweetTextEn:
      "🆕 @stonkrobbers — meme trading platform\n\nTL;DR: StonkFun-style, mint & trade meme tokens.\n💡 Low liquidity on small platforms, test with small size.\n\nFull analysis → openmeme.art/#kol\nCurated by @ruoxi01",
  },
  {
    handle: "arcus_xyz",
    name: "Arcus",
    category: "永续合约 DEX",
    tagline: "永续 DEX · ⚠️ 团队运营过前一家 DEX 跑路",
    description: "永续合约 DEX,⚠️ 风险提示:据报道,运营 Arcus 的团队之前运营过另一家去中心化交易所并让其崩盘。",
    score: 6,
    twitter: "https://x.com/arcus_xyz",
    logo: "/kol/10-arcus_xyz.png",
    tokenStatus: "tbd",
    risk: "团队前科 · 谨慎参与",
    highlights: ["永续合约"],
    tweetText:
      "🆕 @arcus_xyz — 永续合约 DEX\n\n大白话: 做多做空都支持,看起来跟 GMX 一类。\n⚠️ 但团队之前运营过另一家 DEX 让它崩盘,⚠️ 务必小仓。\n\n完整分析 → openmeme.art/#kol\n@ruoxi01 整理",
    tweetTextEn:
      "🆕 @arcus_xyz — perp DEX\n\nTL;DR: Long/short support, similar to GMX-class.\n⚠️ But team ran a previous DEX to the ground — small size only.\n\nFull analysis → openmeme.art/#kol\nCurated by @ruoxi01",
  },
  {
    handle: "Lighter_xyz",
    name: "Lighter",
    category: "永续合约 DEX",
    tagline: "永续 DEX · 烧币回购中 · $LIT 已上线",
    description: "永续合约 DEX,正在进行烧币回购 (已销毁 1560 万枚 LIT),社交活跃度较高,长期价值捕获机制清晰。",
    score: 8,
    twitter: "https://x.com/Lighter_xyz",
    logo: "/kol/11-Lighter_xyz.png",
    tokenStatus: "live",
    launchDate: "2025",
    highlights: ["持续烧币回购", "Twitterscore 308", "高社交活跃"],
    token: "LIT",
    tweetText:
      "🆕 @Lighter_xyz — 烧币回购中的永续 DEX\n\n大白话: 已销毁 1560 万枚 LIT,长期价值捕获清晰。\n💡 Twitterscore 308/1000,社区活跃,适合撸治理代币。\n\n完整分析 → openmeme.art/#kol\n@ruoxi01 整理",
    tweetTextEn:
      "🆕 @Lighter_xyz — perp DEX with active burn\n\nTL;DR: 15.6M $LIT burned, long-term value capture clear.\n💡 Twitter score 308/1000, active community, farm the gov token.\n\nFull analysis → openmeme.art/#kol\nCurated by @ruoxi01",
  },
  {
    handle: "ponsdotfamily",
    name: "Pons",
    category: "创作者平台",
    tagline: "Robinhood Chain · 已付创作者 $10M+ · ⚠️ 诈骗争议",
    description: "Robinhood Chain 上的创作者平台,已向创作者支付超过 1000 万美元。⚠️ 存在连环骗子的争议。",
    score: 5,
    twitter: "https://x.com/ponsdotfamily",
    logo: "/kol/12-ponsdotfamily.png",
    tokenStatus: "noToken",
    risk: "连环骗子争议 · DYOR",
    highlights: ["$10M+ 创作者支付"],
    chain: "Robinhood Chain",
    tweetText:
      "🆕 @ponsdotfamily — Robinhood Chain 创作者平台\n\n大白话: 声称已付创作者 $10M+,听起来挺大方的。\n⚠️ 但有\"连环骗子\"争议,撸毛前 DYOR 务必谨慎。\n\n完整分析 → openmeme.art/#kol\n@ruoxi01 整理",
    tweetTextEn:
      "🆕 @ponsdotfamily — creator platform on Robinhood Chain\n\nTL;DR: Claims $10M+ paid to creators, sounds generous.\n⚠️ But 'serial scammer' controversy — DYOR hard before playing.\n\nFull analysis → openmeme.art/#kol\nCurated by @ruoxi01",
  },
  {
    handle: "fablesfi",
    name: "Fables",
    category: "代币 / 新",
    tagline: "Fables 经济模型 · $PROLOGUE 代币",
    description: "Fables 协议的 PROLOGUE 代币,新项目阶段,经济模型设计新颖,长期表现待观察。",
    score: 4,
    twitter: "https://x.com/fablesfi",
    logo: "/kol/13-fablesfi.png",
    tokenStatus: "live",
    launchDate: "近期",
    token: "PROLOGUE",
    tweetText:
      "🆕 @fablesfi — 故事经济代币\n\n大白话: 协议还在早期,代币 PROLOGUE 已发,讲\"故事经济\"。\n💡 小仓埋伏观察,等用户数和 TVL 起来再加大。\n\n完整分析 → openmeme.art/#kol\n@ruoxi01 整理",
    tweetTextEn:
      "🆕 @fablesfi — narrative-driven token\n\nTL;DR: Early protocol, $PROLOGUE live, plays on 'narrative economy'.\n💡 Small bag, watch users + TVL before adding.\n\nFull analysis → openmeme.art/#kol\nCurated by @ruoxi01",
  },
  {
    handle: "meridiandotxyz",
    name: "Meridian",
    category: "基金 / DAO",
    tagline: "新兴基金 / DAO · 信息有限",
    description: "新兴的基金 / DAO 项目,公开信息有限,处于早期阶段。",
    score: 4,
    twitter: "https://x.com/meridiandotxyz",
    logo: "/kol/14-meridiandotxyz.png",
    tokenStatus: "tbd",
    funding: "需查证",
    tweetText:
      "🆕 @meridiandotxyz — 新兴基金/DAO\n\n大白话: 信息有限,纯早期,适合先观察再下注。\n\n完整分析 → openmeme.art/#kol\n@ruoxi01 整理",
    tweetTextEn:
      "🆕 @meridiandotxyz — new fund/DAO\n\nTL;DR: Sparse info, very early, watch before betting.\n\nFull analysis → openmeme.art/#kol\nCurated by @ruoxi01",
  },
  {
    handle: "pairdotfund",
    name: "PAIR",
    category: "代币 / Fund",
    tagline: "PAIR 代币 · 已在 LBank 上市 (2026-08-30)",
    description: "PAIR 代币基金,2026-08-30 在 LBank 交易所上市,提供代币化基金投资渠道。",
    score: 5,
    twitter: "https://x.com/pairdotfund",
    logo: "/kol/15-pairdotfund.png",
    tokenStatus: "live",
    launchDate: "2026-08-30",
    highlights: ["已上线 LBank"],
    listedOn: "LBank (2026-08-30)",
    token: "PAIR",
    tweetText:
      "🆕 @pairdotfund — 代币化基金\n\n大白话: $PAIR 已上线 LBank,做代币化基金投资。\n💡 8 月底才上,新币,适合撸新币早期流动性。\n\n完整分析 → openmeme.art/#kol\n@ruoxi01 整理",
    tweetTextEn:
      "🆕 @pairdotfund — tokenized fund\n\nTL;DR: $PAIR live on LBank, tokenized fund investing.\n💡 Listed late Aug, new token, farm early liquidity.\n\nFull analysis → openmeme.art/#kol\nCurated by @ruoxi01",
  },
];
