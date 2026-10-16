import type { EarlySignal } from "@/data/signals";
import { TwitterButton } from "@/components/TwitterButton";

// 每个链真实的视觉色（参考各自品牌色）
const chainTheme: Record<string, { bg: string; text: string; border: string; logo: string }> = {
  Solana:    { bg: "bg-purple-500/15", text: "text-purple-300", border: "border-purple-500/40", logo: "◎" },
  BSC:       { bg: "bg-yellow-500/15", text: "text-yellow-300", border: "border-yellow-500/40", logo: "⬡" },
  Base:      { bg: "bg-sky-500/15",    text: "text-sky-300",    border: "border-sky-500/40",    logo: "🔵" },
  Ethereum:  { bg: "bg-indigo-500/15", text: "text-indigo-300", border: "border-indigo-500/40", logo: "Ξ" },
  "Robinhood Chain": { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/40", logo: "R" },
  Sui:       { bg: "bg-cyan-500/15",   text: "text-cyan-300",   border: "border-cyan-500/40",   logo: "💧" },
  TON:       { bg: "bg-blue-500/15",   text: "text-blue-300",   border: "border-blue-500/40",   logo: "◆" },
  Monad:     { bg: "bg-violet-500/15", text: "text-violet-300", border: "border-violet-500/40", logo: "M" },
};

// 阶段（颜色码）
const stageStyle: Record<string, { bg: string; text: string; pulse: boolean }> = {
  "TGE 倒计时": { bg: "bg-amber-500/15",   text: "text-amber-300",   pulse: true  },
  "刚启动":     { bg: "bg-rose-500/15",     text: "text-rose-300",     pulse: true  },
  "空投前":     { bg: "bg-violet-500/15",   text: "text-violet-300",   pulse: true  },
  "已上线":     { bg: "bg-emerald-500/15",  text: "text-emerald-300",  pulse: false },
};

export function EarlyProjects({ signals }: { signals: EarlySignal[] }) {
  return (
    <section id="early" className="py-16 sm:py-20 border-b border-bg-border">
      <div className="container-narrow">
        <SectionHeader
          emoji="🆕"
          title="早期项目 · 1-2 周内有动作"
          subtitle="真实数据 · 来源 crypto.news / CoinGecko / DeFiLlama · @ruoxi01 真人筛选"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {signals.map((s, idx) => {
            const chain = chainTheme[s.chain] ?? chainTheme.Ethereum;
            const stage = s.stage ? stageStyle[s.stage] : null;

            return (
              <article
                key={s.symbol}
                className="card card-pad flex flex-col gap-3 group relative overflow-hidden hover:border-[#00ff88] transition-all"
              >
                {/* Top row: highlight banner + rank */}
                <div className="flex items-center justify-between min-h-[20px]">
                  {s.highlight ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 border border-amber-500/30">
                      <span>⭐</span> {s.highlight}
                    </span>
                  ) : <span />}
                  <span className="text-[10px] font-mono text-zinc-600">#{String(idx + 1).padStart(2, "0")}</span>
                </div>

                {/* Header: Token badge + Name + Chain */}
                <div className="flex items-start gap-3">
                  <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#00ff88] to-emerald-600 flex items-center justify-center font-extrabold text-black text-base shrink-0 shadow-[0_0_12px_-3px_rgba(0,255,136,0.4)] group-hover:scale-105 transition-transform">
                    {s.symbol.slice(0, 4).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-zinc-100 truncate">{s.name}</div>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className="text-xs text-zinc-500 font-mono">${s.symbol}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border ${chain.bg} ${chain.text} ${chain.border}`}>
                        <span>{chain.logo}</span> {s.chain}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stage badge */}
                {stage && (
                  <div className="flex items-center gap-1.5">
                    <span className={`relative inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${stage.bg} ${stage.text}`}>
                      {stage.pulse && (
                        <span className="relative flex h-1.5 w-1.5">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${stage.text.replace("text-", "bg-")} opacity-75`}></span>
                          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${stage.text.replace("text-", "bg-")}`}></span>
                        </span>
                      )}
                      {s.stage}
                    </span>
                  </div>
                )}

                {/* Tagline */}
                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 min-h-[3.6em]">
                  {s.tagline}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="tag-zinc text-[10px]">#{t}</span>
                  ))}
                </div>

                {/* Stats grid: TGE + Market Cap + Twitter */}
                <div className="mt-auto pt-3 border-t border-bg-border grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider">距 TGE</div>
                    <div className="text-base font-extrabold text-[#00ff88] leading-tight">
                      {s.daysToTGE === 0 ? "已上线" : `${s.daysToTGE} 天`}
                    </div>
                  </div>
                  {s.marketCap ? (
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">市值</div>
                      <div className="text-base font-bold text-zinc-200 leading-tight">{s.marketCap}</div>
                    </div>
                  ) : (
                    <div className="text-right">
                      {s.twitter && (
                        <a
                          href={s.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-[#00ff88] transition-colors"
                        >
                          官方 𝕏 →
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {s.marketCap && s.twitter && (
                  <a
                    href={s.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 text-xs text-zinc-500 hover:text-[#00ff88] transition-colors"
                  >
                    𝕏 →
                  </a>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-10 p-6 rounded-2xl border border-[#00ff88]/30 bg-[#00ff88]/5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <div className="font-semibold text-zinc-100 mb-1">想看完整背景 + 撸毛路径?</div>
            <div className="text-sm text-zinc-400">
              每条信号的"团队 / 融资 / 撸毛步骤 / 风险点", 都在 𝕏 @ruoxi01 实时推文里。
            </div>
          </div>
          <TwitterButton variant="outline" label="查看完整分析" />
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  emoji,
  title,
  subtitle,
}: {
  emoji: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-3xl mb-2">{emoji}</div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-zinc-400 text-sm sm:text-base mt-2">{subtitle}</p>
    </div>
  );
}
