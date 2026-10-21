"""
Lightweight probe via a single small batched request to the followbutton widget.
Includes a long sleep before/after to avoid 429.
"""
import os, sys, json, time, urllib.request, urllib.error

sys.stdout.reconfigure(encoding="utf-8")
PROJECT = r"F:\deepseek\openmeme-rebuild"

# 28 candidates — mostly the strongest Chinese KOL signals
# (mix of exchange founders, analysts, media)
HANDLES = [
    # founders / CEOs
    "cz_binance", "justinsuntron", "SBF_FTX",
    # Chinese-language analysts
    "czsxyj", "WuBlockchain", "BlockBeats", "btcdayu", "WatcherGuru",
    "hexiecs", "_FORAB", "searchin", "0xSea", "0x_aladdin", "BensonTWN",
    # crypto media / influencers
    "lookonchain", "DefiLlama_", "ArkhamIntel", "spotonchain",
    "MessariCrypto", "DuneAnalytics", "GlassnodeAlerts",
    # general
    "VitalikButerin", "elonmusk", "0xnovak"
]

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    return urllib.request.urlopen(req, timeout=30).read()


# single batch
print(f"--- single batch ({len(HANDLES)} handles) ---", flush=True)
try:
    url = ("https://cdn.syndication.twimg.com/widgets/followbutton/"
           "info.json?screen_names=" + ",".join(HANDLES))
    raw = get(url)
    print(f"  raw len: {len(raw)} bytes", flush=True)
    print(f"  raw[:200]: {raw[:200]!r}", flush=True)
    data = json.loads(raw.decode("utf-8", "ignore"))
    out = {}
    for h, v in data.items():
        if not v:
            continue
        f = v.get("followers_count")
        if f is None:
            continue
        out[h.lower()] = {
            "handle": h,
            "name": v.get("name") or h,
            "followers": f,
            "avatar": (v.get("avatar_image_url_https")
                       or v.get("avatar_image_url") or ""),
        }

    print(f"\n  got {len(out)} valid accounts\n", flush=True)
    for h, v in sorted(out.items(),
                      key=lambda x: -(x[1]["followers"] or 0)):
        f = v["followers"]
        print(f"  @{h:22} {f:>12,}  {v['name'][:32]}", flush=True)

    out_path = os.path.join(PROJECT, r"public\kol-real\probe.json")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    json.dump(out, open(out_path, "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)
    print(f"\nsaved -> {out_path}")
except urllib.error.HTTPError as e:
    print(f"  HTTP {e.code} {e.reason}", flush=True)
    print(f"  body: {e.read()[:200].decode('utf-8','ignore')}", flush=True)
except Exception as e:
    print(f"  ERR: {type(e).__name__} {str(e)[:80]}", flush=True)