"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import {
  kols, kolCategories, dimensionMeta, finalScore, sortByDimension,
  getVotes, setVote, getVote,
  type KOL, type KOLDimension,
} from "@/data/kols";
import { recordVisit, recordTweet, recordVote, fmtNum } from "@/lib/community";
import { SITE } from "@/lib/site";

const CAT_COLOR: Record<string, string> = {
  "分析师": "text-emerald-300 border-emerald-500/40 bg-emerald-500/10",
  "撸毛":   "text-sky-300     border-sky-500/40     bg-sky-500/10",
  "Meme":   "text-pink-300    border-pink-500/40    bg-pink-500/10",
  "资讯":   "text-amber-300   border-amber-500/40   bg-amber-500/10",
  "链上数据": "text-purple-300  border-purple-500/40  bg-purple-500/10",
  "宏观":   "text-orange-300  border-orange-500/40  bg-orange-500/10",
};

const MEDALS = ["#ffd700", "#c0c0c0", "#cd7f32"];

export function KOLLeaderboard() {
  const [dim, setDim] = useState<KOLDimension>("overall");
  const [cat, setCat] = useState("全部");
  const [q, setQ] = useState("");
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [detail, setDetail] = useState<KOL | null>(null);

  useEffect(() => {
    recordVisit();
    setVotes(getVotes());
  }, []);

  const filtered = useMemo(() => {
    let list = kols;
    if (cat !== "全部") list = list.filter((k) => k.category === cat);
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      list = list.filter(
        (k) => k.handle.toLowerCase().includes(s) || k.name.toLowerCase().includes(s) || k.bio.includes(s),
      );
    }
    return sortByDimension(list, dim, votes);
  }, [cat, q, dim, votes]);

  const top3 = filtered.slice(0, 3);

  const totalVotes = Object.values(votes).reduce((a, b) => a + Math.max(0, b), 0);

  function doVote(k: KOL, delta: 1 | -1) {
    setVote(k.handle, delta);
    setVotes(getVotes());
    if (delta > 0) recordVote();
  }

  function tweet(k: KOL, rank: number) {
    const text =
      `我在 @ruoxi01 的华语 KOL 榜看到 @${k.handle} 排到第 ${rank} 名 ⭐${finalScore(k, votes[k.handle] ?? 0)}分\n\n` +
      `简介：${k.bio}\n\n` +
      `完整榜单（可投票）→ openmeme.art/#kol\n` +
      `整理：@ruoxi01`;
    recordTweet();
    window.open(`https://x.com/intent/post?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  function downloadBoard() {
    recordTweet();
    const a = document.createElement("a");
    a.href = "/share/leaderboard-top10.png";
    a.download = `openmeme-kol-top10-${new Date().toISOString().slice(0, 10)}.png`;
    a.click();
  }

  function downloadCard(k: KOL, rank: number) {
    const a = document.createElement("a");
    a.href = `/share/kol-${k.handle}.png`;
    a.download = `openmeme-kol-${k.handle}-${rank}.png`;
    a.click();
  }

  return (
    <section id="kol" className="py-16 sm:py-20 border-b border-bg-border">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-3xl mb-2">🏆</div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            币圈华语区 KOL 排行榜
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            24 位活跃华语 KOL · 5 个维度评分 · 社区投票实时调整排名
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-bg-card border border-bg-border">
              {kols.length} 位 KOL
            </span>
            <span className="px-2 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">
              {totalVotes} 次投票
            </span>
            <span className="px-2 py-1 rounded bg-bg-card border border-bg-border">
              {kolCategories.length} 个领域
            </span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Dimension tabs */}
            <div className="inline-flex rounded-lg border border-bg-border bg-bg-card p-1 overflow-x-auto">
              {(Object.keys(dimensionMeta) as KOLDimension[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDim(d)}
                  title={dimensionMeta[d].desc.zh}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    dim === d ? "bg-[#00ff88] text-black" : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {dimensionMeta[d].icon} {dimensionMeta[d].zh}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="搜索 KOL 名字 / handle / 简介…"
                className="w-full bg-bg-card border border-bg-border rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#00ff88] transition-colors"
              />
              {q && (
                <button
                  onClick={() => setQ("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {["全部", ...kolCategories].map((c) => {
              const n = c === "全部" ? kols.length : kols.filter((k) => k.category === c).length;
              if (n === 0) return null;
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
                  {c} {n}
                </button>
              );
            })}
          </div>

          {/* Actions row */}
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>
              {dim !== "overall" && <span className="text-[#00ff88]">按「{dimensionMeta[dim].zh}」排序 · </span>}
              {dimensionMeta[dim].desc.zh}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const first = filtered[0];
                  if (!first) return;
                  recordTweet();
                  const txt = `华语 KOL 榜第一名：@${first.handle} (${finalScore(first, votes[first.handle] ?? 0)}分)\n\n${first.bio}\n\n完整榜单 → openmeme.art/#kol\n整理：@ruoxi01`;
                  window.open(`https://x.com/intent/post?text=${encodeURIComponent(txt)}`, "_blank", "noopener,noreferrer");
                }}
                className="px-3 py-1.5 rounded-lg bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 hover:bg-[#00ff88]/20 transition-colors font-medium"
              >
                𝕏 一键发推榜首
              </button>
              <button
                onClick={downloadBoard}
                className="px-3 py-1.5 rounded-lg bg-bg-card border border-bg-border hover:border-zinc-600 hover:text-zinc-200 transition-colors"
              >
                📥 下载榜单图
              </button>
            </div>
          </div>
        </div>

        {/* Podium (Top 3) */}
        {top3.length === 3 && !q && cat === "全部" && (
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[1, 0, 2].map((idx) => {
              const k = top3[idx];
              const rank = idx + 1;
              const medal = MEDALS[idx];
              const fs = finalScore(k, votes[k.handle] ?? 0);
              const v = getVote(k.handle);
              return (
                <div
                  key={k.handle}
                  className={`card card-pad flex flex-col items-center text-center gap-3 relative overflow-hidden card-hover ${
                    rank === 1 ? "sm:-translate-y-2 sm:border-yellow-500/40" : ""
                  }`}
                  style={rank === 1 ? { boxShadow: "0 0 30px -10px #ffd70055" } : undefined}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: medal }}
                  />
                  <div
                    className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-xs"
                    style={{ background: medal, color: "#0a0a0a" }}
                  >
                    {rank}
                  </div>
                  <button onClick={() => setDetail(k)} className="relative">
                    <div
                      className="w-20 h-20 rounded-full overflow-hidden ring-2 transition-transform hover:scale-105"
                      style={{ boxShadow: `0 0 0 2px ${medal}` }}
                    >
                      <Image src={k.avatar} alt={k.name} width={80} height={80} className="w-full h-full object-cover" unoptimized />
                    </div>
                  </button>
                  <div>
                    <div className="font-bold text-zinc-100">{k.name}</div>
                    <div className="text-xs text-[#00ff88] font-mono">@{k.handle}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] border ${CAT_COLOR[k.category]}`}>
                    {k.category}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-[#00ff88]">{fs}</span>
                    <span className="text-xs text-zinc-500">/100</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{k.bio}</p>
                  <div className="flex gap-2 w-full mt-auto pt-2">
                    <button
                      onClick={() => doVote(k, 1)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                        v > 0
                          ? "bg-[#00ff88] text-black border-[#00ff88]"
                          : "bg-bg-card border-bg-border text-zinc-400 hover:border-[#00ff88]"
                      }`}
                    >
                      ▲ {v > 0 ? v : "投票"}
                    </button>
                    <button
                      onClick={() => tweet(k, rank)}
                      className="flex-1 py-1.5 rounded-lg text-xs font-medium bg-bg-card border border-bg-border text-zinc-300 hover:border-[#00ff88] hover:text-[#00ff88] transition-colors"
                    >
                      𝕏 发推
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16 border border-dashed border-bg-border rounded-2xl">
            <div className="text-4xl mb-3">🔍</div>
            <div className="text-zinc-400 mb-1">没有找到匹配的 KOL</div>
            <div className="text-sm text-zinc-600">试试换个关键词或清空筛选</div>
            <button
              onClick={() => { setQ(""); setCat("全部"); }}
              className="mt-4 px-4 py-2 rounded-lg bg-bg-card border border-bg-border text-sm text-zinc-300 hover:border-zinc-600"
            >
              重置筛选
            </button>
          </div>
        )}

        {/* Table */}
        {filtered.length > 0 && (
          <div className="rounded-xl border border-bg-border overflow-hidden">
            {/* table header */}
            <div className="hidden lg:grid grid-cols-[56px_1fr_140px_88px_88px_88px_180px] gap-3 px-4 py-3 bg-bg-card border-b border-bg-border text-xs text-zinc-500 font-medium">
              <div>排名</div>
              <div>KOL</div>
              <div>领域 / 标签</div>
              <div className="text-right">影响力</div>
              <div className="text-right">准确率</div>
              <div className="text-right">活跃度</div>
              <div className="text-right">操作</div>
            </div>

            {/* rows */}
            {filtered.map((k, i) => {
              const v = getVote(k.handle);
              const fs = finalScore(k, votes[k.handle] ?? 0);
              const baseRank = kols.findIndex((x) => x.handle === k.handle) + 1;
              const moved = fs - k.scores.overall;
              return (
                <div
                  key={k.handle}
                  className="grid grid-cols-1 lg:grid-cols-[56px_1fr_140px_88px_88px_88px_180px] gap-3 px-4 py-3 border-b border-bg-border last:border-b-0 hover:bg-zinc-900/40 transition-colors items-center"
                >
                  {/* rank */}
                  <div className="flex items-center gap-1.5">
                    <span className={`text-sm font-bold font-mono ${i < 3 ? "text-[#00ff88]" : "text-zinc-500"}`}>
                      {i + 1}
                    </span>
                    {votes[k.handle] !== undefined && votes[k.handle] > 0 && (
                      <span className="text-[9px] text-[#00ff88]">↑{votes[k.handle]}</span>
                    )}
                  </div>

                  {/* kol */}
                  <div className="flex items-center gap-3 min-w-0">
                    <button onClick={() => setDetail(k)} className="shrink-0">
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-bg-border hover:ring-[#00ff88] transition-all">
                        <Image src={k.avatar} alt={k.name} width={40} height={40} className="w-full h-full object-cover" unoptimized />
                      </div>
                    </button>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => setDetail(k)} className="font-bold text-zinc-100 text-sm truncate hover:text-[#00ff88] transition-colors">
                          {k.name}
                        </button>
                        {k.verified && <span className="text-[9px] text-sky-400">✓</span>}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono truncate">@{k.handle}</div>
                    </div>
                  </div>

                  {/* category / tags */}
                  <div className="hidden lg:block">
                    <span className={`px-2 py-0.5 rounded text-[10px] border ${CAT_COLOR[k.category]}`}>
                      {k.category}
                    </span>
                  </div>

                  {/* dims (mobile shows inline) */}
                  <div className="hidden lg:block text-right text-xs font-mono text-zinc-400">
                    {k.scores.influence}
                  </div>
                  <div className="hidden lg:block text-right text-xs font-mono text-zinc-400">
                    {k.scores.accuracy}
                  </div>
                  <div className="hidden lg:block text-right text-xs font-mono text-zinc-400">
                    {k.scores.activity}
                  </div>

                  {/* actions */}
                  <div className="flex items-center gap-1.5 justify-end">
                    <button
                      onClick={() => doVote(k, 1)}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-colors ${
                        v > 0
                          ? "bg-[#00ff88] text-black border-[#00ff88]"
                          : "bg-bg-card border-bg-border text-zinc-400 hover:border-[#00ff88] hover:text-[#00ff88]"
                      }`}
                      title={`为 @${k.handle} 投票`}
                    >
                      ▲{v > 0 ? v : ""}
                    </button>
                    <button
                      onClick={() => downloadCard(k, i + 1)}
                      className="px-2 py-1 rounded text-[11px] bg-bg-card border border-bg-border text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 transition-colors"
                      title="下载该 KOL 分享卡"
                    >
                      📷
                    </button>
                    <button
                      onClick={() => tweet(k, i + 1)}
                      className="px-2 py-1 rounded text-[11px] bg-bg-card border border-bg-border text-zinc-400 hover:border-[#00ff88] hover:text-[#00ff88] transition-colors"
                      title="一键发推"
                    >
                      𝕏
                    </button>
                  </div>

                  {/* mobile meta */}
                  <div className="lg:hidden flex items-center gap-2 flex-wrap text-[10px] text-zinc-500">
                    <span className={`px-1.5 py-0.5 rounded border ${CAT_COLOR[k.category]}`}>{k.category}</span>
                    <span>影 {k.scores.influence}</span>
                    <span>准 {k.scores.accuracy}</span>
                    <span>活 {k.scores.activity}</span>
                    <span>涨 {k.scores.rising}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer note */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-[#00ff88]/30 bg-[#00ff88]/5">
          <div className="text-center sm:text-left">
            <div className="text-sm font-semibold text-zinc-100 mb-0.5">觉得榜单缺了谁？</div>
            <div className="text-xs text-zinc-400">
              推特私信 @ruoxi01 推荐 KOL · 你的投票会直接影响排名
            </div>
          </div>
          <a
            href={SITE.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-twitter !py-2 !px-4 !text-sm shrink-0"
          >
            𝕏 关注 @ruoxi01
          </a>
        </div>
      </div>

      {/* Detail modal */}
      {detail && (
        <KOLDetail
          kol={detail}
          rank={filtered.findIndex((x) => x.handle === detail.handle) + 1}
          onClose={() => setDetail(null)}
          onVote={() => { doVote(detail, 1); setVotes(getVotes()); }}
          onTweet={() => tweet(detail, filtered.findIndex((x) => x.handle === detail.handle) + 1)}
          onDownload={() => downloadCard(detail, filtered.findIndex((x) => x.handle === detail.handle) + 1)}
        />
      )}
    </section>
  );
}

// ── Detail modal ──────────────────────────────────
function KOLDetail({
  kol, rank, onClose, onVote, onTweet, onDownload,
}: {
  kol: KOL; rank: number;
  onClose: () => void; onVote: () => void; onTweet: () => void; onDownload: () => void;
}) {
  const v = getVote(kol.handle);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-zinc-950 border border-bg-border rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-sm border-b border-bg-border p-5 flex items-start gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#00ff88]/40 shrink-0">
            <Image src={kol.avatar} alt={kol.name} width={64} height={64} className="w-full h-full object-cover" unoptimized />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-zinc-100 text-xl">{kol.name}</span>
              {kol.verified && <span className="text-xs text-sky-400">✓ 已认证</span>}
              <span className={`px-2 py-0.5 rounded text-[10px] border ${CAT_COLOR[kol.category]}`}>{kol.category}</span>
            </div>
            <div className="text-sm text-[#00ff88] font-mono">@{kol.handle}</div>
            {kol.joined && <div className="text-[11px] text-zinc-500 mt-0.5">2017 年起 · 入行 {kol.joined}</div>}
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 flex items-center justify-center shrink-0">✕</button>
        </div>

        <div className="p-5 space-y-5">
          {/* rank + score */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-bg-card border border-bg-border">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">当前排名</div>
              <div className="text-2xl font-extrabold text-[#00ff88]">#{rank}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">综合评分</div>
              <div className="text-2xl font-extrabold text-zinc-100">
                {finalScore(kol, v)}<span className="text-sm text-zinc-500">/100</span>
              </div>
            </div>
          </div>

          {/* bio */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">简介</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">{kol.bio}</p>
          </div>

          {/* 5 dimensions */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-3">五维评分</h3>
            <div className="space-y-2">
              {(Object.keys(dimensionMeta) as KOLDimension[]).map((d) => {
                const val = kol.scores[d];
                const isOverall = d === "overall";
                return (
                  <div key={d}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className={isOverall ? "text-[#00ff88] font-semibold" : "text-zinc-400"}>
                        {dimensionMeta[d].icon} {dimensionMeta[d].zh}
                      </span>
                      <span className={`font-mono ${isOverall ? "text-[#00ff88] font-bold" : "text-zinc-400"}`}>{val}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${val >= 85 ? "bg-emerald-400" : val >= 70 ? "bg-amber-400" : "bg-zinc-500"}`}
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* stats */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">公开数据</h3>
            <div className="grid grid-cols-3 gap-2">
              <MetricBox label="喊单数" value={kol.calls !== null ? String(kol.calls) : "需查证"} />
              <MetricBox label="准确率" value={kol.hitRate !== null ? `${kol.hitRate}%` : "需查证"} accent={kol.hitRate !== null && kol.hitRate >= 75} />
              <MetricBox label="周更" value={kol.tweetsPerWeek !== null ? `${kol.tweetsPerWeek} 条` : "需查证"} />
            </div>
          </div>

          {/* tags */}
          {kol.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {kol.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[11px]">#{t}</span>
              ))}
            </div>
          )}

          {/* tweet preview */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">𝕏 一键发推内容</h3>
            <div className="rounded-xl border border-bg-border bg-bg-card p-3 text-xs text-zinc-400 whitespace-pre-wrap font-mono leading-relaxed">
{`我在 @ruoxi01 的华语 KOL 榜看到 @${kol.handle} 排到第 ${rank} 名 ⭐${finalScore(kol, v)}分

简介：${kol.bio}

完整榜单（可投票）→ openmeme.art/#kol
整理：@ruoxi01`}
            </div>
          </div>
        </div>

        {/* footer actions */}
        <div className="sticky bottom-0 bg-zinc-950/95 backdrop-blur-sm border-t border-bg-border p-4 flex gap-2">
          <button
            onClick={onVote}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-colors shrink-0 ${
              v > 0 ? "bg-[#00ff88] text-black" : "bg-bg-card border border-bg-border text-zinc-300 hover:border-[#00ff88]"
            }`}
          >
            ▲ {v > 0 ? v : "投票"}
          </button>
          <button
            onClick={onTweet}
            className="flex-1 py-2.5 rounded-xl bg-[#00ff88] hover:bg-[#00cc6e] text-black font-bold text-sm transition-colors"
          >
            𝕏 一键发推 →
          </button>
          <button
            onClick={onDownload}
            className="px-3 py-2.5 rounded-xl border border-bg-border text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-colors shrink-0"
            title="下载分享卡"
          >
            📥
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
      <div className={`text-sm font-bold mt-0.5 ${accent ? "text-emerald-300" : value === "需查证" ? "text-zinc-500" : "text-zinc-200"}`}>
        {value}
      </div>
    </div>
  );
}