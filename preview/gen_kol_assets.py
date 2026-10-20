#!/usr/bin/env python3
"""
Generate KOL avatars + share cards with Pillow.

Usage:
  python gen_kol_assets.py avatars          # 24 square avatars
  python gen_kol_assets.py card <handle>   # single 1080x1350 share card
  python gen_kol_assets.py board           # 1200x1600 top-10 leaderboard
"""
import os, sys, json, hashlib

sys.stdout.reconfigure(encoding="utf-8")
from PIL import Image, ImageDraw, ImageFont

PROJECT = r"F:\deepseek\openmeme-rebuild"
AVATAR_DIR = os.path.join(PROJECT, r"public\kol-avatar")
SHARE_DIR = os.path.join(PROJECT, r"public\share")
BG = (9, 9, 11)
GREEN = (0, 255, 136)
DIM = (113, 113, 122)
WHITE = (250, 250, 250)

os.makedirs(AVATAR_DIR, exist_ok=True)
os.makedirs(SHARE_DIR, exist_ok=True)


def font(sz, bold=True):
    cands = [
        r"C:\Windows\Fonts\msyhbd.ttc" if bold else r"C:\Windows\Fonts\msyh.ttc",
        r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
    ]
    for p in cands:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, sz)
            except Exception:
                pass
    return ImageFont.load_default()


def hex2rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))


def hash_color(text):
    """Deterministic color from string hash."""
    h = hashlib.md5(text.encode()).hexdigest()
    return hex2rgb(f"#{h[:6]}")


# ── palette for categories ──────────────────────────
CAT_COLORS = {
    "分析师": "#00ff88",
    "撸毛":   "#38bdf8",
    "Meme":   "#ff00aa",
    "资讯":   "#fbbf24",
    "链上数据": "#a855f7",
    "宏观":   "#fb923c",
}


def gradient(size, c1, c2, diagonal=True):
    """Two-color gradient image."""
    w, h = size
    img = Image.new("RGB", size)
    px = img.load()
    for y in range(h):
        for x in range(w):
            t = ((x / w) + (y / h)) / 2 if diagonal else (x / w)
            px[x, y] = (
                int(c1[0] + (c2[0] - c1[0]) * t),
                int(c1[1] + (c2[1] - c1[1]) * t),
                int(c1[2] + (c2[2] - c1[2]) * t),
            )
    return img


