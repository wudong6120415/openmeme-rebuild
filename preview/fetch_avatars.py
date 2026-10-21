import os, sys, re, urllib.request, urllib.error
sys.stdout.reconfigure(encoding="utf-8")

PROJECT = r"F:\deepseek\openmeme-rebuild"
OUT = os.path.join(PROJECT, r"public\kol-avatar")
os.makedirs(OUT, exist_ok=True)

# read handles from data/kols.ts
src = open(os.path.join(PROJECT, r"data\kols.ts"), encoding="utf-8").read()
handles = re.findall(r'handle:\s*"([^"]+)"', src)

FALLBACK = "https://api.dicebear.com/7.0/initials/png?seed={}&backgroundColor=00ff88,38bdf8,a855f7,fbbf24,ff00aa&fontFamily=Arial&fontWeight=700"

ok = fail = fb = 0
for i, h in enumerate(handles, 1):
    slug = f"{i:02d}-{h.lower()}.png"
    path = os.path.join(OUT, slug)
    got = False
    for svc in ("twitter", "x"):
        try:
            url = f"https://unavatar.io/{svc}/{h}?size=256"
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=20) as r:
                data = r.read()
            # verify it's a real image (not default gray avatar)
            if len(data) > 1500 and data[:4] in (b"\x89PNG",):
                with open(path, "wb") as f:
                    f.write(data)
                print(f"  [OK]   {h:20} {len(data)//1024} KB")
                got = True
                ok += 1
                break
        except Exception:
            continue
    if not got:
        try:
            url = FALLBACK.format(h)
            with urllib.request.urlopen(url, timeout=20) as r:
                data = r.read()
            with open(path, "wb") as f:
                f.write(data)
            print(f"  [FB]   {h:20} generated (no public avatar)")
            fb += 1
        except Exception as e:
            print(f"  [ERR]  {h:20} {str(e)[:60]}")
            fail += 1

print(f"\ndone: {ok} real, {fb} fallback, {fail} fail  (total {len(handles)})")
