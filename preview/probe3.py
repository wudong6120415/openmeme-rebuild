"""
Try multiple mirror sources for Twitter data.
Falls back through fxtwitter → nitter.net → nitter.poast.org.
"""
import os, sys, json, time, urllib.request, urllib.error

sys.stdout.reconfigure(encoding="utf-8")
PROJECT = r"F:\deepseek\openmeme-rebuild"

HANDLES = [
    "cz_binance", "justinsuntron", "czsxyj", "WuBlockchain",
    "BlockBeats", "searchin", "WatcherGuru", "btcdayu",
    "hexiecs", "_FORAB", "0xSea", "BensonTWN", "DaanCrypto",
    "lookonchain", "DefiLlama_", "ArkhamIntel", "spotonchain",
    "MessariCrypto", "DuneAnalytics", "GlassnodeAlerts",
    "VitalikButerin", "elonmusk"
]

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"


def test_url(url, label):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
        with urllib.request.urlopen(req, timeout=15) as r:
            data = r.read()
            print(f"  [OK {r.status}] {label}: {len(data)} bytes  type={r.headers.get('Content-Type','?')[:30]}", flush=True)
            return r.status, data
    except urllib.error.HTTPError as e:
        print(f"  [{e.code}] {label}: {e.reason[:50]}", flush=True)
    except Exception as e:
        print(f"  [ERR] {label}: {type(e).__name__} {str(e)[:50]}", flush=True)
    return None, None


print("=== test multiple sources ===\n", flush=True)

# fxtwitter
for h in HANDLES[:3]:
    test_url(f"https://api.fxtwitter.com/{h}", f"fxtwitter {h}")
    time.sleep(0.5)

# nitter instances
for inst in ["nitter.net", "nitter.poast.org", "nitter.privacydev.net", "nitter.1d4.us"]:
    test_url(f"https://{inst}/api/i/user/_FORAB.json", f"{inst}")
    time.sleep(0.3)

# 推特自带的 syndication widget (still blocked)
test_url("https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=cz_binance", "syndication widget")

# 公开存档 / scraper
for u in [
    "https://tweeterid.com/ajax.php",
]:
    test_url(u, u)