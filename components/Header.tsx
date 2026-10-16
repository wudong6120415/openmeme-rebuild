import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { TwitterButton } from "@/components/TwitterButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-bg-border bg-bg-base/80 backdrop-blur-md">
      <div className="container-narrow flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden ring-1 ring-zinc-800 group-hover:ring-[#00ff88] transition-all shadow-[0_0_12px_-3px_rgba(0,255,136,0.3)]">
            <Image
              src="/logo-header.png"
              alt="OpenMeme.art logo"
              width={48}
              height={48}
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

        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
          <a href="#early" className="hover:text-zinc-100 transition-colors">早期项目</a>
          <a href="#airdrop" className="hover:text-zinc-100 transition-colors">空投</a>
          <a href="#scam" className="hover:text-zinc-100 transition-colors">防骗</a>
          <a href="#tools" className="hover:text-[#00ff88] transition-colors">🧰 工具</a>
          <a href="#why" className="hover:text-zinc-100 transition-colors">关于</a>
        </nav>

        <TwitterButton size="sm" />
      </div>
    </header>
  );
}
