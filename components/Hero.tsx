import { TwitterButton } from "@/components/TwitterButton";

export function Hero({
  signalCount,
  airdropCount,
  scamCount,
  toolCount,
}: {
  signalCount: number;
  airdropCount: number;
  scamCount: number;
  toolCount: number;
}) {
  return (
    <section className="relative overflow-hidden border-b border-bg-border">
      <div className="absolute inset-0 grid-bg opacity-50"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00ff88]/10 rounded-full blur-[100px]"></div>

      <div className="container-narrow relative py-16 sm:py-24">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/5 text-xs font-medium text-[#00ff88]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse"></span>
            每日更新 · AI 扫全网 + 真人筛选
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            撸毛信号
            <br />
            <span className="gradient-text">比所有人早一步</span>
          </h1>

          <p className="max-w-2xl text-zinc-400 text-base sm:text-lg mb-8 leading-relaxed">
            1-2 周内 TGE / 空投机会 / 防骗预警 · 由
            <span className="text-[#00ff88] font-semibold"> 𝕏 @ruoxi01 </span>
            大白话翻译,只发撸毛人真正能用得上的。
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
            <TwitterButton size="lg" />
            <a
              href="#early"
              className="inline-flex items-center gap-2 px-5 py-3 text-zinc-300 hover:text-zinc-100 transition-colors text-sm"
            >
              先看今日信号 ↓
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-bg-border rounded-2xl overflow-hidden border border-bg-border w-full max-w-2xl">
            <Stat n={signalCount} label="早期项目" />
            <Stat n={airdropCount} label="活跃空投" />
            <Stat n={scamCount} label="防骗预警" />
            <Stat n={toolCount} label="必装工具" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="bg-bg-card p-4 text-center">
      <div className="text-2xl sm:text-3xl font-extrabold text-[#00ff88]">{n}</div>
      <div className="text-xs text-zinc-500 mt-1">{label}</div>
    </div>
  );
}
