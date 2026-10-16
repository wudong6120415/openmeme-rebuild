import { TwitterButton } from "@/components/TwitterButton";

export function FooterCTA() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff88]/5 to-transparent"></div>
      <div className="container-narrow relative text-center">
        <div className="inline-block mb-4 px-3 py-1 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/5 text-xs font-medium text-[#00ff88]">
          下一次 TGE 倒计时 · 已经开始
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          别错过下一条信号
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto mb-8">
          撸毛的窗口期通常只有 1-3 天。错过一条, 少赚一个本金的几十倍。
        </p>
        <TwitterButton size="lg" />
        <div className="text-xs text-zinc-500 mt-4">
          免费 · 无需注册 · 一键关注
        </div>
      </div>
    </section>
  );
}
