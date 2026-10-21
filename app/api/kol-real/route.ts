import { NextResponse } from "next/server";

/**
 * GET /api/kol-real?handles=cz_binance,justinsuntron,...
 *
 * Proxies Twitter's syndication widget from the server.
 * Server-side caching: 1 hour, with stale-while-revalidate.
 *
 * Returns: { handle: { handle, name, followers, avatar, blue_verified } }
 */

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export const revalidate = 3600; // 1 hour

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const list = (searchParams.get("handles") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (list.length === 0) {
    return NextResponse.json({ error: "no handles" }, { status: 400 });
  }
  if (list.length > 50) {
    return NextResponse.json({ error: "too many handles (max 50)" }, { status: 400 });
  }

  const url =
    "https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=" +
    encodeURIComponent(list.join(","));

  try {
    const r = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "*/*" },
      // no-store at fetch level; rely on route revalidate
      cache: "no-store",
    });
    if (!r.ok) {
      return NextResponse.json({ error: `upstream ${r.status}` }, { status: 502 });
    }
    const raw = (await r.json()) as Record<string, any>;
    const out: Record<string, any> = {};
    for (const [handle, info] of Object.entries(raw)) {
      if (!info) continue;
      out[handle.toLowerCase()] = {
        handle,
        name: info.name ?? handle,
        followers: info.followers_count ?? null,
        avatar: info.avatar_image_url_https ?? info.avatar_image_url ?? null,
        blue_verified: !!info.blue_verified,
        verified: !!info.verified,
        fetched_at: new Date().toISOString(),
      };
    }
    return NextResponse.json(out, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
    });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}