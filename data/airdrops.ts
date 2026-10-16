export type Airdrop = {
  name: string;
  project: string;
  difficulty: "简单" | "中等" | "困难";
  reward: string;
  time: string;
  deadline: string;
  note: string;
  hot?: boolean;
  link?: string;
};

export const airdrops: Airdrop[] = [
  {
    name: "Layer3 × Galxe 联合任务",
    project: "zkSync",
    difficulty: "简单",
    reward: "$30-80",
    time: "10 min",
    deadline: "5 天后",
    note: "完成 5 步任务链即可领取 OAT, 后续 zkSync 空投加权。",
    hot: true,
    link: "https://galxe.com",
  },
  {
    name: "Monad 测试网交互",
    project: "Monad",
    difficulty: "中等",
    reward: "预期 $100-300",
    time: "30 min",
    deadline: "TGE 前",
    note: "主网交互 10 笔以上, 持仓 ≥ $100, 钱包分散到 3 个以上。",
    hot: true,
  },
  {
    name: "Berachain 银河任务",
    project: "Berachain",
    difficulty: "简单",
    reward: "$20-50",
    time: "5 min",
    deadline: "12 天后",
    note: "关注推特 + 转发 = 拿到银河任务徽章, 主网空投有加成。",
  },
  {
    name: "Story Protocol 创作奖",
    project: "Story",
    difficulty: "中等",
    reward: "$50-150",
    time: "20 min",
    deadline: "21 天后",
    note: "上传 3 篇 IP 注册证明, 早期创作者激励。",
  },
  {
    name: "Hyperliquid 交易赛",
    project: "Hyperliquid",
    difficulty: "困难",
    reward: "前 1000 名 $500",
    time: "持续",
    deadline: "28 天后",
    note: "周交易量 ≥ $10k, 持仓 ≥ $500, 胜率要求 55%+。",
  },
  {
    name: "Celestia 节点奖励",
    project: "Celestia",
    difficulty: "简单",
    reward: "$10-30",
    time: "2 min",
    deadline: "长期",
    note: "通过 Leap Wallet 委托任意金额, 每天领取TIA 收益 + 未来空投。",
  },
];
