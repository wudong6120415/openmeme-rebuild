"use client";

import { Header } from "@/components/Header";
import { TwitterBanner } from "@/components/TwitterBanner";
import { Hero } from "@/components/Hero";
import { KOLProjects } from "@/components/KOLProjects";
import { Footer } from "@/components/Footer";
import { I18nProvider } from "@/components/I18nProvider";
import { kolProjects } from "@/data/kol-projects";

export default function HomePage() {
  return (
    <I18nProvider initial="zh">
      <TwitterBanner />
      <Header />
      <main>
        <Hero />
        <KOLProjects projects={kolProjects} />
      </main>
      <Footer />
    </I18nProvider>
  );
}
