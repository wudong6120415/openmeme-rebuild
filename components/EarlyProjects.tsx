import type { EarlySignal } from "@/data/signals";
import { TwitterButton } from "@/components/TwitterButton";

const chainColor: Record<string, string> = {
  Solana: "tag-purple",
  BSC: "tag-yellow",
  Base: "tag-blue",
  Ethereum: "tag-zinc",
  Sui: "tag-cyan",
  TON: "tag-blue",
};

export function EarlyProjects({ signals }: { signals: EarlySignal[] }) {
  return (
    <section id="early" className="py-16 sm:py-20 border-b border-bg-border">
      <div className="container-narrow">
        <SectionHeader
          emoji="🆕"
          title="早期项目 · 1-2 周内有动作"
          subtitle="AI 扫全网 + @ruoxi01 真人过一遍 · 仅列真正值得看的"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {signals.map((s) => (
            <article key={s.symbol} className="card card-pad flex flex-col gap-3 group">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00ff88] to-emerald-600 flex items-center justify-center font-bold text-black text-sm">
                    {s.symbol.slice(0, 3).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-zinc-100">{s.name}</div>
                    <div className="text-xs text-zinc-500">${s.symbol}</div>
                  </div>
                </div>
                {chainColor[s.chain] ? (
                  <span className={chainColor[s.chain]}>{s.chain}</span>
                ) : (
                  <span className="tag-zinc">{s.chain}</span>
                )}
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">{s.tagline}</p>

              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className="tag-zinc text-[10px]">#{t}</span>
                ))}
              </div>

              <div className="mt-auto pt-3 border-t border-bg-border flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-500">距 TGE</div>
                  <div className="text-lg font-bold text-[#00ff88]">{s.daysToTGE} 天</div>
                </div>
                {s.twitter && (
                  <a
                    href={s.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-400 hover:text-[#00ff88]"
                  >
                    官方 𝕏 →
                  </a>
                )}
              </div>
            </article>
          ))}
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
