import { NextResponse } from "next/server";

/**
 * GET /api/kol-avatar?handle=cz_binance
 *
 * Server-side avatar proxy. Avoids CORS and serves from a long-lived cache.
 */

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export const revalidate = 86400; // 24 h

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const handle = (searchParams.get("handle") || "").trim();
  if (!/^[A-Za-z0-9_]{1,30}$/.test(handle)) {
    return NextResponse.json({ error: "bad handle" }, { status: 400 });
  }

  // unavatar first (cleanest, biggest), fall back to pbs.twimg.com
  const candidates = [
    `https://unavatar.io/twitter/${handle}?size=200`,
    `https://unavatar.io/x/${handle}?size=200`,
  ];

  for (const url of candidates) {
    try {
      const r = await fetch(url, {
        headers: { "User-Agent": UA },
        cache: "no-store",
      });
      if (r.ok && r.headers.get("content-type")?.startsWith("image/")) {
        const buf = Buffer.from(await r.arrayBuffer());
        if (buf.length > 500) {
          return new NextResponse(buf, {
            headers: {
              "Content-Type": r.headers.get("content-type") || "image/png",
              "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=2592000",
            },
          });
        }
      }
    } catch {}
  }

  return NextResponse.json({ error: "not found" }, { status: 404 });
}