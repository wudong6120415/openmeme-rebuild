import { SITE } from "@/lib/site";

type Variant = "primary" | "outline" | "ghost";

export function TwitterButton({
  variant = "primary",
  size = "md",
  label,
  showIcon = true,
  className = "",
}: {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  label?: string;
  showIcon?: boolean;
  className?: string;
}) {
  const text = label ?? `关注 @${SITE.twitterHandle}`;
  const base =
    "inline-flex items-center justify-center gap-2 font-bold transition-all active:scale-95 rounded-lg";

  const sizeCls =
    size === "sm"
      ? "text-xs px-3 py-1.5"
      : size === "lg"
      ? "text-base sm:text-lg px-6 py-3.5"
      : "text-sm px-5 py-2.5";

  const variantCls =
    variant === "primary"
      ? "bg-[#00ff88] hover:bg-[#00cc6e] text-black hover:scale-105 hover:shadow-[0_0_24px_-6px_#00ff88]"
      : variant === "outline"
      ? "border border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/10"
      : "text-zinc-300 hover:text-[#00ff88]";

  return (
    <a
      href={SITE.twitterUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${sizeCls} ${variantCls} ${className}`}
    >
      {showIcon && <XLogo className="w-4 h-4" />}
      <span>{text}</span>
    </a>
  );
}

function XLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
