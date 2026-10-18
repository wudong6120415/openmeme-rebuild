"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { KOLProject } from "@/data/kol-projects";

type View = "featured" | "grid" | "table";

function scoreBadge(score: number) {
  if (score >= 8) return "text-emerald-300 border-emerald-500/40 bg-emerald-500/15";
  if (score >= 6) return "text-amber-300   border-amber-500/40   bg-amber-500/15";
  return "text-zinc-400     border-zinc-500/40    bg-zinc-500/15";
}
function scoreLabel(score: number) {
  if (score >= 8) return "高分";
  if (score >= 6) return "中等";
  return "观察";
}
function scoreBar(score: number) {
  // 10 segments
  const filled = Math.max(1, Math.round(score));
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-sm ${
            i < filled
              ? score >= 8 ? "bg-emerald-400" : score >= 6 ? "bg-amber-400" : "bg-zinc-500"
              : "bg-zinc-800"
          }`}
        />
      ))}
    </div>
  );
}

export function KOLProjects({ projects }: { projects: KOLProject[] }) {
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
  };

  return (
    <section id="kol" className="py-16 sm:py-20 border-b border-bg-border">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-3xl mb-2">𝕏</div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            KOL 推荐 · {projects.length} 个推特项目
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            @ruoxi01 关注的项目 · 参与度评分 1-10 · 公开信息 + 链上数据
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500">
            <span className="px-2 py-1 rounded bg-bg-card border border-bg-border">
              {stats.total} 个项目
            </span>
            <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              {stats.high} 个高分
            </span>
            <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
              {stats.mid} 个中等
            </span>
            <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-bg-border">
              {stats.low} 个观察
            </span>
            {stats.risky > 0 && (
              <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30">
                ⚠ {stats.risky} 个需谨慎
              </span>
            )}
          </div>
        </div>

        {/* View tabs + filter chips */}
        <div className="flex flex-col gap-3 mb-8">
          {/* View tabs */}
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
                  {v === "featured" ? "⭐ 精选" : v === "grid" ? "▦ 网格" : "☰ 列表"}
                </button>
              ))}
            </div>
            <div className="text-xs text-zinc-500">
              共 {filtered.length} 项 · 排序：评分 ↓
            </div>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            <CategoryChip active={cat === "all"} onClick={() => setCat("all")} label={`全部 ${projects.length}`} />
            {categories.map((c) => {
              const count = projects.filter((p) => p.category === c).length;
              return (
                <CategoryChip
                  key={c}
                  active={cat === c}
                  onClick={() => setCat(c)}
                  label={`${c} ${count}`}
                />
              );
            })}
          </div>
        </div>

        {/* View: Featured */}
        {view === "featured" && (
          <FeaturedView projects={top3} onSelect={setSelected} />
        )}

        {/* View: Grid */}
        {view === "grid" && (
          <GridView projects={filtered} onSelect={setSelected} />
        )}

        {/* View: Table */}
        {view === "table" && (
          <TableView projects={filtered} onSelect={setSelected} />
        )}

        {/* Footer legend */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>高分 8-10
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>中等 6-7
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-500"></span>观察 1-5
          </span>
          <span className="flex items-center gap-1.5">⚠ 标 = 需谨慎</span>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

// ────────── subcomponents ──────────

function CategoryChip({
  active, onClick, label,
}: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
        active
          ? "bg-[#00ff88] text-black border-[#00ff88]"
          : "bg-bg-card text-zinc-400 border-bg-border hover:border-zinc-600 hover:text-zinc-200"
      }`}
    >
      {label}
    </button>
  );
}

