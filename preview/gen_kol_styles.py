"""
Batch-generate fancy avatar cards for ALL KOLs.
Uses their handle's MD5 hash → deterministic gradient + initials.
Better than plain initials — gradient with their name's color signature.
"""
import os, sys, json, hashlib, urllib.request, time

sys.stdout.reconfigure(encoding="utf-8")
PROJECT = r"F:\deepseek\openmeme-rebuild"
AVATAR = os.path.join(PROJECT, r"public\kol-avatar")
os.makedirs(AVATAR, exist_ok=True)

# import KOL handles
import re
src = open(os.path.join(PROJECT, r"data\kols.ts"), encoding="utf-8").read()
handles = re.findall(r'handle:\s*"([^"]+)"', src)
print(f"need avatar cards for {len(handles)} KOLs")

API_KEY = "sk-cp-9ebPyN9XSpxje0C6MZsXPQvZnFQKdug3Qe7gjuGJykm_jgCfMSobFi0CdoBnx1viTQctRD1-Y7v9ql0DO-9sIROF_DpsGYA7zmjRezSJjYICoL4OgpEMR_k"

# Build colors from handle hash
def h2c(h):
    md5 = hashlib.md5(h.encode()).hexdigest()
    r1, g1, b1 = int(md5[0:2],16), int(md5[2:4],16), int(md5[4:6],16)
    r2, g2, b2 = int(md5[6:8],16), int(md5[8:10],16), int(md5[10:12],16)
    return (f"rgb({r1},{g1},{b1})", f"rgb({r2},{g2},{b2})")

# also build tier (fake but consistent)
import hashlib
def h2tier(h):
    h8 = int(hashlib.md5(h.encode()).hexdigest()[:6], 16) % 100
    if h8 > 90: return "diamond"
    if h8 > 75: return "platinum"
    if h8 > 50: return "gold"
    if h8 > 25: return "silver"
    return "bronze"

# also handle → initials
def initials(h):
    s = h.replace("0x", "").replace("_", "").strip()
    return (s[:2] if s else h[:2]).upper()

# write a JSON lookup so the component can use it
out = []
for h in handles:
    c1, c2 = h2c(h)
    out.append({
        "handle": h,
        "initials": initials(h),
        "color1": c1,
        "color2": c2,
        "tier": h2tier(h),
    })

with open(os.path.join(PROJECT, r"public\kol-avatars.json"), "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)
print(f"wrote: {len(out)} KOL avatar styles -> public/kol-avatars.json")