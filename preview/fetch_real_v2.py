"""
Batch probe via api.fxtwitter.com — lighter rate limit than direct Twitter.
Covers both English and Chinese KOLs. Fallback gracefully.
"""
import os, sys, json, time, urllib.request, urllib.error, re, html

sys.stdout.reconfigure(encoding="utf-8")
PROJECT = r"F:\deepseek\openmeme-rebuild"
OUT = os.path.join(PROJECT, r"public\kol-real\probe.json")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

# big mixed list — try all
CANDIDATES = [
    # English/global crypto
    "cz_binance", "justinsuntron", "VitalikButerin", "SBF_FTX",
    "WatcherGuru", "lookonchain", "DefiLlama_", "ArkhamIntel",
    "spotonchain", "MessariCrypto", "DuneAnalytics",
    "WuBlockchain", "BlockBeats", "searchin", "btcdayu",
    # crypto-native founders
    "0xMaki", "beinz", "0xSun", "chasewild",
    # middle ring
    "GlassnodeAlerts", "Blockworks_", "Cointelegraph", "TheBlock__",
    "MessariCrypto", "0xScope", "Hex_DeFi",
    # 推特华语区
    "czsxyj", "_FORAB", "hexiecs", "BensonTWN", "DaanCrypto",
    "0xSea", "0x_aladdin", "jbxrisme", "Kyla_0x", "ArthurMa",
    "0xBetty", "MiiChong", "franklin_deng", "Web3Lucia",
    "0xNing", "0xCat", "0xWeekly", "0xMika", "0xWeekly",
    "0xCat_", "0xLynn", "0xBetty", "0xWeekly", "0xUni"
]

# dedupe
seen, dedup = set(), []
for h in CANDIDATES:
    if h.lower() not in seen:
        seen.add(h.lower())
        dedup.append(h)
CANDIDATES = dedup


def get(handle):
    """Probe one handle via fxtwitter; return parsed user dict or None."""
    url = f"https://api.fxtwitter.com/{handle}"
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            if r.status != 200:
                return None
            data = json.loads(r.read().decode("utf-8", "ignore"))
    except Exception:
        return None

    if "user" in data and data["user"]:
        return data["user"]
    if data.get("code") in (404, "Not Found"):
        return None
    return None


def try_nitter(handle):
    """Fallback: scrape nitter.net HTML for the user card."""
    for inst in ("https://nitter.net", "https://nitter.privacydev.net"):
        url = f"{inst}/{handle}"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=15) as r:
                html_text = r.read().decode("utf-8", "ignore")
        except Exception:
            continue
        # crude parse
        m_name = re.search(r'<a class="profile-card-fullname"[^>]*>(.*?)</a>',
                           html_text, re.S | re.I)
        m_handle = re.search(r'<a class="profile-card-username"[^>]*>(.*?)</a>',
                             html_text, re.S | re.I)
        m_bio = re.search(r'<div class="profile-bio"[^>]*>(.*?)</div>',
                          html_text, re.S | re.I)
        m_avatar = re.search(r'<img class="profile-card-avatar"[^>]+src="([^"]+)"',
                             html_text, re.S | re.I)
        if not m_handle:
            continue
        handle = (m_handle.group(1) if m_handle else handle).strip()
        name = html.unescape(m_name.group(1)) if m_name else handle
        bio = re.sub(r"<[^>]+>", "", m_bio.group(1) if m_bio else "").strip()[:200]
        avatar = (m_avatar.group(1) if m_avatar else "")
        if avatar and avatar.startswith("/"):
            avatar = inst + avatar
        return {
            "name": name,
            "screen_name": handle,
            "description": bio,
            "profile_image_url_https": avatar,
            "followers_count": None,
            "verified": False,
            "is_blue_verified": False,
        }
    return None


def clean(u):
    if not u:
        return u
    return (u.replace("_normal.", "_400x400.")
              .replace("_bigger.", "_400x400.")
              .replace("_48x48.", "_400x400."))


print(f"=== probing {len(CANDIDATES)} candidates via fxtwitter + nitter ===\n", flush=True)

results = {}
ok = 0
for i, h in enumerate(CANDIDATES, 1):
    u = get(h)
    if u is None:
        # nitter fallback
        u = try_nitter(h)
    if u is None:
        print(f"  [{i:2}]  --   @{h:22}  MISS", flush=True)
        continue
    results[h.lower()] = {
        "handle": u.get("screen_name", h),
        "name": u.get("name", h),
        "followers": u.get("followers_count"),
        "description": u.get("description", ""),
        "avatar": clean(u.get("profile_image_url_https") or u.get("profile_image_url", "")),
        "verified": bool(u.get("verified")),
        "blue_verified": bool(u.get("is_blue_verified")),
        "source": "fxtwitter" if u.get("followers_count") is not None else "nitter",
    }
    f = results[h.lower()]["followers"]
    fs = f"{f:,}" if isinstance(f, int) else "?"
    mark = "🔵" if results[h.lower()]["blue_verified"] else ("✓" if results[h.lower()]["verified"] else " ")
    print(f"  [{i:2}]  OK   @{h:22} {fs:>12}  {mark} {results[h.lower()]['name'][:28]}", flush=True)
    ok += 1
    time.sleep(0.3)

# follow up with widget batch for any missing followers
missing = [h for h, v in results.items() if v["followers"] is None]
if missing:
    print(f"\n--- followbutton batch for {len(missing)} missing followers ---", flush=True)
    B = 20
    for i in range(0, len(missing), B):
        chunk = missing[i:i + B]
        try:
            url = ("https://cdn.syndication.twimg.com/widgets/followbutton/"
                   "info.json?screen_names=" + ",".join(chunk))
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
            with urllib.request.urlopen(req, timeout=20) as r:
                d = json.loads(r.read().decode("utf-8", "ignore"))
            for h, v in d.items():
                if v and v.get("followers_count") is not None:
                    results[h.lower()]["followers"] = v["followers_count"]
        except Exception as e:
            print(f"  batch err: {str(e)[:50]}", flush=True)
        time.sleep(2)

json.dump(results, open(OUT, "w", encoding="utf-8"),
          ensure_ascii=False, indent=2)
print(f"\n{'='*52}")
print(f"  total OK: {ok} / {len(CANDIDATES)}")
print(f"  saved -> {OUT}")

# show top 20
if results:
    print("\n  top 20 by followers:")
    for h, v in sorted(results.items(),
                      key=lambda x: -(x[1].get("followers") or 0))[:20]:
        f = v.get("followers")
        fs = f"{f:,}" if isinstance(f, int) else "?"
        print(f"    @{h:22} {fs:>12,}  {v['name'][:30]}")