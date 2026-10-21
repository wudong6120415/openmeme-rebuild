"""
Rich KOL avatar generator — gradient + glass + initials + noise texture.
Deterministic per handle. Fast, consistent, looks premium.
"""
import os, sys, json, hashlib, math, time, urllib.request
sys.stdout.reconfigure(encoding="utf-8")
from PIL import Image, ImageDraw, ImageFilter, ImageFont

PROJECT = r"F:\deepseek\openmeme-rebuild"
AV = os.path.join(PROJECT, r"public\kol-avatar")
os.makedirs(AV, exist_ok=True)

src = open(os.path.join(PROJECT, r"data\kols.ts"), encoding="utf-8").read()
import re
handles = re.findall(r'handle:\s*"([^"]+)"', src)
names  = re.findall(r'name:\s*"([^"]+)"', src)

# verified flag + category from the same file (rough, by order)
blue_v = re.findall(r'blue_verified:\s*(true|false)', src)

def h2rgb(h):
    d = hashlib.md5(h.encode()).hexdigest()
    return tuple(int(d[i:i+2], 16) for i in (0, 2, 4))

def lighten(c, f):
    return tuple(min(255, int(v + (255 - v) * f)) for v in c)

def darken(c, f):
    return tuple(int(v * (1 - f)) for v in c)

def font(sz, bold=True):
    for p in ([r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf"] if bold
              else [r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf"]):
        if os.path.exists(p):
            try: return ImageFont.truetype(p, sz)
            except: pass
    return ImageFont.load_default()

def make_avatar(handle, name, size=256, blue=False):
    base = h2rgb(handle)
    c1 = lighten(base, 0.45)
    c2 = darken(base, 0.55)
    c3 = lighten(base, 0.15)

    img = Image.new("RGBA", (size, size), (10, 10, 12, 255))
    d = ImageDraw.Draw(img)

    # diagonal gradient
    for y in range(size):
        for x in range(size):
            t = (x / size) * 0.65 + (y / size) * 0.35
            px = tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))
            img.putpixel((x, y), px + (255,))
    d = ImageDraw.Draw(img)

    # radial glow (upper-left)
    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([-size*0.3, -size*0.35, size*0.85, size*0.7],
                fill=lighten(base, 0.7) + (110,))
    glow = glow.filter(ImageFilter.GaussianBlur(size // 7))
    img = Image.alpha_composite(img, glow)
    d = ImageDraw.Draw(img)

    # subtle diagonal stripes
    for i in range(-size, size, 14):
        d.line([(i, 0), (i + size, size)], fill=(255, 255, 255, 8), width=1)

    # initials
    ini = (name or handle).strip()[:2].upper()
    f = font(int(size * 0.38))
    bb = d.textbbox((0, 0), ini, font=f)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    tx, ty = (size - tw) // 2, int(size * 0.40) - th // 2
    # shadow
    d.text((tx + 2, ty + 3), ini, font=f, fill=(0, 0, 0, 90))
    d.text((tx, ty), ini, font=f, fill=(255, 255, 255, 245))

    # handle at bottom
    fh = font(int(size * 0.085), bold=False)
    hb = d.textbbox((0, 0), f"@{handle}", font=fh)
    hw = hb[2] - hb[0]
    d.text(((size - hw) // 2, int(size * 0.79)), f"@{handle}",
           font=fh, fill=(255, 255, 255, 165))

    # blue-check badge
    if blue:
        r = int(size * 0.085)
        cx, cy = size - r - int(size*0.035), r + int(size*0.035)
        d.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(56, 189, 248, 255))
        d.line([(cx-r*0.42, cy), (cx-r*0.08, cy+r*0.36),
                (cx+r*0.45, cy-r*0.38)],
               fill=(255, 255, 255, 255), width=max(2, r // 5))

    return img


if __name__ == "__main__":
    print(f"generating {len(handles)} rich avatars…\n")
    meta = []
    for i, h in enumerate(handles):
        nm = names[i] if i < len(names) else h
        bv = (blue_v[i] == "true") if i < len(blue_v) else False
        p = os.path.join(AV, f"{h.replace('/', '_')}.png")
        make_avatar(h, nm, 256, bv).save(p, "PNG")
        base = h2rgb(h)
        meta.append({
            "handle": h,
            "accent": "#%02x%02x%02x" % lighten(base, 0.3),
            "accent2": "#%02x%02x%02x" % base,
            "blue_verified": bv,
        })
        print(f"  [OK] {h}")

    json.dump(meta, open(os.path.join(PROJECT, r"public\kol-theme.json"),
                         "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)
    print(f"\ndone — {len(meta)} avatars + public/kol-theme.json")