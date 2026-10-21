"""Quick test of syndication profile extraction."""
import sys, json, urllib.request, re

sys.stdout.reconfigure(encoding="utf-8")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"


def test(h):
    url = f"https://syndication.twitter.com/srv/timeline-profile/screen-name/{h}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        html = urllib.request.urlopen(req, timeout=20).read().decode("utf-8", "ignore")
        m = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html, re.S)
        if not m:
            return f"{h}: no NEXT_DATA (len={len(html)})"
        d = json.loads(m.group(1))

        def find(o):
            if isinstance(o, dict):
                if "screen_name" in o and "profile_image_url_https" in o:
                    return o
                for v in o.values():
                    r = find(v)
                    if r:
                        return r
            elif isinstance(o, list):
                for v in o:
                    r = find(v)
                    if r:
                        return r
            return None

        u = find(d)
        if not u:
            return f"{h}: no user obj"
        f = u.get("followers_count")
        fs = f"{f:,}" if isinstance(f, int) else str(f)
        av = (u.get("profile_image_url_https") or "")[:70]
        return f"{h}: OK followers={fs} blue={u.get('is_blue_verified')} av={av}"
    except Exception as e:
        return f"{h}: ERR {str(e)[:60]}"


for h in ["cz_binance", "WuBlockchain", "WatcherGuru", "justinsuntron", "0xSea", "BTCdayu"]:
    print(" ", test(h))