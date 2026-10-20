"use client";

import { useState } from "react";
import Image from "next/image";
import { newProjects, type NewProject, type TokenStatus } from "@/data/new-projects";
import { recordTweet } from "@/lib/community";
import { SITE } from "@/lib/site";

const statusMeta: Record<TokenStatus, { label: string; cls: string; icon: string }> = {
  live:     { label: "已发币",   cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40", icon: "🟢" },
  upcoming: { label: "即将发币", cls: "bg-amber-500/15 text-amber-300 border-amber-500/40",     icon: "🟡" },
  tbd:      { label: "发币待定", cls: "bg-sky-500/15 text-sky-300 border-sky-500/40",           icon: "🔵" },
  noToken:  { label: "未发币",   cls: "bg-zinc-500/15 text-zinc-400 border-zinc-500/40",         icon: "⚪" },
};

const catColor: Record<string, string> = {
  "AI": "text-purple-300 border-purple-500/40 bg-purple-500/10",
  "永续 DEX": "text-sky-300 border-sky-500/40 bg-sky-500/10",
  "DEX": "text-emerald-300 border-emerald-500/40 bg-emerald-500/10",
  "DEX / 永续": "text-emerald-300 border-emerald-500/40 bg-emerald-500/10",
  "RWA": "text-amber-300 border-amber-500/40 bg-amber-500/10",
  "LP / DeFi": "text-cyan-300 border-cyan-500/40 bg-cyan-500/10",
  "代币化基金": "text-orange-300 border-orange-500/40 bg-orange-500/10",
  "创作者平台": "text-pink-300 border-pink-500/40 bg-pink-500/10",
};

type View = "featured" | "grid" | "list";

export function NewProjects() {
  const [view, setView] = useState<View>("featured");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [detail, setDetail] = useState<NewProject | null>(null);

  const sorted = [...newProjects].sort((a, b) => b.score - a.score);
  const top1 = sorted[0];
  const rest = sorted.slice(1);

  function tweet(p: NewProject) {
    recordTweet();
    window.open(`https://x.com/intent/post?text=${encodeURIComponent(p.tweetText)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="projects" className="py-16 sm:py-20 border-b border-bg-border">
      <div className="container-narrow">
        {/* header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-3xl mb-2">🆕</div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">新项目推荐</h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            重点关注 · 3 句话看懂 · 不用点开就知道能不能撸
          </p>
        </div>

        {/* view tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex rounded-lg border border-bg-border bg-bg-card p-1">
            {(["featured", "grid", "list"] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  view === v ? "bg-[#00ff88] text-black" : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {v === "featured" ? "⭐ 精选" : v === "grid" ? "▦ 网格" : "☰ 列表"}
              </button>
            ))}
          </div>
          <span className="text-xs text-zinc-500">{newProjects.length} 个项目 · 按评分 ↓</span>
        </div>

        {/* Featured view — hero card */}
        {view === "featured" && (
          <>
            <HeroCard project={top1} onTweet={tweet} onDetail={() => setDetail(top1)} />
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              {rest.slice(0, 2).map((p) => (
                <MediumCard
                  key={p.slug}
                  project={p}
                  onTweet={tweet}
                  onDetail={() => setDetail(p)}
                  expanded={expanded === p.slug}
                  onToggle={() => setExpanded(expanded === p.slug ? null : p.slug)}
                />
              ))}
            </div>
            {rest.length > 2 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {rest.slice(2).map((p) => (
                  <SmallCard key={p.slug} project={p} onTweet={tweet} onDetail={() => setDetail(p)} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Grid view */}
        {view === "grid" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((p) => (
              <MediumCard
                key={p.slug}
                project={p}
                onTweet={tweet}
                onDetail={() => setDetail(p)}
                expanded={expanded === p.slug}
                onToggle={() => setExpanded(expanded === p.slug ? null : p.slug)}
              />
            ))}
          </div>
        )}

        {/* List view */}
        {view === "list" && (
          <div className="rounded-xl border border-bg-border overflow-hidden">
            {sorted.map((p, i) => {
              const st = statusMeta[p.status];
              return (
                <div key={p.slug} className="border-b border-bg-border last:border-b-0 hover:bg-zinc-900/40 transition-colors p-4">
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-mono text-zinc-600 w-5 pt-2">{String(i + 1).padStart(2, "0")}</span>
                    <button onClick={() => setDetail(p)} className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 shrink-0 hover:scale-105 transition-transform">
                      <Image src={p.logo} alt={p.name} width={48} height={48} className="w-full h-full object-cover" unoptimized />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button onClick={() => setDetail(p)} className="font-bold text-zinc-100 hover:text-[#00ff88] transition-colors">{p.name}</button>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] border ${st.cls}`}>{st.icon} {st.label}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] border ${catColor[p.category] ?? "tag-zinc"}`}>{p.category}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{p.tldr[0]}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right hidden sm:block">
                        <div className="text-xl font-extrabold text-[#00ff88]">{p.score}</div>
                        <div className="text-[10px] text-zinc-500">评分</div>
                      </div>
                      <button
                        onClick={() => tweet(p)}
                        className="px-3 py-1.5 rounded-lg bg-bg-card border border-bg-border text-xs text-zinc-300 hover:border-[#00ff88] hover:text-[#00ff88] transition-colors"
                      >
                        𝕏 发推
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl border border-[#00ff88]/30 bg-[#00ff88]/5">
          <div>
            <div className="font-semibold text-zinc-100 mb-0.5">想看下一个新项目？</div>
            <div className="text-sm text-zinc-400">每天早 8 点 / 晚 8 点两次更新</div>
          </div>
          <a href={SITE.twitterUrl} target="_blank" rel="noopener noreferrer" className="btn-twitter shrink-0">
            𝕏 关注 @ruoxi01
          </a>
        </div>
      </div>

      {detail && <ProjectDetail project={detail} onClose={() => setDetail(null)} onTweet={tweet} />}
    </section>
  );
}

// ── Hero card (top 1) ──────────────────────────────
function HeroCard({ project, onTweet, onDetail }: { project: NewProject; onTweet: (p: NewProject) => void; onDetail: () => void }) {
  const st = statusMeta[project.status];
  return (
    <article className="card overflow-hidden hover:border-[#00ff88] transition-all card-hover">
      <div className="grid lg:grid-cols-[1fr_320px]">
        {/* left content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="px-2 py-0.5 rounded-md bg-[#00ff88] text-black text-xs font-bold">TOP 1</span>
            <span className={`px-2 py-0.5 rounded text-xs border ${st.cls}`}>{st.icon} {st.label}{project.launchDate && ` · ${project.launchDate}`}</span>
            <span className={`px-2 py-0.5 rounded text-xs border ${catColor[project.category] ?? "tag-zinc"}`}>{project.category}</span>
            {project.risk && <span className="px-2 py-0.5 rounded text-xs bg-rose-500/15 text-rose-300 border border-rose-500/40">⚠ 需谨慎</span>}
          </div>

          <button onClick={onDetail} className="text-left">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 mb-1 hover:text-[#00ff88] transition-colors">
              {project.name}
            </h3>
            <div className="text-sm text-[#00ff88] font-mono mb-5">${project.symbol} · {project.chain}</div>
          </button>

          {/* TL;DR — the core reading experience */}
          <div className="space-y-2 mb-5">
            <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2">3 句话看懂</div>
            {project.tldr.slice(0, 3).map((line, i) => (
              <div key={i} className="flex gap-2.5 text-sm text-zinc-300 leading-relaxed">
                <span className="text-[#00ff88] font-mono shrink-0">{i + 1}.</span>
                <span>{line}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.highlights.map((h) => (
              <span key={h} className="px-2.5 py-1 rounded-md bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 text-xs">{h}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={onDetail}
              className="px-5 py-2.5 rounded-lg bg-[#00ff88] hover:bg-[#00cc6e] text-black font-bold text-sm transition-colors"
            >
              展开完整分析 →
            </button>
            <button
              onClick={() => onTweet(project)}
              className="px-5 py-2.5 rounded-lg border border-bg-border text-zinc-300 hover:border-[#00ff88] hover:text-[#00ff88] text-sm font-medium transition-colors"
            >
              𝕏 一键发推
            </button>
            <a
              href={project.links[0]?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg border border-bg-border text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 text-sm transition-colors"
            >
              官方 𝕏
            </a>
          </div>
        </div>

        {/* right: logo + score */}
        <div className="relative bg-gradient-to-br from-zinc-900 to-black p-8 flex flex-col items-center justify-center gap-4 border-t lg:border-t-0 lg:border-l border-bg-border">
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden">
            <Image src={project.logo} alt={project.name} width={160} height={160} className="w-full h-full object-cover" unoptimized />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-extrabold text-[#00ff88]">{project.score}</span>
            <span className="text-sm text-zinc-500">/100</span>
          </div>
          <div className="w-full max-w-[200px] space-y-2">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">{m.label}</span>
                <span className="text-zinc-200 font-mono">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

// ── Medium card ────────────────────────────────────
function MediumCard({
  project, onTweet, onDetail, expanded, onToggle,
}: {
  project: NewProject; onTweet: (p: NewProject) => void; onDetail: () => void;
  expanded: boolean; onToggle: () => void;
}) {
  const st = statusMeta[project.status];
  return (
    <article className="card card-pad flex flex-col gap-3 group hover:border-[#00ff88] transition-all card-hover">
      <div className="flex items-start gap-3">
        <button onClick={onDetail} className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-900 shrink-0 group-hover:scale-105 transition-transform">
          <Image src={project.logo} alt={project.name} width={56} height={56} className="w-full h-full object-cover" unoptimized />
        </button>
        <div className="flex-1 min-w-0">
          <button onClick={onDetail} className="font-bold text-zinc-100 hover:text-[#00ff88] transition-colors">{project.name}</button>
          <div className="text-[11px] text-[#00ff88] font-mono">${project.symbol} · {project.chain}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xl font-extrabold text-[#00ff88]">{project.score}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className={`px-1.5 py-0.5 rounded text-[10px] border ${st.cls}`}>{st.icon} {st.label}</span>
        <span className={`px-1.5 py-0.5 rounded text-[10px] border ${catColor[project.category] ?? "tag-zinc"}`}>{project.category}</span>
        {project.risk && <span className="px-1.5 py-0.5 rounded text-[10px] bg-rose-500/15 text-rose-300 border border-rose-500/40">⚠</span>}
      </div>

      {/* TL;DR — always visible, the core reading experience */}
      <ul className="space-y-1.5">
        {project.tldr.slice(0, expanded ? 4 : 2).map((line, i) => (
          <li key={i} className="flex gap-2 text-xs text-zinc-400 leading-relaxed">
            <span className="text-[#00ff88] shrink-0">·</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {expanded && (
        <p className="text-xs text-zinc-500 leading-relaxed pt-2 border-t border-bg-border whitespace-pre-wrap">
          {project.detail}
        </p>
      )}

      <div className="flex gap-2 mt-auto pt-2">
        <button
          onClick={onToggle}
          className="flex-1 py-1.5 rounded-lg text-xs bg-bg-card border border-bg-border text-zinc-300 hover:border-zinc-600 transition-colors"
        >
          {expanded ? "收起 ↑" : `展开全部 (${project.tldr.length - 2} 条)`}
        </button>
        <button
          onClick={onDetail}
          className="px-3 py-1.5 rounded-lg text-xs bg-[#00ff88] text-black font-bold hover:bg-[#00cc6e] transition-colors"
        >
          详情
        </button>
        <button
          onClick={() => onTweet(project)}
          className="px-3 py-1.5 rounded-lg text-xs bg-bg-card border border-bg-border text-zinc-400 hover:border-[#00ff88] hover:text-[#00ff88] transition-colors"
        >
          𝕏
        </button>
      </div>
    </article>
  );
}

// ── Small card ─────────────────────────────────────
function SmallCard({ project, onTweet, onDetail }: { project: NewProject; onTweet: (p: NewProject) => void; onDetail: () => void }) {
  const st = statusMeta[project.status];
  return (
    <article className="card card-pad flex flex-col gap-2.5 group hover:border-[#00ff88] transition-all card-hover">
      <div className="flex items-start justify-between gap-2">
        <button onClick={onDetail} className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 shrink-0">
          <Image src={project.logo} alt={project.name} width={48} height={48} className="w-full h-full object-cover" unoptimized />
        </button>
        <div className="flex items-baseline gap-0.5 shrink-0">
          <span className="text-2xl font-extrabold text-[#00ff88]">{project.score}</span>
        </div>
      </div>
      <button onClick={onDetail} className="font-bold text-zinc-100 text-sm hover:text-[#00ff88] transition-colors text-left">{project.name}</button>
      <div className="text-[10px] text-[#00ff88] font-mono">${project.symbol}</div>
      <div className="flex flex-wrap gap-1">
        <span className={`px-1.5 py-0.5 rounded text-[9px] border ${st.cls}`}>{st.icon} {st.label}</span>
      </div>
      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{project.tldr[0]}</p>
      <div className="flex gap-1.5 mt-auto pt-1.5">
        <button onClick={onDetail} className="flex-1 py-1.5 rounded text-[11px] bg-bg-card border border-bg-border text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 transition-colors">详情</button>
        <button onClick={() => onTweet(project)} className="px-2 py-1.5 rounded text-[11px] bg-bg-card border border-bg-border text-zinc-400 hover:border-[#00ff88] hover:text-[#00ff88] transition-colors">𝕏</button>
      </div>
    </article>
  );
}

// ── Detail modal ───────────────────────────────────
function ProjectDetail({ project, onClose, onTweet }: { project: NewProject; onClose: () => void; onTweet: (p: NewProject) => void }) {
  const st = statusMeta[project.status];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-950 border border-bg-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-sm border-b border-bg-border p-4 flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 shrink-0">
            <Image src={project.logo} alt={project.name} width={48} height={48} className="w-full h-full object-cover" unoptimized />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-zinc-100">{project.name}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] border ${st.cls}`}>{st.icon} {st.label}</span>
            </div>
            <div className="text-xs text-[#00ff88] font-mono">${project.symbol} · {project.chain}</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 flex items-center justify-center shrink-0">✕</button>
        </div>

        <div className="p-5 space-y-5">
          <div className="grid grid-cols-3 gap-2">
            <MetricBox label="综合评分" value={`${project.score}`} accent />
            <MetricBox label="代币状态" value={st.label} />
            <MetricBox label="发币" value={project.launchDate ?? "TBD"} />
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">大白话速览</h3>
            <ul className="space-y-1.5">
              {project.tldr.map((line, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-zinc-300 leading-relaxed">
                  <span className="text-[#00ff88] font-mono shrink-0">{i + 1}.</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">完整分析</h3>
            <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">{project.detail}</p>
          </div>

          {project.risk && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/[0.05] p-4">
              <div className="text-xs text-rose-300 font-semibold mb-1">⚠ 风险提示</div>
              <div className="text-sm text-zinc-300">{project.risk}</div>
            </div>
          )}

          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">关键数据</h3>
            <div className="grid grid-cols-3 gap-2">
              {project.metrics.map((m) => (
                <MetricBox key={m.label} label={m.label} value={m.value} />
              ))}
            </div>
          </div>

          {project.links.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">相关链接</h3>
              <div className="flex flex-wrap gap-2">
                {project.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                     className="px-3 py-1.5 rounded-lg bg-bg-card border border-bg-border text-xs text-zinc-300 hover:border-[#00ff88] hover:text-[#00ff88] transition-colors">
                    {l.label} →
                  </a>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">𝕏 一键发推内容</h3>
            <div className="rounded-xl border border-bg-border bg-bg-card p-3 text-xs text-zinc-400 whitespace-pre-wrap font-mono leading-relaxed">
              {project.tweetText}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-zinc-950/95 backdrop-blur-sm border-t border-bg-border p-4 flex gap-2">
          <button
            onClick={() => onTweet(project)}
            className="flex-1 py-2.5 rounded-xl bg-[#00ff88] hover:bg-[#00cc6e] text-black font-bold text-sm transition-colors"
          >
            𝕏 一键发推分析 →
          </button>
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-bg-border text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-colors">
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}

function MetricBox({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg bg-bg-card border border-bg-border p-2.5 text-center">
      <div className="text-[10px] text-zinc-500">{label}</div>
      <div className={`text-sm font-bold mt-0.5 ${accent ? "text-[#00ff88]" : "text-zinc-200"}`}>{value}</div>
    </div>
  );
}