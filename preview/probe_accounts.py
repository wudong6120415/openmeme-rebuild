"""
Lightweight probe via the followbutton widget (less rate-limited than timeline).

Picks a smaller candidate set + sends only 1 batched request.
"""
import os, sys, json, time, urllib.request, re

sys.stdout.reconfigure(encoding="utf-8")
PROJECT = r"F:\deepseek\openmeme-rebuild"
OUT = os.path.join(PROJECT, r"public\kol-real\probe.json")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

# Reduced set — pick the most likely to exist
PROBES = [
    "cz_binance", "justinsuntron", "czsxyj", "WuBlockchain",
    "BlockBeats", "searchin", "WatcherGuru", "btcdayu",
    "hexiecs", "_FORAB", "0xSea", "0x_aladdin", "BensonTWN",
    "DaanCrypto", "jbxrisme", "Kyla_0x", "ArthurMa",
    "BailyTrading", "0xUni", "Metamask",
    "WatcherGuru", "solaborate", "iamDCinvestor",
    "lookonchain", "0xScope", "_0xCryptoNerd",
    "czsxyj", "WatcherGuru",
]

# dedupe
seen, PROBES = set(), []
for h in PROBES:
    if h.lower() not in seen:
        seen.add(h.lower())
        PROBES.append(h)


def probe_batch(handles):
    out = {}
    url = ("https://cdn.syndication.twimg.com/widgets/followbutton/"
           "info.json?screen_names=" + ",".join(handles))
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
        with urllib.request.urlopen(req, timeout=30) as r:
            d = json.loads(r.read().decode("utf-8", "ignore"))
        for h, v in d.items():
            if not v:
                continue
            f = v.get("followers_count")
            if f is None:
                continue
            out[h.lower()] = {
                "handle": h,
                "name": v.get("name") or h,
                "followers": f,
                "avatar": (v.get("avatar_image_url_https") or
                           v.get("avatar_image_url") or ""),
            }
    except Exception as e:
        print(f"  err: {type(e).__name__} {str(e)[:60]}", flush=True)
    return out


# Single batched request (20 per batch max, but 23 is OK)
B = 20
all_results = {}
for i in range(0, len(PROBES), B):
    chunk = PROBES[i:i + B]
    print(f"--- batch {i//B+1}: probing {len(chunk)} ---", flush=True)
    r = probe_batch(chunk)
    for k, v in r.items():
        all_results[k] = v
        f = v["followers"]
        print(f"  OK   @{k:22} {f:>11,}", flush=True)
    if i + B < len(PROBES):
        print("  ... wait 30s ...", flush=True)
        time.sleep(30)

print(f"\n{'='*52}")
print(f"  total OK: {len(all_results)} / {len(PROBES)}")
print(f"  saved -> {OUT}")
json.dump(all_results, open(OUT, "w", encoding="utf-8"),
          ensure_ascii=False, indent=2)

# show top 10
if all_results:
    print("\n  top 10 by followers:")
    for h, v in sorted(all_results.items(),
                      key=lambda x: -(x[1]["followers"] or 0))[:10]:
        print(f"    @{h:22} {v['followers']:>12,}  {v['name'][:30]}")