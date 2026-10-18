"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { KOLProject } from "@/data/kol-projects";
import { useI18n } from "@/components/I18nProvider";
import { SITE } from "@/lib/site";

type View = "featured" | "grid" | "table";

const scoreColors = (s: number) => {
  if (s >= 8) return "text-emerald-300 border-emerald-500/40 bg-emerald-500/15";
  if (s >= 6) return "text-amber-300   border-amber-500/40   bg-amber-500/15";
  return "text-zinc-400     border-zinc-500/40    bg-zinc-500/15";
};
const scoreBarColor = (s: number) =>
  s >= 8 ? "bg-emerald-400" : s >= 6 ? "bg-amber-400" : "bg-zinc-500";

const statusStyle: Record<string, string> = {
  live:     "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  upcoming: "bg-amber-500/15 text-amber-300   border-amber-500/40",
  noToken:  "bg-zinc-500/15 text-zinc-400     border-zinc-500/40",
  tbd:      "bg-sky-500/15 text-sky-300        border-sky-500/40",
};

const statusIcon: Record<string, string> = {
  live:     "🟢",
  upcoming: "🟡",
  noToken:  "⚪",
  tbd:      "🔵",
};

function scoreLabelKey(s: number) {
  if (s >= 8) return "card.high";
  if (s >= 6) return "card.mid";
  return "card.low";
}

function ScoreBar({ score }: { score: number }) {
  const filled = Math.max(1, Math.round(score));
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-sm ${
            i < filled ? scoreBarColor(score) : "bg-zinc-800"
          }`}
        />
      ))}
    </div>
  );
}

function tweetIntentUrl(text: string) {
  return `https://x.com/intent/post?text=${encodeURIComponent(text)}`;
}

export function KOLProjects({ projects }: { projects: KOLProject[] }) {
  const { t, lang } = useI18n();
  const [view, setView] = useState<View>("featured");
  const [cat, setCat] = useState<string>("all");
  const [selected, setSelected] = useState<KOLProject | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    [projects],
  );

  const filtered = useMemo(
    () => (cat === "all" ? projects : projects.filter((p) => p.category === cat)),
    [cat, projects],
  );

  const sortedByScore = useMemo(
    () => [...projects].sort((a, b) => b.score - a.score),
    [projects],
  );
  const top3 = sortedByScore.slice(0, 3);

  const stats = {
    total: projects.length,
    high: projects.filter((p) => p.score >= 8).length,
    mid: projects.filter((p) => p.score >= 6 && p.score < 8).length,
    low: projects.filter((p) => p.score < 6).length,
    risky: projects.filter((p) => p.risk).length,
    live: projects.filter((p) => p.tokenStatus === "live").length,
  };

  return (
    <section id="kol" className="py-16 sm:py-20 border-b border-bg-border">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-3xl mb-2">𝕏</div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t("kol.sectionTitle")}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            {t("kol.sectionSubtitle")}
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500">
            <span className="px-2 py-1 rounded bg-bg-card border border-bg-border">
              {stats.total} {t("kol.stats.total")}
            </span>
            <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              {stats.high} {t("kol.stats.high")}
            </span>
            <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
              {stats.mid} {t("kol.stats.mid")}
            </span>
            <span className="px-2 py-1 rounded bg-bg-card border border-bg-border">
              {stats.low} {t("kol.stats.low")}
            </span>
            {stats.risky > 0 && (
              <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30">
                ⚠ {stats.risky} {t("kol.stats.risky")}
              </span>
            )}
            <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              🟢 {stats.live} {t("kol.modal.status.live")}
            </span>
          </div>
        </div>

        {/* View tabs + filter chips */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="inline-flex rounded-lg border border-bg-border bg-bg-card p-1">
              {(["featured", "grid", "table"] as View[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    view === v
                      ? "bg-[#00ff88] text-black"
                      : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {t(`kol.views.${v}`)}
                </button>
              ))}
            </div>
            <div className="text-xs text-zinc-500">
              {t("kol.sortHint")} · 共 {filtered.length}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCat("all")}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                cat === "all"
                  ? "bg-[#00ff88] text-black border-[#00ff88]"
                  : "bg-bg-card text-zinc-400 border-bg-border hover:border-zinc-600 hover:text-zinc-200"
              }`}
            >
              {t("kol.filter.all")} {projects.length}
            </button>
            {categories.map((c) => {
              const count = projects.filter((p) => p.category === c).length;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                    cat === c
                      ? "bg-[#00ff88] text-black border-[#00ff88]"
                      : "bg-bg-card text-zinc-400 border-bg-border hover:border-zinc-600 hover:text-zinc-200"
                  }`}
                >
                  {c} {count}
                </button>
              );
            })}
          </div>
        </div>

        {view === "featured" && <FeaturedView projects={top3} onSelect={setSelected} onTweet={openTweet} />}
        {view === "grid" && <GridView projects={filtered} onSelect={setSelected} onTweet={openTweet} />}
        {view === "table" && <TableView projects={filtered} onSelect={setSelected} onTweet={openTweet} />}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {t("kol.legend.high")}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            {t("kol.legend.mid")}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-500"></span>
            {t("kol.legend.low")}
          </span>
          <span className="flex items-center gap-1.5">
            {t("kol.legend.risky")}
          </span>
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} onTweet={openTweet} />
      )}
    </section>
  );

  function openTweet(p: KOLProject) {
    const text = lang === "en" ? p.tweetTextEn : p.tweetText;
    window.open(tweetIntentUrl(text), "_blank", "noopener,noreferrer");
  }
}

