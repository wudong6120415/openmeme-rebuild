"""
Apply G logo (Pepe Astronaut) to all website locations - v2 fixed.
Fixes: text overflow on right, emoji rendering.
"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

PROJECT = r"F:\deepseek\openmeme-rebuild"
SRC = os.path.join(PROJECT, r"public\logo-concepts-v4\v4-G-astronaut-pepe.png")
PUB = os.path.join(PROJECT, r"public")


def find_font(size: int):
    """CJK-first font picker with index hint for .ttc files."""
    candidates = [
        (r"C:\Windows\Fonts\msyhbd.ttc", 0),   # YaHei Bold
        (r"C:\Windows\Fonts\msyh.ttc", 0),     # YaHei regular
        (r"C:\Windows\Fonts\simhei.ttf", None),
        (r"C:\Windows\Fonts\simsun.ttc", 0),
        (r"C:\Windows\Fonts\segoeuib.ttf", None),
        (r"C:\Windows\Fonts\arial.ttf", None),
    ]
    for p, idx in candidates:
        if os.path.exists(p):
            try:
                if idx is not None:
                    return ImageFont.truetype(p, size, index=idx)
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()


# Load source
master = Image.open(SRC).convert("RGBA")
print(f"Source: {master.size}")

# ─────────────────────────────────────────────
# 1. logo.png (1024x1024 master)
# ─────────────────────────────────────────────
logo_path = os.path.join(PUB, "logo.png")
master.save(logo_path, "PNG")
print(f"  [OK] logo.png  ({os.path.getsize(logo_path)//1024} KB)")

# 2. favicon.png (64x64)
favicon = master.resize((64, 64), Image.LANCZOS)
favicon.save(os.path.join(PUB, "favicon.png"), "PNG")

# 3. apple-touch-icon.png (180x180)
apple = master.resize((180, 180), Image.LANCZOS)
apple.save(os.path.join(PUB, "apple-touch-icon.png"), "PNG")

# ─────────────────────────────────────────────
# 4. og.png (1200x630) - layout redesigned
# ─────────────────────────────────────────────
OG_W, OG_H = 1200, 630
og = Image.new("RGB", (OG_W, OG_H), (9, 9, 11))
od = ImageDraw.Draw(og)

# subtle radial glow on left (where logo sits)
overlay = Image.new("RGBA", (OG_W, OG_H), (0, 0, 0, 0))
od_ov = ImageDraw.Draw(overlay)
for r in range(400, 0, -20):
    alpha = int(255 * (r / 400) ** 2 * 0.06)
    od_ov.ellipse([80 - r, 315 - r, 680 + r, 315 + r], fill=(0, 255, 136, alpha))
og.paste(overlay, (0, 0), overlay)

# Place Pepe astronaut on left, scaled to 480
astro = master.resize((480, 480), Image.LANCZOS)
og.paste(astro, (60, 75))

# Title + tagline on the right (starting x=580, max width=600)
title_font = find_font(64)
sub_font = find_font(30)
tag_font = find_font(24)
cta_font = find_font(26)
small_font = find_font(20)

X = 580

od.text((X, 95),  "OpenMeme.art", font=title_font, fill=(250, 250, 250))
od.text((X, 175), "撸毛信号 · 比所有人早一步", font=sub_font, fill=(0, 255, 136))

# Description (split into 2 lines to avoid overflow)
od.text((X, 230), "Open + Meme + 空投 + 撸毛", font=tag_font, fill=(190, 190, 190))
od.text((X, 260), "AI 扫全网 · @ruoxi01 真人筛选", font=tag_font, fill=(190, 190, 190))

# CTA bar (drawn as shape, not emoji)
cta_x, cta_y, cta_w, cta_h = X, 320, 480, 56
od.rounded_rectangle([cta_x, cta_y, cta_x + cta_w, cta_y + cta_h],
                     radius=28, fill=(0, 255, 136))
# green dot circle (instead of emoji)
od.ellipse([cta_x + 16, cta_y + 18, cta_x + 36, cta_y + 38], fill=(0, 0, 0))
od.text((cta_x + 50, cta_y + 13), "实时跟单 · 关注 @ruoxi01", font=cta_font, fill=(0, 0, 0))

# Bottom URL
od.text((X, 540), "openmeme.art", font=small_font, fill=(120, 120, 120))

og_path = os.path.join(PUB, "og.png")
og.save(og_path, "PNG", optimize=True)
print(f"  [OK] og.png  ({os.path.getsize(og_path)//1024} KB)  {og.size}")
