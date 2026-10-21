import os, sys, json, time, urllib.request, re

try:
    sys.stdout.reconfigure(encoding="utf-8")
except: pass

OUT = r"F:\deepseek\openmeme-rebuild\public\kol-avatar"
os.makedirs(OUT, exist_ok=True)

# read handle list from kols.ts
src = open(r"F:\deepseek\openmeme-rebuild\data\kols.ts", encoding="utf-8").read()
handles = re.findall(r"handle:\s*\"([^\"]+)\"", src)
print(f"need avatars for {len(handles)} KOLs")

# fxtwitter avatar URL pattern
UA = "Mozilla/5.0"

ok = fail = 0
for h in handles:
    safe = h.replace("/", "_")
    out = os.path.join(OUT, f"{safe}.png")
    if os.path.exists(out) and os.path.getsize(out) > 500:
        ok += 1
        continue

    # try multiple sources
    for url in [
        f"https://api.fxtwitter.com/{h}/pfp",
        f"https://unavatar.io/twitter/{h}?size=200",
        f"https://pbs.twimg.com/profile_images/placeholder.png",  # fallback
    ]:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=15) as r:
                if r.status == 200:
                    data = r.read()
                    if len(data) > 500 and data[:4] in (b"\x89PNG", b"\xff\xd8\xff"):
                        with open(out, "wb") as f:
                            f.write(data)
                        ok += 1
                        print(f"  OK  @{h:24} {len(data)//1024} KB")
                        break
        except Exception as e:
            continue
    else:
        fail += 1
        print(f"  ERR @{h:24}")
    time.sleep(0.5)

print(f"\ndone: ok={ok}, fail={fail}")
