"use client";

import { useEffect, useState } from "react";
import { getStats, recordSectionView, fmtNum, type SiteStats } from "@/lib/community";

export function TrafficStats() {
  const [s, setS] = useState<SiteStats | null>(null);
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    setS(getStats());

    // 板块曝光统计
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            recordSectionView(e.target.id);
            setS(getStats());
          }
        });
      },
      { threshold: 0.3 },
    );
    ["kol", "projects"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    // 浮动状态：滚过 hero 后显示
    const onScroll = () => setFloating(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!s) return null;

  const sectionViews = Object.values(s.sections).reduce((a, b) => a + b, 0);

  return (
    <>
      {/* 浮动小组件 */}
      {floating && (
        <div className="fixed bottom-4 right-4 z-30 hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-950/95 border border-bg-border backdrop-blur-sm shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
          </span>
          <span className="text-[11px] text-zinc-400">
            今日 <span className="text-[#00ff88] font-bold">{fmtNum(s.todayVisits)}</span> 次访问
          </span>
        </div>
      )}

      {/* 完整统计区 */}
      <section id="stats" className="py-12 border-b border-bg-border bg-zinc-950/40">
        <div className="container-narrow">
          <div className="text-center mb-6">
            <div className="text-2xl mb-1">📊</div>
            <h3 className="text-lg font-bold text-zinc-100">站点数据</h3>
            <p className="text-xs text-zinc-500 mt-1">
              实时统计 · 数据保存在本机浏览器（demo 版，不含服务端）
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <StatBox label="总访问" value={fmtNum(s.totalVisits)} color="#00ff88" />
            <StatBox label="今日访问" value={fmtNum(s.todayVisits)} color="#38bdf8" />
            <StatBox label="板块浏览" value={fmtNum(sectionViews)} color="#a855f7" />
            <StatBox label="关注点击" value={fmtNum(s.followClicks)} color="#fbbf24" />
            <StatBox label="一键发推" value={fmtNum(s.tweetShares)} color="#ff00aa" />
            <StatBox label="投票次数" value={fmtNum(s.votes)} color="#fb923c" />
          </div>

          <p className="text-center text-[11px] text-zinc-600 mt-4">
            首次访问：{new Date(s.firstVisit).toLocaleDateString("zh-CN")}
          </p>
        </div>
      </section>
    </>
  );
}

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border border-bg-border bg-bg-card p-4 text-center">
      <div className="text-2xl font-extrabold" style={{ color }}>
        {value}
      </div>
      <div className="text-[11px] text-zinc-500 mt-1">{label}</div>
    </div>
  );
}