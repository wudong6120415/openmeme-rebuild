import type { ScamAlert } from "@/data/scams";
import { TwitterButton } from "@/components/TwitterButton";

const levelColor = {
  高: "tag-red",
  中: "tag-yellow",
  低: "tag-zinc",
} as const;

export function ScamAlerts({ scams }: { scams: ScamAlert[] }) {
  return (
    <section id="scam" className="py-16 sm:py-20 border-b border-bg-border">
      <div className="container-narrow">
        <SectionHeader
          emoji="⚠️"
          title="防骗预警"
          subtitle="来自慢雾 / CertiK / @ruoxi01 推特举报 · 实时同步"
        />

        <div className="mt-10 rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] overflow-hidden">
          {scams.map((s, i) => (
            <article
              key={s.title}
              className={`p-5 sm:p-6 flex flex-col sm:flex-row gap-4 ${
                i !== scams.length - 1 ? "border-b border-rose-500/10" : ""
              }`}
            >
              <div className="text-3xl shrink-0">🚨</div>
              <div className="flex-1">
                <div className="flex items-start gap-2 flex-wrap mb-1">
                  <h3 className="font-bold text-zinc-100">{s.title}</h3>
                  <span className={levelColor[s.level]}>风险 {s.level}</span>
                  <span className="tag-zinc">{s.type}</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.detail}</p>
                <div className="text-xs text-zinc-500 mt-2">来源: {s.source}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <TwitterButton
            variant="outline"
            label="订阅防骗推送 · 𝕏 @ruoxi01"
            className="!border-rose-500/40 !text-rose-400 hover:!bg-rose-500/10"
          />
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
