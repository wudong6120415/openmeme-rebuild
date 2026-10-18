import Image from "next/image";
import type { KOLProject } from "@/data/kol-projects";

function scoreColor(score: number) {
  if (score >= 8) return "text-emerald-300 border-emerald-500/40 bg-emerald-500/15";
  if (score >= 6) return "text-amber-300   border-amber-500/40   bg-amber-500/15";
  return "text-zinc-400     border-zinc-500/40    bg-zinc-500/15";
}

function scoreLabel(score: number) {
  if (score >= 8) return "高分";
  if (score >= 6) return "中等";
  return "观察";
}

export function KOLProjects({ projects }: { projects: KOLProject[] }) {
  // sort: high to low score
  const sorted = [...projects].sort((a, b) => b.score - a.score);

  return (
    <section id="kol" className="py-16 sm:py-20 border-b border-bg-border">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-3xl mb-2">𝕏</div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            KOL 推荐 · 15 个推特项目
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            @ruoxi01 关注的 15 个项目 · 参与度评分 1-10 · 来源公开推特 + 链上数据
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {sorted.map((p, idx) => (
            <a
              key={p.handle}
              href={p.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-pad flex flex-col gap-2.5 group relative hover:border-[#00ff88] transition-all"
            >
              {/* Rank + Score badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-600">#{String(idx + 1).padStart(2, "0")}</span>
                <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold border ${scoreColor(p.score)}`}>
                  {p.score}/10
                </span>
              </div>

              {/* Logo */}
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-zinc-900 group-hover:scale-[1.02] transition-transform">
                <Image
                  src={p.logo}
                  alt={`${p.name} logo`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  unoptimized
                />
                {/* risk overlay */}
                {p.risk && (
                  <div className="absolute top-1 right-1 text-[9px] px-1 py-0.5 rounded bg-rose-500/90 text-white font-bold">
                    ⚠
                  </div>
                )}
              </div>

              {/* Name + handle */}
              <div className="min-h-0">
                <div className="font-bold text-zinc-100 text-sm truncate" title={p.name}>{p.name}</div>
                <div className="text-[11px] text-zinc-500 truncate font-mono">@{p.handle}</div>
              </div>

              {/* Category */}
              <div className="text-[10px] text-zinc-400 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#00ff88]"></span>
                {p.category}
              </div>

              {/* Highlights or risk */}
              {p.highlights && p.highlights.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {p.highlights.slice(0, 1).map((h) => (
                    <span key={h} className="text-[9px] px-1 py-0.5 rounded bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20 truncate max-w-full">
                      {h}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="mt-auto pt-1.5 border-t border-bg-border flex items-center justify-between text-[10px]">
                <span className={p.score >= 7 ? "text-emerald-400" : p.score >= 5 ? "text-amber-400" : "text-zinc-500"}>
                  {scoreLabel(p.score)}
                </span>
                <span className="text-zinc-400 group-hover:text-[#00ff88] transition-colors">
                  𝕏 →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Footer legend */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>高分 8-10</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span>中等 6-7</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-zinc-500"></span>观察 1-5</span>
          <span className="flex items-center gap-1.5">⚠ 标 = 需谨慎</span>
        </div>
      </div>
    </section>
  );
}
