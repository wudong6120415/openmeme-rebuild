"use client";

import { useI18n } from "@/components/I18nProvider";
import { SITE } from "@/lib/site";

export function TwitterBanner() {
  const { t } = useI18n();
  return (
    <a
      href={SITE.twitterUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full bg-gradient-to-r from-[#00ff88] via-emerald-400 to-sky-400 text-black text-center py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
    >
      <span className="inline-flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
        </span>
        {t("banner")}
      </span>
    </a>
  );
}
