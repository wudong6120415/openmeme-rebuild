import { NextResponse } from "next/server";

// Optional live endpoint. Pulls "trending boosted tokens" from DexScreener
// public API. No key required. Cached 60s server-side.
export const revalidate = 60;

const DEX_BASE = "https://api.dexscreener.com/latest/dex";

type DexPair = {
  chainId: string;
  pairAddress: string;
  baseToken: { name: string; symbol: string };
  priceUsd?: string;
  priceChange?: { h24?: number };
  volume?: { h24?: number };
  liquidity?: { usd?: number };
  url: string;
};

export async function GET() {
  try {
    const res = await fetch(`${DEX_BASE}/tokens/boosted`, {
      headers: { "User-Agent": "openmeme.art" },
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return NextResponse.json({ error: "upstream", status: res.status }, { status: 502 });
    }
    const json = (await res.json()) as { pairs?: DexPair[] };
    const top = (json.pairs ?? []).slice(0, 20).map((p) => ({
      chain: p.chainId,
      symbol: p.baseToken.symbol,
      name: p.baseToken.name,
      price: p.priceUsd,
      change24h: p.priceChange?.h24,
      volume24h: p.volume?.h24,
      liquidity: p.liquidity?.usd,
      url: p.url,
    }));
    return NextResponse.json({ updatedAt: new Date().toISOString(), top });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