def gen_avatar(handle, out_path, size=256):
    """Square avatar: gradient bg + big initial + handle text."""
    c1 = hash_color(handle)
    c2 = tuple(min(255, int(c * 0.35 + 20)) for c in c1)

    img = gradient((size, size), c1, c2)
    d = ImageDraw.Draw(img)

    # initial(s): first 2 chars, uppercased
    label = handle.replace("0x", "").replace("_", "")[:2].upper() or handle[:2].upper()
    f = font(int(size * 0.42))
    bbox = d.textbbox((0, 0), label, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    # dark text on bright gradient
    d.text(((size - tw) / 2 - bbox[0], (size - th) / 2 - bbox[1]), label,
           font=f, fill=(10, 10, 10))

    # bottom handle
    fh = font(max(12, int(size * 0.075)), bold=False)
    hb = d.textbbox((0, 0), f"@{handle}", font=fh)
    d.text(((size - (hb[2]-hb[0]))/2, size * 0.82), f"@{handle}",
           font=fh, fill=(255, 255, 255))

    img.save(out_path, "PNG")
    return out_path


def gen_card(handle, name, category, score, bio, rank=None, out_path=None):
    """1080x1350 Instagram-story share card for one KOL."""
    W, H = 1080, 1350
    c1 = hash_color(handle)
    c2 = tuple(min(255, int(c * 0.25 + 12)) for c in c1)

    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # top gradient band
    band = gradient((W, 360), c1, c2)
    img.paste(band, (0, 0))
    d = ImageDraw.Draw(img)

    # brand bar
    d.rectangle([0, 0, W, 90], fill=(0, 0, 0))
    d.text((50, 26), "OpenMeme.art", font=font(42), fill=GREEN)
    d.text((50, 96), "币圈华语 KOL 排行榜", font=font(30, bold=False), fill=(200, 200, 200))

    if rank:
        # big rank number top-right
        rf = font(180)
        rb = d.textbbox((0, 0), f"#{rank}", font=rf)
        d.text((W - (rb[2]-rb[0]) - 60, 170), f"#{rank}", font=rf, fill=(255, 255, 255))

    # avatar circle
    av_size = 260
    av = gen_avatar(handle, os.path.join(AVATAR_DIR, "_tmp.png"), av_size)
    av = Image.open(av).convert("RGB")
    mask = Image.new("L", (av_size, av_size), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, av_size, av_size], fill=255)
    img.paste(av, (60, 420), mask)
    d = ImageDraw.Draw(img)

    # category chip
    cat_c = hex2rgb(CAT_COLORS.get(category, "#00ff88"))
    chip = category
    cf = font(32)
    cb = d.textbbox((0, 0), chip, font=cf)
    chip_w, chip_h = cb[2]-cb[0]+40, cb[3]-cb[1]+24
    d.rounded_rectangle([W-60-chip_w, 420, W-60, 420+chip_h], radius=chip_h//2, fill=cat_c)
    d.text((W-60-chip_w+20-cb[0], 420+12-cb[1]), chip, font=cf, fill=(10,10,10))

    # name + handle
    d.text((360, 470), name, font=font(64), fill=WHITE)
    d.text((360, 560), f"@{handle}", font=font(38, bold=False), fill=GREEN)

    # score bar
    d.text((60, 730), "综合评分", font=font(28, bold=False), fill=DIM)
    d.text((60, 765), f"{score}", font=font(90), fill=GREEN)
    d.text((200, 815), "/ 100", font=font(34, bold=False), fill=DIM)

    bar_x, bar_y, bar_w, bar_h = 60, 880, W - 120, 18
    d.rounded_rectangle([bar_x, bar_y, bar_x+bar_w, bar_y+bar_h], radius=9, fill=(40,40,46))
    d.rounded_rectangle([bar_x, bar_y, bar_x + int(bar_w*score/100), bar_y+bar_h], radius=9, fill=GREEN)

    # bio (wrap)
    d.text((60, 940), "简介", font=font(28, bold=False), fill=DIM)
    bf = font(34, bold=False)
    y = 985
    line = ""
    for ch in bio:
        if len(line) > 24:
            d.text((60, y), line, font=bf, fill=(200,200,200))
            y += 48
            line = ""
        line += ch
    if line:
        d.text((60, y), line, font=bf, fill=(200,200,200))

    # footer CTA
    d.rectangle([0, H-170, W, H], fill=(0, 0, 0))
    d.text((60, H-140), "完整榜单 → openmeme.art/#kol", font=font(38), fill=GREEN)
    d.text((60, H-80), "整理维护：@ruoxi01", font=font(28, bold=False), fill=DIM)

    out = out_path or os.path.join(SHARE_DIR, f"kol-{handle}.png")
    img.save(out, "PNG", optimize=True)
    try:
        os.remove(os.path.join(AVATAR_DIR, "_tmp.png"))
    except Exception:
        pass
    return out


def gen_board(entries, out_path=None):
    """1200x1600 top-N leaderboard board."""
    W, H = 1200, 1600
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # header gradient
    band = gradient((W, 200), (0, 90, 60), (10, 10, 12))
    img.paste(band, (0, 0))
    d = ImageDraw.Draw(img)

    d.text((60, 40), "OpenMeme.art", font=font(46), fill=GREEN)
    d.text((60, 105), "币圈华语区 KOL 排行榜 · TOP 10", font=font(58), fill=WHITE)
    d.text((W-460, 55), "整理 @ruoxi01", font=font(32, bold=False), fill=(190,190,190))

    y = 250
    row_h = 128
    for i, e in enumerate(entries[:10], 1):
        # rank badge
        medal = {1: "#ffd700", 2: "#c0c0c0", 3: "#cd7f32"}.get(i, "#3f3f46")
        mc = hex2rgb(medal)
        d.rounded_rectangle([60, y, 128, y+68], radius=12, fill=mc)
        d.text((82, y+14), str(i), font=font(38), fill=(10,10,10))

        # avatar
        av = Image.open(os.path.join(AVATAR_DIR, e["avatar_file"])).convert("RGB")
        av = av.resize((84, 84))
        mask = Image.new("L", (84, 84), 0)
        ImageDraw.Draw(mask).ellipse([0,0,84,84], fill=255)
        img.paste(av, (150, y-8), mask)

        # name / handle / category
        d.text((260, y), e["name"], font=font(40), fill=WHITE)
        d.text((260, y+48), f"@{e['handle']}", font=font(28, bold=False), fill=GREEN)
        cc = hex2rgb(CAT_COLORS.get(e["category"], "#00ff88"))
        d.rounded_rectangle([620, y+18, 620+len(e["category"])*32+32, y+62],
                            radius=22, fill=tuple(int(v*0.3) for v in cc))
        d.text((636, y+26), e["category"], font=font(26), fill=cc)

        # score
        sf = font(52)
        sb = d.textbbox((0,0), str(e["score"]), font=sf)
        d.text((W-60-(sb[2]-sb[0]), y-4), str(e["score"]), font=sf,
               fill=GREEN if e["score"] >= 80 else WHITE)
        d.text((W-160, y+34), "分", font=font(24, bold=False), fill=DIM)

        y += row_h
        if i < len(entries):
            d.line([(150, y-24), (W-60, y-24)], fill=(30,30,36), width=2)

    # footer
    d.rectangle([0, H-130, W, H], fill=(0,0,0))
    d.text((60, H-100), "完整榜单 + 一键发推 → openmeme.art/#kol",
           font=font(34), fill=GREEN)

    out = out_path or os.path.join(SHARE_DIR, "leaderboard-top10.png")
    img.save(out, "PNG", optimize=True)
    return out


# ── CLI ──────────────────────────────────────────────
if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "avatars"

    # load KOL data from the TS file by parsing it (simple regex)
    ts = os.path.join(PROJECT, r"data\kols.ts")
    import re
    src = open(ts, encoding="utf-8").read()

    entries = []
    for block in re.finditer(
        r'handle:\s*"([^"]+)".*?name:\s*"([^"]+)".*?category:\s*"([^"]+)".*?bio:\s*"([^"]+)".*?scores:\s*\{\s*overall:\s*(\d+)',
        src, re.S,
    ):
        h, n, c, b, s = block.groups()
        entries.append({
            "handle": h, "name": n, "category": c, "bio": b, "score": int(s),
            "avatar_file": "",
        })

    # avatar filenames follow the order in the data file
    for idx, e in enumerate(entries, 1):
        e["avatar_file"] = f"{idx:02d}-{e['handle'].lower()}.png"

    if cmd == "avatars":
        print(f"generating {len(entries)} avatars...")
        for e in entries:
            p = gen_avatar(e["handle"], os.path.join(AVATAR_DIR, e["avatar_file"]))
            print(f"  [OK] {os.path.basename(p)}")
        print("done")

    elif cmd == "card":
        handle = sys.argv[2] if len(sys.argv) > 2 else entries[0]["handle"]
        e = next((x for x in entries if x["handle"] == handle), entries[0])
        rank = int(sys.argv[3]) if len(sys.argv) > 3 else None
        p = gen_card(e["handle"], e["name"], e["category"], e["score"], e["bio"], rank=rank)
        print(f"saved: {p}")

    elif cmd == "board":
        entries.sort(key=lambda x: -x["score"])
        p = gen_board(entries)
        print(f"saved: {p}")

    else:
        print("usage: gen_kol_assets.py [avatars|card <handle> [rank]|board]")