// ── Featured view ──
function FeaturedView({
  projects, onSelect, onTweet,
}: {
  projects: KOLProject[];
  onSelect: (p: KOLProject) => void;
  onTweet: (p: KOLProject) => void;
}) {
  const { t } = useI18n();
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((p, idx) => (
        <div
          key={p.handle}
          className="card card-pad flex flex-col gap-3 group hover:border-[#00ff88] transition-all card-hover relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-mono">#{idx + 1} · 精选 TOP 3</span>
            <span className={`px-2 py-0.5 rounded text-xs font-bold border ${scoreColors(p.score)}`}>
              {p.score}/10 · {t(scoreLabelKey(p.score))}
            </span>
          </div>

          <button
            onClick={() => onSelect(p)}
            className="relative w-full aspect-square rounded-xl overflow-hidden bg-zinc-900 group-hover:scale-[1.01] transition-transform"
          >
            <Image
              src={p.logo}
              alt={p.name}
              width={400}
              height={400}
              className="w-full h-full object-cover"
              unoptimized
            />
            {p.risk && (
              <div className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded bg-rose-500/95 text-white font-bold">
                ⚠
              </div>
            )}
            <div className="absolute top-2 left-2">
              <StatusBadge status={p.tokenStatus} launchDate={p.launchDate} t={t} />
            </div>
          </button>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-zinc-100 text-lg">{p.name}</span>
              <span className="text-xs text-zinc-500 font-mono">@{p.handle}</span>
            </div>
            <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]"></span>
              {p.category}
              {p.token && <span className="ml-2 tag-zinc text-[10px]">${p.token}</span>}
            </div>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed line-clamp-2">{p.tagline}</p>
          {p.highlights && p.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {p.highlights.slice(0, 2).map((h) => (
                <span key={h} className="text-[10px] px-1.5 py-0.5 rounded bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20">
                  {h}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto pt-2 border-t border-bg-border">
            <ScoreBar score={p.score} />
            <div className="flex items-center justify-between mt-2 text-xs">
              <button
                onClick={() => onSelect(p)}
                className="text-zinc-500 hover:text-zinc-200"
              >
                {t("kol.card.details")}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTweet(p);
                }}
                className="text-[#00ff88] font-semibold hover:underline"
              >
                𝕏 {t("kol.card.tweet")}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Grid view ──
function GridView({
  projects, onSelect, onTweet,
}: {
  projects: KOLProject[];
  onSelect: (p: KOLProject) => void;
  onTweet: (p: KOLProject) => void;
}) {
  const { t } = useI18n();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {projects.map((p, idx) => (
        <div
          key={p.handle}
          className="card card-pad flex flex-col gap-2 group hover:border-[#00ff88] transition-all card-hover text-left relative"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-600">#{String(idx + 1).padStart(2, "0")}</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${scoreColors(p.score)}`}>
              {p.score}/10
            </span>
          </div>
          <button
            onClick={() => onSelect(p)}
            className="relative w-full aspect-square rounded-lg overflow-hidden bg-zinc-900"
          >
            <Image
              src={p.logo}
              alt={p.name}
              width={200}
              height={200}
              className="w-full h-full object-cover"
              unoptimized
            />
            {p.risk && (
              <div className="absolute top-1 right-1 text-[9px] px-1 py-0.5 rounded bg-rose-500/95 text-white font-bold">⚠</div>
            )}
            <div className="absolute top-1 left-1">
              <StatusBadge status={p.tokenStatus} launchDate={p.launchDate} t={t} small />
            </div>
          </button>
          <div className="min-h-0">
            <div className="font-bold text-zinc-100 text-sm truncate" title={p.name}>{p.name}</div>
            <div className="text-[10px] text-zinc-500 font-mono truncate">@{p.handle}</div>
          </div>
          <div className="text-[10px] text-zinc-400 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#00ff88]"></span>
            {p.category}
          </div>
          {p.token && (
            <div className="text-[10px] text-zinc-500">
              ${p.token}
            </div>
          )}
          <div className="mt-auto pt-1.5 border-t border-bg-border flex items-center justify-between text-[10px]">
            <button
              onClick={() => onSelect(p)}
              className={p.score >= 7 ? "text-emerald-400" : p.score >= 5 ? "text-amber-400" : "text-zinc-500"}
            >
              {t(scoreLabelKey(p.score))}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onTweet(p); }}
              className="text-zinc-500 hover:text-[#00ff88]"
            >
              𝕏 →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Table view ──
function TableView({
  projects, onSelect, onTweet,
}: {
  projects: KOLProject[];
  onSelect: (p: KOLProject) => void;
  onTweet: (p: KOLProject) => void;
}) {
  const { t } = useI18n();
  return (
    <div className="rounded-xl border border-bg-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-bg-card border-b border-bg-border">
          <tr className="text-left text-xs text-zinc-500">
            <th className="px-3 py-3 w-10">#</th>
            <th className="px-3 py-3">项目</th>
            <th className="px-3 py-3 hidden md:table-cell">类别</th>
            <th className="px-3 py-3 hidden lg:table-cell">代币</th>
            <th className="px-3 py-3 hidden sm:table-cell">发币</th>
            <th className="px-3 py-3">评分</th>
            <th className="px-3 py-3 hidden sm:table-cell">风险</th>
            <th className="px-3 py-3 w-24"></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p, idx) => (
            <tr
              key={p.handle}
              className="border-b border-bg-border last:border-b-0 hover:bg-zinc-900/50 transition-colors"
            >
              <td className="px-3 py-2.5 text-zinc-500 font-mono text-xs align-middle">{idx + 1}</td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onSelect(p)}
                    className="relative w-9 h-9 rounded overflow-hidden bg-zinc-900 shrink-0"
                  >
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </button>
                  <div className="min-w-0">
                    <div className="font-bold text-zinc-100 truncate text-sm">{p.name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono truncate">@{p.handle}</div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-2.5 hidden md:table-cell text-zinc-400 text-xs align-middle">
                <span className="inline-flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#00ff88]"></span>
                  {p.category}
                </span>
              </td>
              <td className="px-3 py-2.5 hidden lg:table-cell text-zinc-400 text-xs font-mono align-middle">
                {p.token ? `$${p.token}` : "—"}
              </td>
              <td className="px-3 py-2.5 hidden sm:table-cell align-middle">
                <StatusBadge status={p.tokenStatus} launchDate={p.launchDate} t={t} small />
              </td>
              <td className="px-3 py-2.5 align-middle">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold border ${scoreColors(p.score)}`}>
                    {p.score}/10
                  </span>
                </div>
              </td>
              <td className="px-3 py-2.5 hidden sm:table-cell align-middle">
                {p.risk ? <span className="text-xs text-rose-400">⚠ 谨慎</span> : <span className="text-xs text-zinc-600">—</span>}
              </td>
              <td className="px-3 py-2.5 text-right align-middle">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); onTweet(p); }}
                    className="text-xs text-zinc-400 hover:text-[#00ff88]"
                    title={t("kol.card.tweet")}
                  >
                    𝕏 {t("kol.card.tweet")}
                  </button>
                  <button
                    onClick={() => onSelect(p)}
                    className="text-xs text-zinc-500 hover:text-zinc-200"
                  >
                    {t("kol.card.details")}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Status badge (发币状态) ──
function StatusBadge({
  status, launchDate, t, small,
}: {
  status: KOLProject["tokenStatus"];
  launchDate?: string;
  t: (k: any) => string;
  small?: boolean;
}) {
  const cls = `inline-flex items-center gap-1 ${small ? "text-[9px] px-1.5 py-0.5" : "text-[10px] px-2 py-0.5"} rounded border ${statusStyle[status]}`;
  return (
    <span className={cls} title={launchDate ?? ""}>
      <span>{statusIcon[status]}</span>
      <span className="font-semibold">{t(`kol.modal.status.${status}`)}</span>
      {launchDate && status !== "noToken" && (
        <span className="opacity-70">· {launchDate}</span>
      )}
    </span>
  );
}

// ── Detail modal ──
function ProjectModal({
  project, onClose, onTweet,
}: {
  project: KOLProject;
  onClose: () => void;
  onTweet: (p: KOLProject) => void;
}) {
  const { t, lang } = useI18n();
  const tweetText = lang === "en" ? project.tweetTextEn : project.tweetText;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-zinc-950 border border-bg-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-sm border-b border-bg-border p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900">
              <Image
                src={project.logo}
                alt={project.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-zinc-100 text-lg">{project.name}</span>
                <StatusBadge status={project.tokenStatus} launchDate={project.launchDate} t={t} />
                {project.risk && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                    ⚠ {t("kol.modal.risk")}
                  </span>
                )}
              </div>
              <div className="text-xs text-zinc-500 font-mono">@{project.handle}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-colors flex items-center justify-center"
            aria-label="close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Top stats */}
          <div className="grid grid-cols-3 gap-3">
            <StatBox label={t("kol.modal.score")} value={`${project.score}/10`} sub={t(scoreLabelKey(project.score))} accent={project.score >= 8 ? "emerald" : project.score >= 6 ? "amber" : "zinc"} />
            <StatBox label={t("kol.modal.fields.chain")} value={project.chain ?? "—"} sub="—" accent="cyan" />
            <StatBox label={t("kol.modal.fields.token")} value={project.token ? `$${project.token}` : "—"} sub={project.listedOn ?? "—"} accent="zinc" />
          </div>

          {/* Big logo preview */}
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-zinc-900 to-black p-6 flex items-center justify-center aspect-[3/1]">
            <Image
              src={project.logo}
              alt={project.name}
              width={200}
              height={200}
              className="h-full w-auto object-contain"
              unoptimized
            />
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">{t("kol.modal.intro")}</h3>
            <p className="text-zinc-200 text-base mb-2 font-medium">{project.tagline}</p>
            <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">{t("kol.modal.highlights")}</h3>
              <div className="flex flex-wrap gap-2">
                {project.highlights.map((h) => (
                  <span key={h} className="px-2.5 py-1 rounded-md bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 text-xs">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Risk */}
          {project.risk && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/[0.05] p-4">
              <div className="text-xs text-rose-300 font-semibold mb-1">⚠ {t("kol.modal.risk")}</div>
              <div className="text-sm text-zinc-300">{project.risk}</div>
            </div>
          )}

          {/* Detail fields */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">{t("kol.modal.data")}</h3>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <DetailRow label={t("kol.modal.fields.chain")} value={project.chain ?? "需查证"} />
              <DetailRow label={t("kol.modal.fields.token")} value={project.token ? `$${project.token}` : "—"} />
              <DetailRow label={t("kol.modal.fields.listed")} value={project.listedOn ?? "—"} />
              <DetailRow label={t("kol.modal.fields.founded")} value={project.founded ?? "需查证"} />
              <DetailRow label={t("kol.modal.fields.funding")} value={project.funding ?? "需查证"} />
              <DetailRow label="发币状态" value={t(`kol.modal.status.${project.tokenStatus}`) + (project.launchDate ? ` · ${project.launchDate}` : "")} />
            </dl>
          </div>

          {/* Tweet preview */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
              𝕏 一键发推内容预览
            </h3>
            <div className="rounded-xl border border-bg-border bg-bg-card p-4 text-sm text-zinc-300 whitespace-pre-wrap font-mono">
              {tweetText}
            </div>
          </div>

          {/* Score */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">{t("kol.modal.score")}</h3>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-[#00ff88]">{project.score}</span>
              <span className="text-zinc-500 text-sm">/ 10</span>
              <div className="flex-1"><ScoreBar score={project.score} /></div>
            </div>
          </div>

          <p className="text-xs text-zinc-500 text-center">
            关注 <a href={SITE.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">@ruoxi01</a> {t("kol.modal.followHint")}
          </p>
        </div>

        {/* Footer CTAs */}
        <div className="sticky bottom-0 bg-zinc-950/95 backdrop-blur-sm border-t border-bg-border p-4 flex gap-3">
          <button
            onClick={() => onTweet(project)}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#00ff88] hover:bg-[#00cc6e] text-black font-bold transition-colors"
          >
            𝕏 一键发推分析 →
          </button>
          <a
            href={project.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/10 font-semibold transition-colors"
          >
            关注 @{project.handle} →
          </a>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-bg-border text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-colors"
          >
            {t("kol.modal.close")}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatBox({
  label, value, sub, accent,
}: { label: string; value: string; sub: string; accent: "emerald" | "amber" | "cyan" | "zinc" }) {
  const colors = {
    emerald: "text-emerald-300",
    amber:   "text-amber-300",
    cyan:    "text-cyan-300",
    zinc:    "text-zinc-300",
  };
  return (
    <div className="rounded-xl border border-bg-border bg-bg-card p-3">
      <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">{label}</div>
      <div className={`font-bold text-sm truncate ${colors[accent]}`}>{value}</div>
      {sub !== "—" && <div className="text-[10px] text-zinc-500 mt-0.5 truncate">{sub}</div>}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-bg-card border border-bg-border px-3 py-2">
      <span className="text-xs text-zinc-500">{label}</span>
      <span className="text-zinc-200 text-xs font-mono truncate max-w-[60%] text-right">{value}</span>
    </div>
  );
}
