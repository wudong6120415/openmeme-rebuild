import { Header } from "@/components/Header";
import { TwitterBanner } from "@/components/TwitterBanner";
import { Footer } from "@/components/Footer";
import { TwitterButton } from "@/components/TwitterButton";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "关于 OpenMeme.art",
  description: "OpenMeme.art 是一个撸毛向实时信号站, 由 𝕏 @ruoxi01 维护。",
};

export default function AboutPage() {
  return (
    <>
      <TwitterBanner />
      <Header />
      <main className="container-narrow py-16 max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-6">关于 OpenMeme.art</h1>

        <div className="prose prose-invert prose-zinc max-w-none">
          <p className="text-lg text-zinc-300 leading-relaxed">
            OpenMeme.art 是一个撸毛向实时信号站 ——
            <span className="text-[#00ff88] font-semibold">AI 扫全网, 真人筛选</span>,
            把 1-2 周内有动作的撸毛机会, 大白话翻译给你看。
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-3">🎯 我们做什么</h2>
          <ul className="text-zinc-300 space-y-2 list-disc list-inside">
            <li>追踪 <b>早期项目</b>: 1-2 周内 TGE / Launchpad / 上线交易所</li>
            <li>整理 <b>活跃空投</b>: 5-30 分钟可上手, 含预计奖励</li>
            <li>同步 <b>防骗预警</b>: 慢雾 / CertiK / 社区举报</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-3">🚫 我们不做什么</h2>
          <ul className="text-zinc-300 space-y-2 list-disc list-inside">
            <li>不接项目方广告上单</li>
            <li>不带单, 不喊单</li>
            <li>不卖币 / 不收会员费</li>
            <li>不承诺收益, 不保证 100% 准确</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-3">👤 谁在维护</h2>
          <p className="text-zinc-300">
            <a href={SITE.twitterUrl} className="text-[#00ff88] hover:underline">
              𝕏 @{SITE.twitterHandle}
            </a>
            , 个人撸毛玩家 + KOL。所有信号以大白话推送, 每天早 8 点 / 晚 8 点两个时间点集中更新。
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-3">⚖️ 免责声明</h2>
          <p className="text-zinc-400 text-sm">
            本站所有内容仅供信息聚合与研究参考, 不构成任何投资建议。加密资产价格波动剧烈,
            可能损失全部本金。撸毛 / Meme 币 / NFT 风险极高, 多数最终归零。请 DYOR。
          </p>
        </div>

        <div className="mt-12 p-6 rounded-2xl border border-[#00ff88]/30 bg-[#00ff88]/5 text-center">
          <div className="font-semibold mb-2">想第一时间拿到信号?</div>
          <TwitterButton size="lg" className="mt-2" />
        </div>
      </main>
      <Footer />
    </>
  );
}
