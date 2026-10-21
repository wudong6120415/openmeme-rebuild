"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import {
  kols, kolCategories, dimensionMeta, finalScore, sortByDimension,
  getVotes, setVote, getVote,
  type KOL, type KOLDimension,
} from "@/data/kols";
import { recordVisit, recordTweet, recordVote } from "@/lib/community";
import { SITE } from "@/lib/site";

/* ── 类别配色 ──────────────────────────────── */
const CAT: Record<string, { text: string; border: string; bg: string; dot: string }> = {
  中文资讯:  { text: "text-amber-300",  border: "border-amber-500/40",  bg: "bg-amber-500/10",   dot: "bg-amber-400" },
  链上数据:  { text: "text-purple-300", border: "border-purple-500/40", bg: "bg-purple-500/10",  dot: "bg-purple-400" },
  交易所官方:{ text: "text-emerald-300", border: "border-emerald-500/40",bg: "bg-emerald-500/10",  dot: "bg-emerald-400" },
  撸毛:      { text: "text-sky-300",     border: "border-sky-500/40",    bg: "bg-sky-500/10",     dot: "bg-sky-400" },
  Meme:      { text: "text-pink-300",    border: "border-pink-500/40",   bg: "bg-pink-500/10",    dot: "bg-pink-400" },
};

const MEDAL = ["#ffd700", "#d4d4d8", "#cd7f32"];

/* ── 粉丝量级色阶 ────────────────────────────── */
function followerTier(n: number | null) {
  if (n === null) return { label: "需查证", cls: "text-zinc-500", bar: "bg-zinc-700" };
  if (n >= 5_000_000) return { label: "500万+", cls: "text-amber-300", bar: "bg-amber-400" };
  if (n >= 1_000_000) return { label: "100万+", cls: "text-amber-300", bar: "bg-amber-400" };
  if (n >= 300_000)   return { label: "30万+",  cls: "text-sky-300",   bar: "bg-sky-400" };
  if (n >= 100_000)   return { label: "10万+",  cls: "text-sky-300",   bar: "bg-sky-400" };
  if (n >= 30_000)    return { label: "3万+",   cls: "text-emerald-300",bar: "bg-emerald-400" };
  return { label: "3万以下", cls: "text-zinc-400", bar: "bg-zinc-600" };
}

