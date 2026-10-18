"use client";

import { useI18n } from "@/components/I18nProvider";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <div className="inline-flex items-center rounded-lg border border-bg-border bg-bg-card p-0.5 text-xs">
      <button
        onClick={() => setLang("zh")}
        className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
          lang === "zh"
            ? "bg-[#00ff88] text-black"
            : "text-zinc-400 hover:text-zinc-100"
        }`}
        aria-label="Switch to Chinese"
      >
        中
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
          lang === "en"
            ? "bg-[#00ff88] text-black"
            : "text-zinc-400 hover:text-zinc-100"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
