"use client";

import Link from "next/link";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/components/I18nProvider";
import { SITE } from "@/lib/site";
import { TwitterButton } from "@/components/TwitterButton";

export function Header() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-bg-border bg-bg-base/80 backdrop-blur-md">
      <div className="container-narrow flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-11 h-11 rounded-lg overflow-hidden ring-1 ring-zinc-800 group-hover:ring-[#00ff88] transition-all shadow-[0_0_12px_-3px_rgba(0,255,136,0.3)]">
            <Image
              src="/logo-header.png"
              alt="OpenMeme.art logo"
              width={44}
              height={44}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-base group-hover:text-[#00ff88] transition-colors">
              OpenMeme
            </span>
            <span className="text-[10px] text-zinc-500 tracking-widest">.ART</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm text-zinc-400">
          <a href="#kol" className="hover:text-[#00ff88] transition-colors">
            🏆 KOL 榜
          </a>
          <a href="#projects" className="hover:text-[#00ff88] transition-colors">
            🆕 新项目
          </a>
          <a href="#stats" className="hover:text-[#00ff88] transition-colors">
            📊 数据
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <TwitterButton size="sm" />
        </div>
      </div>
    </header>
  );
}