// ── Featured view: 3 large hero cards ──
function FeaturedView({
  projects, onSelect,
}: { projects: KOLProject[]; onSelect: (p: KOLProject) => void }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((p, idx) => (
        <button
          key={p.handle}
          onClick={() => onSelect(p)}
          className="card card-pad text-left flex flex-col gap-3 group hover:border-[#00ff88] transition-all relative overflow-hidden"
        >
          {/* crown badge */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-mono">#{idx + 1} · 精选 TOP 3</span>
            <span className={`px-2 py-0.5 rounded text-xs font-bold border ${scoreBadge(p.score)}`}>
              {p.score}/10 · {scoreLabel(p.score)}
            </span>
          </div>
          {/* big logo */}
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-zinc-900 group-hover:scale-[1.01] transition-transform">
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
          </div>
          {/* info */}
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
          <p className="text-sm text-zinc-300 leading-relaxed">{p.tagline}</p>
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
            {scoreBar(p.score)}
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-zinc-500">点击查看详情 →</span>
              <span className="text-[#00ff88] font-semibold">𝕏 →</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ── Grid view: 5x3 dense cards ──
function GridView({
  projects, onSelect,
}: { projects: KOLProject[]; onSelect: (p: KOLProject) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {projects.map((p, idx) => (
        <button
          key={p.handle}
          onClick={() => onSelect(p)}
          className="card card-pad flex flex-col gap-2 group hover:border-[#00ff88] transition-all text-left relative"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-600">#{String(idx + 1).padStart(2, "0")}</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${scoreBadge(p.score)}`}>
              {p.score}/10
            </span>
          </div>
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-zinc-900">
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
          </div>
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
              Token: <span className="text-zinc-300 font-mono">${p.token}</span>
            </div>
          )}
          <div className="mt-auto pt-1.5 border-t border-bg-border flex items-center justify-between text-[10px]">
            <span className={p.score >= 7 ? "text-emerald-400" : p.score >= 5 ? "text-amber-400" : "text-zinc-500"}>
              {scoreLabel(p.score)}
            </span>
            <span className="text-zinc-500">详情 →</span>
          </div>
        </button>
      ))}
    </div>
  );
}

// ── Table view: sortable rows ──
function TableView({
  projects, onSelect,
}: { projects: KOLProject[]; onSelect: (p: KOLProject) => void }) {
  return (
    <div className="rounded-xl border border-bg-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-bg-card border-b border-bg-border">
          <tr className="text-left text-xs text-zinc-500">
            <th className="px-3 py-3 w-10">#</th>
            <th className="px-3 py-3">项目</th>
            <th className="px-3 py-3 hidden md:table-cell">类别</th>
            <th className="px-3 py-3 hidden lg:table-cell">代币</th>
            <th className="px-3 py-3">评分</th>
            <th className="px-3 py-3 hidden sm:table-cell">风险</th>
            <th className="px-3 py-3 w-16"></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p, idx) => (
            <tr
              key={p.handle}
              onClick={() => onSelect(p)}
              className="border-b border-bg-border last:border-b-0 hover:bg-zinc-900/50 cursor-pointer transition-colors"
            >
              <td className="px-3 py-2.5 text-zinc-500 font-mono text-xs">{idx + 1}</td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded overflow-hidden bg-zinc-900 shrink-0">
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-zinc-100 truncate text-sm">{p.name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono truncate">@{p.handle}</div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-2.5 hidden md:table-cell text-zinc-400 text-xs">
                <span className="inline-flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#00ff88]"></span>
                  {p.category}
                </span>
              </td>
              <td className="px-3 py-2.5 hidden lg:table-cell text-zinc-400 text-xs font-mono">
                {p.token ? `$${p.token}` : "—"}
              </td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold border ${scoreBadge(p.score)}`}>
                    {p.score}/10
                  </span>
                  <span className="hidden sm:inline text-zinc-500 text-[10px] w-24">
                    {scoreBar(p.score)}
                  </span>
                </div>
              </td>
              <td className="px-3 py-2.5 hidden sm:table-cell">
                {p.risk ? (
                  <span className="text-xs text-rose-400">⚠ 谨慎</span>
                ) : (
                  <span className="text-xs text-zinc-600">—</span>
                )}
              </td>
              <td className="px-3 py-2.5 text-right text-xs text-zinc-500">
                详情 →
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Detail modal ──
function ProjectModal({
  project, onClose,
}: { project: KOLProject; onClose: () => void }) {
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
        <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-sm border-b border-bg-border p-4 flex items-center justify-between">
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
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-100 text-lg">{project.name}</span>
                {project.risk && (
                  <span className="text-xs px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                    ⚠ 需谨慎
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
          {/* Top row: score + category + bar */}
          <div className="grid grid-cols-3 gap-3">
            <StatBox label="评分" value={`${project.score}/10`} sub={scoreLabel(project.score)} accent={project.score >= 8 ? "emerald" : project.score >= 6 ? "amber" : "zinc"} />
            <StatBox label="类别" value={project.category} sub="—" accent="cyan" />
            <StatBox label="代币" value={project.token ? `$${project.token}` : "—"} sub={project.chain ?? "—"} accent="zinc" />
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

          {/* Tagline + description */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">简介</h3>
            <p className="text-zinc-200 text-base mb-2">{project.tagline}</p>
            <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">关键亮点</h3>
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
              <div className="text-xs text-rose-300 font-semibold mb-1">⚠ 风险提示</div>
              <div className="text-sm text-zinc-300">{project.risk}</div>
            </div>
          )}

          {/* Detail fields */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">项目数据</h3>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <DetailRow label="所在链" value={project.chain ?? "需查证"} />
              <DetailRow label="代币符号" value={project.token ? `$${project.token}` : "—"} />
              <DetailRow label="上市平台" value={project.listedOn ?? "—"} />
              <DetailRow label="创立时间" value={project.founded ?? "需查证"} />
              <DetailRow label="融资情况" value={project.funding ?? "需查证"} />
              <DetailRow label="Twitter 评分" value={`${project.score}/10`} />
            </dl>
          </div>

          {/* Score bar */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">参与度评分</h3>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold text-[#00ff88]">{project.score}</span>
              <span className="text-zinc-500 text-sm">/ 10</span>
              <div className="flex-1">{scoreBar(project.score)}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-zinc-950/95 backdrop-blur-sm border-t border-bg-border p-4 flex gap-3">
          <a
            href={project.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#00ff88] hover:bg-[#00cc6e] text-black font-bold transition-colors"
          >
            𝕏 在推特上关注 @{project.handle} →
          </a>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-bg-border text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-colors"
          >
            关闭
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
