import { NextResponse } from "next/server";
import { signals } from "@/data/signals";
import { airdrops } from "@/data/airdrops";
import { scams } from "@/data/scams";

// Returns the curated signals as JSON. Optional: ?refresh=1 to also fetch
// DexScreener trending boosters (cached for 5 minutes).
export const revalidate = 300; // 5 min

export async function GET() {
  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    signals,
    airdrops,
    scams,
    counts: {
      signals: signals.length,
      airdrops: airdrops.length,
      scams: scams.length,
    },
  });
}
