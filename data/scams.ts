export type ScamAlert = {
  title: string;
  type: string;
  level: "高" | "中" | "低";
  detail: string;
  source: string;
};

export const scams: ScamAlert[] = [
  {
    title: "假 '@OpenAI_airdrop' 推特账号",
    type: "钓鱼",
    level: "高",
    detail:
      "假冒官方账号, 引导用户点击'领取 1000 美元空投'链接, 实则盗签钱包授权。已举报超过 200 次。",
    source: "@ruoxi01 推特举报 · 慢雾 SlowMist",
  },
  {
    title: "$SCAM 貔貅盘合约",
    type: "貔貅盘",
    level: "高",
    detail:
      "BSC 链上某新币, 合约只允许买入不允许卖出, 持币地址超 90% 是机器人。48h 内归零。",
    source: "CertiK Skynet 扫描",
  },
  {
    title: "假 TG 群'官方客服私信空投'",
    type: "社工",
    level: "中",
    detail:
      "骗子伪装项目方客服, 私聊用户索要钱包助记词'验证身份'。任何官方都不会要助记词。",
    source: "@ruoxi01 推特 · 多名用户反馈",
  },
  {
    title: "Discord 钓鱼机器人",
    type: "钓鱼",
    level: "中",
    detail:
      "假冒项目方 Discord, 用户连接钱包后被批量盗空。识别方法: 看官方域名是否一致。",
    source: "慢雾 SlowMist 周报",
  },
  {
    title: "Telegram'搬砖套利'骗局",
    type: "套利骗局",
    level: "高",
    detail:
      "声称'USDT ↔ ETH 无风险套利, 收益 5%/天', 实质是经典庞氏。任何保本高收益都是骗局。",
    source: "@ruoxi01 反复提醒",
  },
];
