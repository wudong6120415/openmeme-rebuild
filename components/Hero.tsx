"use client";

import { TwitterButton } from "@/components/TwitterButton";
import { useI18n } from "@/components/I18nProvider";

export function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden border-b border-bg-border">
      <div className="absolute inset-0 grid-bg opacity-50"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00ff88]/10 rounded-full blur-[100px]"></div>

      <div className="container-narrow relative py-16 sm:py-20">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/5 text-xs font-medium text-[#00ff88]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse"></span>
            {t("hero.badge")}
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            {t("hero.title")}
            <br />
            <span className="gradient-text">{t("hero.titleAccent")}</span>
          </h1>

          <p className="max-w-2xl text-zinc-400 text-base sm:text-lg mb-8 leading-relaxed">
            {t("hero.desc")}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
            <TwitterButton size="lg" />
            <a
              href="#kol"
              className="inline-flex items-center gap-2 px-5 py-3 text-zinc-300 hover:text-zinc-100 transition-colors text-sm"
            >
              {t("hero.ctaScroll")}
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-bg-border rounded-2xl overflow-hidden border border-bg-border w-full max-w-2xl">
            {t("hero.stats").map((s) => (
              <div key={s.label} className="bg-bg-card p-4 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#00ff88]">
                  {s.value}
                </div>
                <div className="text-xs text-zinc-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