/* ── 逐 KOL 主题色（handle hash 派生，与头像一致） ── */
function kolAccent(handle: string): { a: string; b: string } {
  let h = 0;
  for (let i = 0; i < handle.length; i++) h = (h * 31 + handle.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  const hue2 = (hue + 40) % 360;
  return { a: `hsl(${hue} 80% 58%)`, b: `hsl(${hue2} 75% 45%)` };
}

/* ── 主组件 ─────────────────────────────────── */
export function KOLLeaderboard() {
  const [dim, setDim] = useState<KOLDimension>("overall");
  const [cat, setCat] = useState("全部");
  const [q, setQ] = useState("");
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [detail, setDetail] = useState<KOL | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

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
        (k) =>
          k.handle.toLowerCase().includes(s) ||
          k.name.toLowerCase().includes(s) ||
          k.bio.includes(s) ||
          k.tags.some((t) => t.toLowerCase().includes(s)),
      );
    }
    return sortByDimension(list, dim, votes);
  }, [cat, q, dim, votes]);

  const top3 = filtered.slice(0, 3);
  const totalVotes = Object.values(votes).reduce((a, b) => a + Math.max(0, b), 0);
  const blueCount = kols.filter((k) => k.blue_verified).length;

  function doVote(k: KOL) {
    const cur = getVote(k.handle);
    setVote(k.handle, cur > 0 ? -1 : 1);
    setVotes(getVotes());
    if (cur <= 0) recordVote();
    setFlash(k.handle);
    setTimeout(() => setFlash(null), 700);
  }

  function tweet(k: KOL, rank: number) {
    const sc = finalScore(k, votes[k.handle] ?? 0);
    const text =
      `我在 @ruoxi01 的华语 KOL 榜看到 @${k.handle} 排到第 ${rank} 名 ⭐${sc}分\n\n` +
      `简介：${k.bio}\n\n` +
      `完整榜单（可投票）→ openmeme.art/#kol\n整理：@ruoxi01`;
    recordTweet();
    window.open(`https://x.com/intent/post?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  function dl(handle: string, rank: number) {
    const a = document.createElement("a");
    a.href = `/share/kol-${handle}.png`;
    a.download = `openmeme-kol-${handle}-no${rank}.png`;
    a.click();
  }

  function dlBoard() {
    recordTweet();
    const a = document.createElement("a");
    a.href = "/share/leaderboard-top10.png";
    a.download = `openmeme-kol-top10-${new Date().toISOString().slice(0, 10)}.png`;
    a.click();
  }

  return (
    <section id="kol" className="relative border-b border-bg-border overflow-hidden">
      {/* hero 背景图 */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/kol/kol-hero.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-[0.16]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base/50 via-bg-base/85 to-bg-base" />
      </div>

      <div className="container-narrow relative py-16 sm:py-20">
        {/* ── 标题 ── */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs text-amber-300">
            🏆 2026 华语 KOL 生态图鉴
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
            币圈华语区
            <span className="gradient-text"> KOL 排行榜</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
            {kols.length} 位活跃 KOL · 5 维度评分 · 社区投票实时调整排名
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
            <StatPill label="收录 KOL" value={String(kols.length)} color="#00ff88" />
            <StatPill label="蓝V认证" value={String(blueCount)} color="#38bdf8" />
            <StatPill label="覆盖领域" value={String(kolCategories.length)} color="#a855f7" />
            <StatPill label="累计投票" value={String(totalVotes)} color="#fbbf24" />
          </div>
        </div>

        {/* ── 工具栏 ── */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            <div className="inline-flex rounded-xl border border-bg-border bg-bg-card/80 backdrop-blur p-1 overflow-x-auto flex-shrink-0">
              {(Object.keys(dimensionMeta) as KOLDimension[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDim(d)}
                  title={dimensionMeta[d].desc.zh}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                    dim === d
                      ? "bg-gradient-to-r from-[#00ff88] to-emerald-400 text-black shadow-[0_0_16px_-4px_#00ff88]"
                      : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {dimensionMeta[d].icon} {dimensionMeta[d].zh}
                </button>
              ))}
            </div>

            <div className="relative flex-1 min-w-0">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">🔍</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="搜索 KOL 名字 / handle / 标签（如 CZ、看多、Benson…）"
                className="w-full bg-bg-card/80 backdrop-blur border border-bg-border rounded-xl pl-9 pr-9 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#00ff88] focus:ring-1 focus:ring-[#00ff88]/40 transition-all"
              />
              {q && (
                <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-rose-400 transition-colors">
                  ✕
                </button>
              )}
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => { const f = filtered[0]; if (f) tweet(f, 1); }}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#00ff88] to-emerald-400 text-black hover:brightness-110 transition-all"
              >
                𝕏 发推榜首
              </button>
              <button
                onClick={dlBoard}
                className="px-3.5 py-2.5 rounded-xl text-xs font-medium bg-bg-card/80 backdrop-blur border border-bg-border text-zinc-300 hover:border-zinc-500 hover:text-white transition-all"
              >
                📥 榜单图
              </button>
            </div>
          </div>

          {/* 类别筛选 */}
          <div className="flex flex-wrap gap-2">
            {["全部", ...kolCategories].map((c) => {
              const n = c === "全部" ? kols.length : kols.filter((k) => k.category === c).length;
              if (n === 0) return null;
              const cc = c === "全部" ? null : CAT[c];
              const on = cat === c;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-all font-medium flex items-center gap-1.5 ${
                    on && cc ? `${cc.bg} ${cc.text} ${cc.border}`
                    : on ? "bg-[#00ff88] text-black border-[#00ff88]"
                    : "bg-bg-card/60 text-zinc-400 border-bg-border hover:border-zinc-600 hover:text-zinc-200"
                  }`}
                >
                  {cc && <span className={`w-1.5 h-1.5 rounded-full ${cc.dot}`} />}
                  {c} {n}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-zinc-500 flex items-center gap-1.5">
            <span className="inline-block w-1 h-1 rounded-full bg-[#00ff88] animate-pulse" />
            {dimensionMeta[dim].desc.zh}
          </div>
        </div>

        {/* ── Top 3 领奖台 ── */}
        {top3.length === 3 && !q && cat === "全部" && (
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[1, 0, 2].map((idx) => {
              const k = top3[idx];
              const rank = idx + 1;
              const medal = MEDAL[idx];
              const acc = kolAccent(k.handle);
              const fs = finalScore(k, votes[k.handle] ?? 0);
              const v = getVote(k.handle);
              const cc = CAT[k.category] ?? CAT.Meme;
              return (
                <div
                  key={k.handle}
                  onClick={() => setDetail(k)}
                  className={`group relative cursor-pointer rounded-2xl overflow-hidden border bg-bg-card/70 backdrop-blur transition-all duration-300 hover:-translate-y-1 ${
                    rank === 1
                      ? "sm:-translate-y-3 sm:border-amber-400/50 sm:shadow-[0_12px_40px_-12px_#ffd70066]"
                      : "border-bg-border hover:border-zinc-600"
                  }`}
                >
                  <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${acc.a}, ${acc.b})` }} />
                  <div
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20 blur-3xl group-hover:opacity-35 transition-opacity"
                    style={{ background: `radial-gradient(circle, ${acc.a}, transparent)` }}
                  />

                  <div className="relative p-5 flex flex-col items-center text-center">
                    <div
                      className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-sm"
                      style={{ background: medal, color: "#0a0a0a", boxShadow: `0 0 14px -2px ${medal}` }}
                    >
                      {rank}
                    </div>

                    <div className="relative mb-3">
                      <div className="w-20 h-20 rounded-full p-[2px]" style={{ background: `linear-gradient(135deg, ${acc.a}, ${acc.b})` }}>
                        <Image src={k.avatar} alt={k.name} width={80} height={80}
                               className="w-full h-full rounded-full object-cover ring-2 ring-bg-base" unoptimized />
                      </div>
                      {k.blue_verified && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-sky-400 flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-bg-base">✓</span>
                      )}
                    </div>

                    <div className="font-bold text-zinc-100 text-lg leading-tight">{k.name}</div>
                    <div className="text-xs text-[#00ff88] font-mono">@{k.handle}</div>

                    <span className={`mt-2 px-2 py-0.5 rounded text-[10px] border font-medium ${cc.text} ${cc.border} ${cc.bg}`}>
                      {k.category}
                    </span>

                    <div className="flex items-baseline gap-1 mt-3">
                      <span className="text-4xl font-extrabold text-[#00ff88] leading-none">{fs}</span>
                      <span className="text-xs text-zinc-500">/100</span>
                    </div>

                    <div className="flex gap-1 w-full mt-3">
                      {(["influence", "accuracy", "activity"] as KOLDimension[]).map((d) => (
                        <div key={d} className="flex-1">
                          <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${k.scores[d] >= 85 ? "bg-emerald-400" : k.scores[d] >= 70 ? "bg-amber-400" : "bg-zinc-500"}`}
                              style={{ width: `${k.scores[d]}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed mt-3 line-clamp-2">{k.bio}</p>

                    <div className="flex gap-2 w-full mt-4 pt-3 border-t border-bg-border">
                      <button
                        onClick={(e) => { e.stopPropagation(); doVote(k); }}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                          v > 0
                            ? "bg-gradient-to-r from-[#00ff88] to-emerald-400 text-black border-transparent"
                            : "bg-bg-base/60 border-bg-border text-zinc-400 hover:border-[#00ff88] hover:text-[#00ff88]"
                        }`}
                      >
                        ▲ {v > 0 ? v : "投票"}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); tweet(k, rank); }}
                        className="flex-1 py-2 rounded-lg text-xs font-medium bg-bg-base/60 border border-bg-border text-zinc-300 hover:border-[#00ff88] hover:text-[#00ff88] transition-all"
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

        {/* ── 空状态 ── */}
        {filtered.length === 0 && (
          <div className="text-center py-16 border border-dashed border-bg-border rounded-2xl bg-bg-card/30">
            <div className="text-4xl mb-3">🔍</div>
            <div className="text-zinc-300 mb-1 font-medium">没有找到匹配的 KOL</div>
            <div className="text-sm text-zinc-600 mb-4">试试搜索 CZ、看多、Benson，或切换类别</div>
            <button
              onClick={() => { setQ(""); setCat("全部"); }}
              className="px-4 py-2 rounded-lg bg-bg-card border border-bg-border text-sm text-zinc-300 hover:border-zinc-500 transition-colors"
            >
              重置筛选
            </button>
          </div>
        )}

        {/* ── 排行榜表格 ── */}
        {filtered.length > 0 && (
          <div className="rounded-2xl border border-bg-border overflow-hidden bg-bg-card/40 backdrop-blur">
            <div className="hidden lg:grid grid-cols-[64px_minmax(220px,1.6fr)_130px_repeat(3,72px)_170px] gap-3 px-4 py-3 bg-bg-card/80 border-b border-bg-border text-[11px] text-zinc-500 font-semibold uppercase tracking-wider">
              <div>#</div>
              <div>KOL</div>
              <div>领域 / 粉丝量级</div>
              <div className="text-right">影响力</div>
              <div className="text-right">准确率</div>
              <div className="text-right">活跃度</div>
              <div className="text-right">操作</div>
            </div>

            {filtered.map((k, i) => {
              const v = getVote(k.handle);
              const fs = finalScore(k, votes[k.handle] ?? 0);
              const cc = CAT[k.category] ?? CAT.Meme;
              const acc = kolAccent(k.handle);
              const ft = followerTier(k.followers);
              return (
                <div
                  key={k.handle}
                  className={`group relative grid grid-cols-1 lg:grid-cols-[64px_minmax(220px,1.6fr)_130px_repeat(3,72px)_170px] gap-3 px-4 py-3 border-b border-bg-border last:border-b-0 transition-colors hover:bg-zinc-900/50 cursor-pointer ${
                    flash === k.handle ? "bg-[#00ff88]/10" : ""
                  }`}
                  onClick={() => setDetail(k)}
                >
                  <span
                    className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(180deg, ${acc.a}, ${acc.b})` }}
                  />

                  <div className="flex items-center gap-1.5">
                    <span className={`text-base font-extrabold font-mono w-6 ${
                      i === 0 ? "text-amber-400" : i === 1 ? "text-zinc-300" : i === 2 ? "text-orange-400" : "text-zinc-600"
                    }`}>
                      {i + 1}
                    </span>
                    {votes[k.handle] > 0 && (
                      <span className="text-[9px] px-1 py-0.5 rounded bg-[#00ff88]/20 text-[#00ff88] font-bold">
                        ↑{votes[k.handle]}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <div
                        className="w-10 h-10 rounded-full p-[1.5px] group-hover:scale-110 transition-transform"
                        style={{ background: `linear-gradient(135deg, ${acc.a}, ${acc.b})` }}
                      >
                        <Image src={k.avatar} alt={k.name} width={40} height={40}
                               className="w-full h-full rounded-full object-cover ring-1 ring-bg-base" unoptimized />
                      </div>
                      {k.blue_verified && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-sky-400 flex items-center justify-center text-[8px] text-white font-bold ring-2 ring-bg-base">✓</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-zinc-100 text-sm truncate group-hover:text-[#00ff88] transition-colors">{k.name}</span>
                      <div className="text-[11px] text-zinc-500 font-mono truncate">@{k.handle}</div>
                      <div className="flex gap-1 mt-0.5 lg:hidden">
                        {k.tags.slice(0, 3).map((t) => (
                          <span key={t} className="text-[9px] px-1 rounded bg-zinc-800 text-zinc-500">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:block space-y-1">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] border ${cc.text} ${cc.border} ${cc.bg}`}>
                      {k.category}
                    </span>
                    <div className={`text-[10px] font-mono ${ft.cls}`}>{ft.label}</div>
                  </div>

                  {(["influence", "accuracy", "activity"] as KOLDimension[]).map((d) => (
                    <div key={d} className="hidden lg:block text-right">
                      <div className="text-sm font-mono text-zinc-300">{k.scores[d]}</div>
                      <div className="h-0.5 rounded-full bg-zinc-800 mt-0.5 overflow-hidden">
                        <div
                          className={`h-full ${k.scores[d] >= 85 ? "bg-emerald-400" : k.scores[d] >= 70 ? "bg-amber-400" : "bg-zinc-500"}`}
                          style={{ width: `${k.scores[d]}%` }}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-1.5 justify-end" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => doVote(k)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-all active:scale-90 ${
                        v > 0
                          ? "bg-gradient-to-r from-[#00ff88] to-emerald-400 text-black border-transparent"
                          : "bg-bg-base/60 border-bg-border text-zinc-400 hover:border-[#00ff88] hover:text-[#00ff88]"
                      }`}
                      title={`为 @${k.handle} 投票`}
                    >
                      ▲{v > 0 ? v : ""}
                    </button>
                    <button
                      onClick={() => dl(k.handle, i + 1)}
                      className="px-2 py-1.5 rounded-lg text-[11px] bg-bg-base/60 border border-bg-border text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 transition-all"
                      title="下载分享卡"
                    >
                      📷
                    </button>
                    <button
                      onClick={() => tweet(k, i + 1)}
                      className="px-2 py-1.5 rounded-lg text-[11px] bg-bg-base/60 border border-bg-border text-zinc-400 hover:border-[#00ff88] hover:text-[#00ff88] transition-all"
                      title="一键发推"
                    >
                      𝕏
                    </button>
                  </div>

                  <div className="lg:hidden flex flex-wrap items-center gap-2 text-[10px] text-zinc-500 pl-1">
                    <span className={`px-1.5 py-0.5 rounded border ${cc.text} ${cc.border} ${cc.bg}`}>{k.category}</span>
                    <span className={ft.cls}>{ft.label}</span>
                    <span>影 {k.scores.influence}</span>
                    <span>准 {k.scores.accuracy}</span>
                    <span>活 {k.scores.activity}</span>
                    <span>新 {k.scores.rising}</span>
                    <span className="ml-auto font-bold text-[#00ff88]">{fs}分</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── 底部 CTA ── */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-[#00ff88]/30 bg-gradient-to-r from-[#00ff88]/10 to-emerald-500/5">
          <div className="text-center sm:text-left">
            <div className="font-semibold text-zinc-100 mb-0.5">觉得榜单缺了谁？</div>
            <div className="text-sm text-zinc-400">推特私信 @ruoxi01 推荐 KOL · 你的投票会直接影响排名</div>
          </div>
          <a
            href={SITE.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00ff88] to-emerald-400 text-black font-bold text-sm hover:brightness-110 transition-all shrink-0"
          >
            𝕏 关注 @ruoxi01
          </a>
        </div>
      </div>

      {detail && (
        <KOLDetail
          kol={detail}
          rank={filtered.findIndex((x) => x.handle === detail.handle) + 1}
          onClose={() => setDetail(null)}
          onVote={() => doVote(detail)}
          onTweet={() => tweet(detail, filtered.findIndex((x) => x.handle === detail.handle) + 1)}
          onDownload={() => dl(detail.handle, filtered.findIndex((x) => x.handle === detail.handle) + 1)}
        />
      )}
    </section>
  );
}

/* ── 小组件 ───────────────────────────────── */
function StatPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <span className="px-2.5 py-1 rounded-full bg-bg-card/70 border border-bg-border backdrop-blur inline-flex items-center gap-1.5">
      <span className="font-bold font-mono" style={{ color }}>{value}</span>
      <span className="text-zinc-500">{label}</span>
    </span>
  );
}

function KOLDetail({
  kol, rank, onClose, onVote, onTweet, onDownload,
}: {
  kol: KOL; rank: number;
  onClose: () => void; onVote: () => void; onTweet: () => void; onDownload: () => void;
}) {
  const v = getVote(kol.handle);
  const acc = kolAccent(kol.handle);
  const cc = CAT[kol.category] ?? CAT.Meme;
  const fs = finalScore(kol, v);
  const tweetPreview =
    `我在 @ruoxi01 的华语 KOL 榜看到 @${kol.handle} 排到第 ${rank} 名 ⭐${fs}分\n\n` +
    `简介：${kol.bio}\n\n` +
    `完整榜单（可投票）→ openmeme.art/#kol\n整理：@ruoxi01`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-zinc-950 border border-bg-border rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${acc.a}, ${acc.b})` }} />

        <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-sm border-b border-bg-border p-5 flex items-start gap-4 z-10">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full p-[2px]" style={{ background: `linear-gradient(135deg, ${acc.a}, ${acc.b})` }}>
              <Image src={kol.avatar} alt={kol.name} width={64} height={64}
                     className="w-full h-full rounded-full object-cover ring-2 ring-zinc-950" unoptimized />
            </div>
            {kol.blue_verified && (
              <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-sky-400 flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-zinc-950">✓</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-zinc-100 text-xl">{kol.name}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] border ${cc.text} ${cc.border} ${cc.bg}`}>{kol.category}</span>
            </div>
            <div className="text-sm text-[#00ff88] font-mono">@{kol.handle}</div>
            {kol.joined && <div className="text-[11px] text-zinc-500 mt-0.5">入行 {kol.joined}</div>}
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 flex items-center justify-center shrink-0 transition-colors">✕</button>
        </div>

        <div className="p-5 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-bg-card border border-bg-border p-4 text-center">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">当前排名</div>
              <div className="text-3xl font-extrabold text-[#00ff88] mt-1">#{rank}</div>
            </div>
            <div className="rounded-xl bg-bg-card border border-bg-border p-4 text-center">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">综合评分</div>
              <div className="text-3xl font-extrabold text-zinc-100 mt-1">
                {fs}<span className="text-sm text-zinc-500">/100</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">简介</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">{kol.bio}</p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-3">五维评分</h3>
            <div className="space-y-2.5">
              {(Object.keys(dimensionMeta) as KOLDimension[]).map((d) => {
                const val = kol.scores[d];
                const isOverall = d === "overall";
                return (
                  <div key={d}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className={isOverall ? "text-[#00ff88] font-bold" : "text-zinc-400"}>
                        {dimensionMeta[d].icon} {dimensionMeta[d].zh}
                      </span>
                      <span className={`font-mono ${isOverall ? "text-[#00ff88] font-bold" : "text-zinc-400"}`}>{val}</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          val >= 85 ? "bg-gradient-to-r from-emerald-400 to-emerald-300"
                          : val >= 70 ? "bg-gradient-to-r from-amber-400 to-amber-300"
                          : "bg-zinc-600"
                        }`}
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">公开数据</h3>
            <div className="grid grid-cols-3 gap-2">
              <MetricBox label="粉丝量级" value={followerTier(kol.followers).label} />
              <MetricBox label="周更" value={kol.tweetsPerWeek !== null ? `${kol.tweetsPerWeek} 条` : "需查证"} />
              <MetricBox label="认证" value={kol.blue_verified ? "蓝V" : kol.verified ? "认证" : "—"} />
            </div>
          </div>

          {kol.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {kol.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[11px]">#{t}</span>
              ))}
            </div>
          )}

          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">𝕏 一键发推内容</h3>
            <div className="rounded-xl border border-bg-border bg-bg-card/70 p-3 text-xs text-zinc-400 whitespace-pre-wrap font-mono leading-relaxed">
              {tweetPreview}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-zinc-950/95 backdrop-blur-sm border-t border-bg-border p-4 flex gap-2">
          <button
            onClick={onVote}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 shrink-0 ${
              v > 0
                ? "bg-gradient-to-r from-[#00ff88] to-emerald-400 text-black"
                : "bg-bg-card border border-bg-border text-zinc-300 hover:border-[#00ff88]"
            }`}
          >
            ▲ {v > 0 ? v : "投票"}
          </button>
          <button
            onClick={onTweet}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#00ff88] to-emerald-400 text-black font-bold text-sm hover:brightness-110 transition-all"
          >
            𝕏 一键发推 →
          </button>
          <button
            onClick={onDownload}
            className="px-3 py-2.5 rounded-xl border border-bg-border text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-all shrink-0"
            title="下载分享卡"
          >
            📥
          </button>
        </div>
      </div>
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-bg-card border border-bg-border p-2.5 text-center">
      <div className="text-[10px] text-zinc-500">{label}</div>
      <div className={`text-sm font-bold mt-0.5 ${value === "需查证" || value === "—" ? "text-zinc-500" : "text-zinc-200"}`}>
        {value}
      </div>
    </div>
  );
}