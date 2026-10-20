"use client";

import { TwitterBanner } from "@/components/TwitterBanner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { KOLLeaderboard } from "@/components/KOLLeaderboard";
import { Comments } from "@/components/Comments";
import { NewProjects } from "@/components/NewProjects";
import { TrafficStats } from "@/components/TrafficStats";
import { Footer } from "@/components/Footer";
import { I18nProvider } from "@/components/I18nProvider";

export default function HomePage() {
  return (
    <I18nProvider initial="zh">
      <TwitterBanner />
      <Header />

      <main>
        <Hero />

        {/* 板块一：币圈华语区 KOL 排行榜 */}
        <KOLLeaderboard />
        <div className="container-narrow">
          <Comments section="kol" title="KOL 榜单留言" />
        </div>

        {/* 板块二：新项目推荐 */}
        <NewProjects />
        <div className="container-narrow">
          <Comments section="projects" title="新项目留言" />
        </div>

        {/* 站点数据 */}
        <TrafficStats />
      </main>

      <Footer />
    </I18nProvider>
  );
}