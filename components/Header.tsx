import Link from "next/link";
import { SITE } from "@/lib/site";
import { TwitterButton } from "@/components/TwitterButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-bg-border bg-bg-base/80 backdrop-blur-md">
      <div className="container-narrow flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo className="w-8 h-8" />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-base group-hover:text-[#00ff88] transition-colors">
              OpenMeme
            </span>
            <span className="text-[10px] text-zinc-500 tracking-widest">.ART</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
          <a href="#early" className="hover:text-zinc-100 transition-colors">早期项目</a>
          <a href="#airdrop" className="hover:text-zinc-100 transition-colors">空投</a>
          <a href="#scam" className="hover:text-zinc-100 transition-colors">防骗</a>
          <a href="#why" className="hover:text-zinc-100 transition-colors">关于</a>
        </nav>

        <TwitterButton size="sm" />
      </div>
    </header>
  );
}

function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-label="OpenMeme logo">
      <rect width="64" height="64" rx="14" fill="#0a0a0a" stroke="#00ff88" strokeWidth="2" />
      {/* Owl eye + M letterform merged */}
      <circle cx="22" cy="28" r="9" fill="#00ff88" />
      <circle cx="42" cy="28" r="9" fill="#00ff88" />
      <circle cx="22" cy="28" r="3.5" fill="#0a0a0a" />
      <circle cx="42" cy="28" r="3.5" fill="#0a0a0a" />
      <path
        d="M16 46 L32 38 L48 46"
        stroke="#00ff88"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
