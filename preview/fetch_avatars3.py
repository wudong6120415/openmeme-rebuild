"""
Get real avatars via fxtwitter's main API which returns the full user JSON
including profile_image_url_https.
"""
import os, sys, json, time, urllib.request, urllib.error

try:
    sys.stdout.reconfigure(encoding="utf-8")
except: pass

OUT = r"F:\deepseek\openmeme-rebuild\public\kol-avatar"
os.makedirs(OUT, exist_ok=True)

src = open(r"F:\deepseek\openmeme-rebuild\data\kols.ts", encoding="utf-8").read()
import re
handles = re.findall(r"handle:\s*\"([^\"]+)\"", src)

UA = "Mozilla/5.0"

def get_avatar_url(h):
    """Get the avatar URL from fxtwitter's user JSON."""
    try:
        req = urllib.request.Request(
            f"https://api.fxtwitter.com/{h}",
            headers={"User-Agent": UA, "Accept": "application/json"},
        )
        with urllib.request.urlopen(req, timeout=15) as r:
            d = json.loads(r.read().decode("utf-8", "ignore"))
        if "user" in d and d["user"]:
            u = d["user"]
            av = u.get("profile_image_url_https") or u.get("profile_image_url")
            if av:
                av = av.replace("_normal.", "_400x400.")
                return av
    except Exception:
        pass
    return None

def download(url, out):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=20) as r:
            if r.status != 200: return False
            data = r.read()
            if len(data) < 500: return False
            if data[:4] not in (b"\x89PNG", b"\xff\xd8\xff", b"GIF8"):
                return False
            with open(out, "wb") as f: f.write(data)
            return True
    except: return False

print(f"downloading {len(handles)} real avatars\n")
ok = 0
for h in handles:
    safe = h.replace("/", "_")
    path = os.path.join(OUT, f"{safe}.png")
    if os.path.exists(path) and os.path.getsize(path) > 500:
        ok += 1
        print(f"  ✓  @{h:24} (cached)")
        continue
    url = get_avatar_url(h)
    if url and download(url, path):
        ok += 1
        print(f"  OK @{h:24} ← {url[:50]}...")
    else:
        print(f"  -- @{h:24} (no avatar)")
    time.sleep(0.4)

print(f"\nok={ok}/{len(handles)}")