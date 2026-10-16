import type { Airdrop } from "@/data/airdrops";
import { TwitterButton } from "@/components/TwitterButton";

const diffColor = {
  简单: "tag-green",
  中等: "tag-yellow",
  困难: "tag-red",
} as const;

export function Airdrops({ airdrops }: { airdrops: Airdrop[] }) {
  return (
    <section id="airdrop" className="py-16 sm:py-20 border-b border-bg-border bg-zinc-950/50">
      <div className="container-narrow">
        <SectionHeader
          emoji="🎁"
          title="今日活跃空投"
          subtitle="5-30 分钟可上手 · 含预计奖励 / 撸毛路径 / 截止日期"
        />

        <div className="grid md:grid-cols-2 gap-4 mt-10">
          {airdrops.map((a) => (
            <article
              key={a.name}
              className="card card-pad flex flex-col gap-3 group hover:border-amber-500/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-zinc-100">{a.name}</span>
                    {a.hot && <span className="tag-red">🔥 HOT</span>}
                  </div>
                  <div className="text-xs text-zinc-500">{a.project}</div>
                </div>
                <span className={diffColor[a.difficulty]}>{a.difficulty}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 my-2">
                <MiniStat label="预计奖励" value={a.reward} accent="amber" />
                <MiniStat label="耗时" value={a.time} />
                <MiniStat label="截止" value={a.deadline} accent="red" />
              </div>

              <p className="text-sm text-zinc-400 line-clamp-2">{a.note}</p>

              <div className="flex gap-2 mt-2">
                {a.link && (
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-md border border-bg-border hover:border-zinc-600 transition-colors"
                  >
                    任务入口 →
                  </a>
                )}
                <a
                  href="https://x.com/ruoxi01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-md border border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/10"
                >
                  撸毛路径 𝕏 →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <TwitterButton variant="outline" label="查看所有空投 · 𝕏 @ruoxi01" />
        </div>
      </div>
    </section>
  );
}

function MiniStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "amber" | "red";
}) {
  const color =
    accent === "amber"
      ? "text-amber-400"
      : accent === "red"
      ? "text-rose-400"
      : "text-zinc-100";
  return (
    <div className="bg-bg-base/50 rounded-lg p-2 text-center">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className={`text-sm font-bold mt-0.5 ${color}`}>{value}</div>
    </div>
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
