export function WhyFollow() {
  const points = [
    {
      icon: "🤖",
      title: "AI 扫全网, 真人过滤",
      desc: "DexScreener + Twitter 大V + Launchpad 公告 · @ruoxi01 过一遍再发, 不转储垃圾信息。",
    },
    {
      icon: "💬",
      title: "大白话翻译",
      desc: "撸毛人不看白皮书。看 '值不值得撸 / 怎么撸 / 风险在哪'。",
    },
    {
      icon: "🚫",
      title: "不接广告, 不带单",
      desc: "没有项目方充值上单, 没有'老师喊单', 干干净净。",
    },
    {
      icon: "⏰",
      title: "每日早 8 点 / 晚 8 点推送",
      desc: "新机会第一时间, 不打扰工作日。",
    },
  ];

  return (
    <section id="why" className="py-16 sm:py-20 border-b border-bg-border bg-zinc-950/50">
      <div className="container-narrow">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            为什么关注 <span className="text-[#00ff88]">@ruoxi01</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            同样的数据, DexScreener / CoinGecko 也都有。差别是<span className="text-zinc-100">人的判断</span>。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {points.map((p) => (
            <div key={p.title} className="card card-pad flex gap-4">
              <div className="text-3xl shrink-0">{p.icon}</div>
              <div>
                <div className="font-bold text-zinc-100 mb-1">{p.title}</div>
                <div className="text-sm text-zinc-400 leading-relaxed">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
