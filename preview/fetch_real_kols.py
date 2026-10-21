"""
Fetch REAL KOL profile data from Twitter's syndication API (no auth required).

Strategy: polite rate limiting + exponential backoff to survive 429 rate limits.
Writes public/kol-real/profiles.json + downloads real avatars to public/kol-avatar/
"""
import os, sys, re, json, time, random, urllib.request, urllib.error

sys.stdout.reconfigure(encoding="utf-8")

PROJECT = r"F:\deepseek\openmeme-rebuild"
OUT = os.path.join(PROJECT, r"public\kol-real")
AVATAR = os.path.join(PROJECT, r"public\kol-avatar")
os.makedirs(OUT, exist_ok=True)
os.makedirs(AVATAR, exist_ok=True)

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")


def get(url, timeout=25, retries=5):
    """GET with exponential backoff on 429."""
    delay = 4.0
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": UA,
                "Accept": "*/*",
                "Accept-Language": "en-US,en;q=0.9",
            })
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < retries - 1:
                wait = delay * (attempt + 1) + random.uniform(0, 2.0)
                print(f"      429 -> wait {wait:.1f}s ({attempt+1}/{retries})", flush=True)
                time.sleep(wait)
                delay *= 1.7
                continue
            raise
        except Exception:
            if attempt < retries - 1:
                time.sleep(delay)
                delay *= 1.5
                continue
            raise
    raise RuntimeError("max retries")


def find_user(o):
    if isinstance(o, dict):
        if "screen_name" in o and "profile_image_url_https" in o:
            return o
        for v in o.values():
            r = find_user(v)
            if r:
                return r
    elif isinstance(o, list):
        for v in o:
            r = find_user(v)
            if r:
                return r
    return None


def fetch_profile(handle):
    url = f"https://syndication.twitter.com/srv/timeline-profile/screen-name/{handle}"
    try:
        html = get(url).decode("utf-8", "ignore")
    except Exception as e:
        return {"error": f"{type(e).__name__}: {str(e)[:60]}"}

    m = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>',
                  html, re.S)
    if not m:
        return {"error": f"no NEXT_DATA (html {len(html)}B)"}
    try:
        d = json.loads(m.group(1))
    except Exception as e:
        return {"error": f"json: {str(e)[:50]}"}

    u = find_user(d)
    if not u:
        return {"error": "user object not found"}

    avatar = (u.get("profile_image_url_https") or u.get("profile_image_url") or "")
    avatar = avatar.replace("_normal", "_400x400").replace("_bigger", "_400x400")

    return {
        "handle": u.get("screen_name", handle),
        "name": u.get("name") or handle,
        "avatar": avatar,
        "followers": u.get("followers_count"),
        "friends": u.get("friends_count"),
        "statuses": u.get("statuses_count"),
        "verified": bool(u.get("verified")),
        "blue_verified": bool(u.get("is_blue_verified")),
        "description": (u.get("description") or "").strip(),
        "location": u.get("location") or "",
    }


def fetch_followers_batch(handles):
    out = {}
    B = 20
    for i in range(0, len(handles), B):
        chunk = handles[i:i + B]
        url = ("https://cdn.syndication.twimg.com/widgets/followbutton/"
               "info.json?screen_names=" + ",".join(chunk))
        try:
            d = json.loads(get(url).decode("utf-8", "ignore"))
            for h, v in d.items():
                if v:
                    out[h.lower()] = v.get("followers_count")
        except Exception as e:
            print(f"    batch error: {str(e)[:60]}")
        time.sleep(1.5)
    return out


def download_avatar(url, path):
    if not url:
        return False
    try:
        data = get(url, timeout=20, retries=2)
        if len(data) < 1000:
            return False
        with open(path, "wb") as f:
            f.write(data)
        return True
    except Exception:
        return False


if __name__ == "__main__":
    handles = [l.strip() for l in
               open(sys.argv[1], encoding="utf-8") if l.strip() and not l.startswith("#")]
    # dedupe, preserve order
    seen, uniq = set(), []
    for h in handles:
        if h.lower() not in seen:
            seen.add(h.lower())
            uniq.append(h)
    handles = uniq

    print(f"=== fetching {len(handles)} real profiles (slow + backoff) ===\n", flush=True)

    results = {}
    ok = miss = 0
    for i, h in enumerate(handles, 1):
        r = fetch_profile(h)
        if "error" in r:
            print(f"  [{i:2}/{len(handles)}] MISS  @{h:22} {r['error'][:42]}", flush=True)
            miss += 1
        else:
            f = r.get("followers")
            fs = f"{f:,}" if isinstance(f, int) else "?"
            mark = "\U0001f535" if r.get("blue_verified") else ("\u2713" if r.get("verified") else " ")
            print(f"  [{i:2}/{len(handles)}] OK    @{h:22} {fs:>11} {mark} {r.get('name','')[:26]}", flush=True)
            results[h] = r
            ok += 1
        time.sleep(2.0)

    missing_f = [h for h, r in results.items() if r.get("followers") is None]
    if missing_f:
        print(f"\n--- batch followers ({len(missing_f)}) ---", flush=True)
        fb = fetch_followers_batch(missing_f)
        for h, f in fb.items():
            if f:
                results[h]["followers"] = f

    print(f"\n--- downloading {len(results)} avatars ---", flush=True)
    got_av = 0
    for h, r in results.items():
        safe = re.sub(r"[^a-zA-Z0-9_]", "_", h)
        if download_avatar(r.get("avatar", ""), os.path.join(AVATAR, f"{safe}.png")):
            got_av += 1
            print(f"  [av] @{h}")
        time.sleep(0.5)

    out_path = os.path.join(OUT, "profiles.json")
    json.dump(results, open(out_path, "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)

    print(f"\n{'='*54}")
    print(f"  profiles : {ok} ok / {miss} missing   (of {len(handles)})")
    print(f"  avatars  : {got_av} downloaded")
    print(f"  saved    : {out_path}")