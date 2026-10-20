export type TokenStatus = "live" | "upcoming" | "noToken" | "tbd";

export type NewProject = {
  slug: string;
  name: string;
  symbol: string;
  chain: string;
  category: string;
  logo: string;
  // 评分
  score: number;              // 0-100 综合
  status: TokenStatus;
  launchDate?: string;
  listedOn?: string;
  token?: string;
  // 内容
  tldr: string[];             // 3-5 句大白话预读（核心体验）
  detail: string;             // 展开的完整描述
  highlights: string[];
  risk?: string;
  // 数据
  metrics: { label: string; value: string }[];
  links: { label: string; url: string }[];
  // 推文
  tweetText: string;
};

export const newProjects: NewProject[] = [
  {
    slug: "instinct",
    name: "Instinct",
    symbol: "INSTINCT",
    chain: "AI / 多链",
    category: "AI",
    logo: "/kol/08-instinct_xyz.png",
    score: 92,
    status: "tbd",
    tldr: [
      "AI 赛道今年最大的融资故事，10 亿美元融资、100 亿美元估值。",
      "不是 meme，是想做 AI × Crypto 的基础设施层。",
      "目前还没发币，但估值已经把预期拉满了。",
      "风险点：估值越高，回调越狠，小仓参与。",
    ],
    detail:
      "Instinct 是 2026 年 AI × Crypto 赛道最受关注的项目之一。据公开报道，它完成了 10 亿美元融资，估值达到 100 亿美元。这个估值在加密领域属于头部水平。\n\n从赛道看，AI + Crypto 的结合点主要有三个：AI Agent 交易、去中心化算力、AI 驱动的链上数据分析。Instinct 具体做哪一块尚未完全公开，但从融资体量看，属于基础设施级别而非应用层。\n\n撸毛角度：目前无代币（TGE 未公布），如果关注这个方向，可以在 X 上跟踪 @instinct_xyz 的官方公告。",
    highlights: ["$1B 融资", "$10B 估值", "AI 赛道头部"],
    metrics: [
      { label: "融资", value: "$1B" },
      { label: "估值", value: "$10B" },
      { label: "发币", value: "TBD" },
    ],
    links: [{ label: "𝕏 官方", url: "https://x.com/instinct_xyz" }],
    tweetText:
      "🆕 @instinct_xyz — AI 加密的狠角色\n\n大白话：$1B 融资 + $10B 估值，AI 赛道目前最猛的项目之一。\n⚠️ 估值高意味着回调风险也大，小仓参与为佳。\n\n完整分析 → openmeme.art/#projects\n@ruoxi01 整理",
  },
  {
    slug: "lighter",
    name: "Lighter",
    symbol: "LIT",
    chain: "zkSync L2",
    category: "永续 DEX",
    logo: "/kol/11-Lighter_xyz.png",
    score: 86,
    status: "live",
    launchDate: "2025",
    token: "LIT",
    tldr: [
      "永续合约 DEX，代币 $LIT 已经上线。",
      "重点：一直在烧币回购，已经销毁 1560 万枚。",
      "社交活跃度 Twitterscore 308/1000，社区很活。",
      "撸毛思路：治理代币 + 回购预期，可以关注空投。",
    ],
    detail:
      "Lighter 是基于 zkSync 的永续合约 DEX，主打低 gas + 高性能的交易体验。\n\n相比 GMX、Hyperliquid 这类竞品，Lighter 的差异化在于持续不断的代币销毁计划。官方已销毁 1560 万枚 LIT，这个量级在目前的 DEX 项目里属于激进派。\n\n从社区数据看，Lighter 的 Twitterscore 是 308/1000，在 DEX 项目里属于头部活跃水平。\n\n撸毛建议：如果你已经在 zkSync 生态活动，Lighter 的治理代币空投值得留意。回购机制通常伴随空投预期。",
    highlights: ["持续烧币回购", "Twitterscore 308", "zkSync 生态"],
    metrics: [
      { label: "已销毁", value: "1560 万 LIT" },
      { label: "社交评分", value: "308/1000" },
      { label: "发币", value: "2025 已发" },
    ],
    links: [{ label: "𝕏 官方", url: "https://x.com/Lighter_xyz" }],
    tweetText:
      "🆕 @Lighter_xyz — 烧币回购中的永续 DEX\n\n大白话：已销毁 1560 万枚 LIT，长期价值捕获清晰。\n💡 Twitterscore 308/1000，社区活跃，适合撸治理代币。\n\n完整分析 → openmeme.art/#projects\n@ruoxi01 整理",
  },
  {
    slug: "metric",
    name: "Metric",
    symbol: "METRIC",
    chain: "多链（含 Robinhood Chain）",
    category: "DEX",
    logo: "/kol/05-metricxyz.png",
    score: 84,
    status: "upcoming",
    launchDate: "2026-Q4 (预计)",
    tldr: [
      "已经上线的 DEX，不是概念项目。",
      "支持 Robinhood Chain 等多条链，重点押注新链。",
      "跟 Chainlink 有合作，基础设施这块比较扎实。",
      "代币还没发，预计 2026 Q4。新链 DEX 有早期红利。",
    ],
    detail:
      "Metric 是一个去中心化交易所（DEX），已经在多条链上正式上线运行。\n\n它最值得关注的是对 Robinhood Chain 的布局。Robinhood Chain 在 2026 年 7 月上线后，两个月内 DEX 累计交易量就达到了 470 亿美元，其中超过 80% 是 Meme 币交易。这种情况下，Metric 押注新链的策略很明确。\n\n另外 Metric 与 Chainlink 建立了合作，对 DEX 来说这意味着价格喂数据比较可靠。\n\n撸毛建议：Robinhood Chain 目前是新链，早期 DEX 的流动性激励、空投预期都比较大。关注 @metricxyz 的代币公告。",
    highlights: ["DEX 已上线", "多链支持", "Chainlink 合作"],
    metrics: [
      { label: "状态", value: "已上线" },
      { label: "代币", value: "预计 2026 Q4" },
      { label: "合作", value: "Chainlink" },
    ],
    links: [{ label: "𝕏 官方", url: "https://x.com/metricxyz" }],
    tweetText:
      "🆕 @metricxyz — 已上线的去中心化交易所\n\n大白话：DEX 已跑通 + 跟 Chainlink 合作，基础设施扎实。\n💡 Robinhood Chain 重点布局，新链 DEX 有早期红利。\n\n完整分析 → openmeme.art/#projects\n@ruoxi01 整理",
  },
  {
    slug: "titan",
    name: "Titan Exchange",
    symbol: "TITAN",
    chain: "Solana",
    category: "DEX / 永续",
    logo: "/kol/07-TitanExchange_.png",
    score: 78,
    status: "live",
    launchDate: "2025",
    token: "TITAN",
    tldr: [
      "Solana 上的 DEX，代币 $TITAN 已上线。",
      "关键背书：拿到了 Jupiter 和 StonkFun 的赞助。",
      "Jupiter 是 Solana 生态的头部 DEX，能拿到它赞助说明不一般。",
      "撸毛思路：Solana meme 周期 + 小仓埋伏。",
    ],
    detail:
      "Titan Exchange 是一个 Solana 生态的去中心化交易所，提供 swap 和交易服务。\n\n它最大的背书来自 Jupiter 和 StonkFun 的赞助。Jupiter 是 Solana 生态最具代表性的 DEX 之一，能够获得 Jupiter 的赞助，意味着 Titan 在技术或生态层面获得了一定认可。\n\n$TITAN 代币已经上线。目前 Solana 生态正处于 meme 币活跃周期，生态内 DEX 的代币通常会有较好表现。\n\n风险提示：小市值 DEX 的代币波动很大，建议小仓位参与。",
    highlights: ["Jupiter 赞助", "StonkFun 赞助", "Solana 生态"],
    metrics: [
      { label: "代币", value: "$TITAN 已发" },
      { label: "生态", value: "Solana" },
      { label: "背书", value: "Jupiter" },
    ],
    links: [{ label: "𝕏 官方", url: "https://x.com/TitanExchange_" }],
    tweetText:
      "🆕 @TitanExchange_ — Jupiter 赞助的 Solana DEX\n\n大白话：Jupiter 是 Solana 上的顶级 DEX，拿到它的赞助 = 实力背书。\n💡 $TITAN 已发，可以小仓埋伏等 Solana meme 周期。\n\n完整分析 → openmeme.art/#projects\n@ruoxi01 整理",
  },
  {
    slug: "fission",
    name: "Fission",
    symbol: "FISSION",
    chain: "需查证",
    category: "RWA",
    logo: "/kol/06-FissionXYZ.png",
    score: 76,
    status: "tbd",
    tldr: [
      "RWA（真实世界资产）赛道，把私募股权代币化。",
      "逻辑：传统私募股权门槛高，代币化后人人可参与。",
      "RWA 一直是大资金在玩的赛道，有想象空间。",
      "代币还没发，需要观察项目进展。",
    ],
    detail:
      "Fission 是一个 RWA 方向的 DeFi 平台，核心概念是把私募股权投资代币化。\n\nRWA 是过去两年加密行业最热门的叙事之一。逻辑很简单：现实世界的资产（房地产、股票、私募股权）通过代币化上链，可以做到流动性、透明度、可编程性。\n\nFission 切入的是私募股权这一块。这个细分市场的特点是客单价极高、参与者少，代币化后理论上可以扩大参与面。\n\n撸毛建议：RWA 项目发币周期通常较长，适合放在观察列表，追踪官方公告。",
    highlights: ["RWA 赛道", "私募股权代币化"],
    metrics: [
      { label: "赛道", value: "RWA" },
      { label: "代币", value: "TBD" },
      { label: "阶段", value: "早期" },
    ],
    links: [{ label: "𝕏 官方", url: "https://x.com/FissionXYZ" }],
    tweetText:
      "🆕 @FissionXYZ — RWA 赛道新方向\n\n大白话：把私募股权代币化，传统金融 + 链上化的故事。\n💡 RWA 一直是大户在玩的赛道，跟着布局正当时。\n\n完整分析 → openmeme.art/#projects\n@ruoxi01 整理",
  },
  {
    slug: "lppoolparty",
    name: "LP Pool Party",
    symbol: "LPPP",
    chain: "Robinhood Chain",
    category: "LP / DeFi",
    logo: "/kol/04-LPPoolParty.png",
    score: 70,
    status: "live",
    launchDate: "2025-11",
    token: "LPPP",
    tldr: [
      "Robinhood Chain 上的 LP 协议，代币 $LPPP 已发。",
      "Robinhood Chain 是 2026 年最热的新公链，两个月 DEX 交易量 470 亿美元。",
      "其中超过 80% 是 Meme 币交易，说明这条链很活跃。",
      "撸毛思路：新链 LP 早期激励高，适合小仓位尝试。",
    ],
    detail:
      "LP Pool Party 是部署在 Robinhood Chain 上的流动性池协议，已经发行了 $LPPP 代币。\n\nRobinhood Chain 是 2026 年最值得关注的新公链。它由 Robinhood 在 2026 年 7 月推出，虽然官方没有发行原生代币（使用 ETH 作为 gas），但上线两个月内累计 DEX 交易量就达到了 470 亿美元。\n\n根据 FalconX 的数据，Meme 币占该链 DEX 活动量的 80% 以上。这条链的用户行为高度集中在 Meme 交易上。\n\n撸毛建议：新公链上线初期，LP 激励和生态空投是主要收益来源。但也要注意，新链项目风险相对更高。",
    highlights: ["已上线代币", "Robinhood Chain", "新链红利"],
    metrics: [
      { label: "代币", value: "$LPPP" },
      { label: "发币时间", value: "2025-11" },
      { label: "链上 DEX 量", value: "$47B (2个月)" },
    ],
    links: [
      { label: "𝕏 官方", url: "https://x.com/LPPoolParty" },
      { label: "Etherscan", url: "https://etherscan.io/token/0x7081d561f4d6d2234112eb33a482b9b7cc3d4319" },
    ],
    tweetText:
      "🆕 @LPPoolParty — Robinhood Chain 上的 LP 协议\n\n大白话：$LPPP 已发币，新链项目适合撸早期 LP 收益。\n💡 Robinhood Chain 是撸毛新热土，值得埋伏。\n\n完整分析 → openmeme.art/#projects\n@ruoxi01 整理",
  },
  {
    slug: "arcus",
    name: "Arcus",
    symbol: "ARCUS",
    chain: "需查证",
    category: "永续 DEX",
    logo: "/kol/10-arcus_xyz.png",
    score: 64,
    status: "tbd",
    risk: "⚠️ 团队前科：曾运营过另一家 DEX 并让其崩盘",
    tldr: [
      "永续合约 DEX，做多做空都支持。",
      "⚠️ 重要：据报道团队之前运营过另一家 DEX，让它崩盘了。",
      "产品本身看起来跟 GMX 那一类差不多。",
      "建议：可以看，但仓位一定要小。",
    ],
    detail:
      "Arcus 是一个永续合约 DEX，支持做多和做空交易。\n\n⚠️ 风险提示：据 KuCoin 报道，运营 Arcus 的团队之前运营过另一家去中心化交易所，并最终导致其崩盘。这是一个需要高度重视的负面信号。\n\n产品层面，永续合约 DEX 的技术门槛并不高，主要差异在流动性深度、预言机质量和费用结构。Arcus 目前在这些方面还没有明显优势。\n\n撸毛建议：由于团队有前科，即使产品看起来正常，也建议极小仓位参与，或者先观察一段时间。",
    highlights: ["永续合约", "团队有前科"],
    metrics: [
      { label: "类型", value: "永续 DEX" },
      { label: "代币", value: "TBD" },
      { label: "风险", value: "团队前科" },
    ],
    links: [{ label: "𝕏 官方", url: "https://x.com/arcus_xyz" }],
    tweetText:
      "🆕 @arcus_xyz — 永续合约 DEX\n\n大白话：做多做空都支持，看起来跟 GMX 一类。\n⚠️ 但团队之前运营过另一家 DEX 让它崩盘，务必小仓。\n\n完整分析 → openmeme.art/#projects\n@ruoxi01 整理",
  },
  {
    slug: "pair",
    name: "PAIR",
    symbol: "PAIR",
    chain: "需查证",
    category: "代币化基金",
    logo: "/kol/15-pairdotfund.png",
    score: 60,
    status: "live",
    launchDate: "2026-08-30",
    token: "PAIR",
    listedOn: "LBank (2026-08-30)",
    tldr: [
      "代币化基金方向的 $PAIR，已经在 LBank 上线。",
      "上线时间是 2026 年 8 月 30日，算比较新的。",
      "逻辑：把基金做成代币，让普通人也能参与。",
      "撸毛思路：新币上线初期流动性溢价，可以关注。",
    ],
    detail:
      "PAIR 是一个代币化基金项目的代币，已于 2026 年 8 月 30 日在 LBank 交易所上市。\n\n代币化基金是 RWA 赛道的一个分支。它的逻辑是把传统基金产品（如指数基金、货币基金）的份额代币化，让没有传统金融渠道的用户也能参与。\n\n$PAIR 上线时间相对较新（2026 年 8 月底），作为新上市代币，早期通常会有流动性溢价。\n\n撸毛建议：关注 @pairdotfund 的后续公告，包括空投计划、生态合作等。",
    highlights: ["已上线 LBank", "RWA 赛道"],
    metrics: [
      { label: "代币", value: "$PAIR" },
      { label: "上市", value: "LBank" },
      { label: "上市日", value: "2026-08-30" },
    ],
    links: [{ label: "𝕏 官方", url: "https://x.com/pairdotfund" }],
    tweetText:
      "🆕 @pairdotfund — 代币化基金\n\n大白话：$PAIR 已上线 LBank，做代币化基金投资。\n💡 8 月底才上，新币，适合撸新币早期流动性。\n\n完整分析 → openmeme.art/#projects\n@ruoxi01 整理",
  },
  {
    slug: "pons",
    name: "Pons",
    symbol: "PONS",
    chain: "Robinhood Chain",
    category: "创作者平台",
    logo: "/kol/12-ponsdotfamily.png",
    score: 56,
    status: "noToken",
    risk: "⚠️ 存在「连环骗子」争议",
    tldr: [
      "Robinhood Chain 上的创作者平台。",
      "官方声称已向创作者支付超过 1000 万美元。",
      "⚠️ 但是：社区有「连环骗子」的争议，需要小心。",
      "建议：DYOR 之后再决定要不要参与。",
    ],
    detail:
      "Pons 是部署在 Robinhood Chain 上的创作者平台，官方曾宣称已经向创作者支付了超过 1000 万美元。\n\n⚠️ 风险提示：根据 Gate 的报道，社区中存在关于 Pons「连环骗子」的争议。这类争议在加密领域往往意味着项目方存在历史纠纷。\n\nRobinhood Chain 上目前聚集了大量早期项目，竞争激烈，但也意味着机会和骗局并存。\n\n撸毛建议：对于有诈骗争议的项目，建议先不要参与。等争议澄清后再看。",
    highlights: ["$10M+ 创作者支付"],
    metrics: [
      { label: "类型", value: "创作者平台" },
      { label: "链", value: "Robinhood Chain" },
      { label: "风险", value: "诈骗争议" },
    ],
    links: [{ label: "𝕏 官方", url: "https://x.com/ponsdotfamily" }],
    tweetText:
      "🆕 @ponsdotfamily — Robinhood Chain 创作者平台\n\n大白话：声称已付创作者 $10M+，听起来挺大方的。\n⚠️ 但有「连环骗子」争议，撸毛前 DYOR 务必谨慎。\n\n完整分析 → openmeme.art/#projects\n@ruoxi01 整理",
  },
];

// 旧的 KOL 板块用的 handle 引用（兼容）
export type { TokenStatus as ProjectTokenStatus };