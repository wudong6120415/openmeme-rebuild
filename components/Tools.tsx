import type { Tool } from "@/data/tools";
import { SITE } from "@/lib/site";

const categoryColor: Record<Tool["category"], string> = {
  扫链: "tag-blue",
  防骗: "tag-red",
  任务: "tag-yellow",
  钱包: "tag-green",
  数据: "tag-zinc",
};

const categoryIcon: Record<Tool["category"], string> = {
  扫链: "🔍",
  防骗: "🛡",
  任务: "🎯",
  钱包: "💼",
  数据: "📊",
};

export function Tools({ tools }: { tools: Tool[] }) {
  return (
    <section id="tools" className="py-16 sm:py-20 border-b border-bg-border">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-3xl mb-2">🧰</div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            撸毛工具 · Top 10
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            撸毛社区公认必备 · 由 <span className="text-[#00ff88]">@ruoxi01</span> 整理
          </p>
          <p className="text-zinc-500 text-xs mt-2">
            每张卡片点开直达工具 · 点击「完整攻略」看使用教程
          </p>
        </div>

        {/* Tool Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((t, idx) => (
            <a
              key={t.name}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-pad flex flex-col gap-3 group hover:border-[#00ff88] transition-all relative overflow-hidden"
            >
              {/* Rank badge */}
              <div className="absolute top-2 right-2 text-xs font-mono text-zinc-600 group-hover:text-[#00ff88] transition-colors">
                #{String(idx + 1).padStart(2, "0")}
              </div>

              {/* Header: emoji + name + badges */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-zinc-800/50 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                  {t.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-zinc-100 truncate">{t.name}</span>
                    {t.must && (
                      <span className="tag-yellow text-[10px] !py-0">必装</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className={`${categoryColor[t.category]} text-[10px] !py-0`}>
                      {categoryIcon[t.category]} {t.category}
                    </span>
                    {t.highlight && (
                      <span className="tag-zinc text-[10px] !py-0">{t.highlight}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-sm text-zinc-400 leading-relaxed">{t.tagline}</p>

              {/* CTA */}
              <div className="mt-auto pt-2 border-t border-bg-border flex items-center justify-between text-xs">
                <span className="text-zinc-500 truncate">{t.url.replace("https://", "")}</span>
                <span className="text-[#00ff88] font-semibold group-hover:translate-x-1 transition-transform">
                  打开 →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 p-6 rounded-2xl border border-[#00ff88]/30 bg-[#00ff88]/5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <div className="font-semibold text-zinc-100 mb-1">
              想看每个工具的撸毛实战教程?
            </div>
            <div className="text-sm text-zinc-400">
              𝕏 @ruoxi01 每天发 1 个工具的"撸毛人用法",带具体操作截图。
            </div>
          </div>
          <a
            href={SITE.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-twitter-outline !border-rose-500/40 !text-rose-400 hover:!bg-rose-500/10"
          >
            <span>查看教程</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
