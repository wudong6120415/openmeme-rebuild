"""Make a comparison sheet for the 15 KOL logos."""
import os, sys
from PIL import Image, ImageDraw, ImageFont

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

DIR = r"F:\deepseek\openmeme-rebuild\public\kol"
OUT = r"F:\deepseek\openmeme-rebuild\preview\kol-logos-sheet.png"

# 5 cols x 3 rows grid
COLS, ROWS = 5, 3
CELL = 280
PAD = 16
LABEL_H = 50
TITLE_H = 70
total_w = COLS * CELL + (COLS + 1) * PAD + 200  # 200 for left labels
total_h = TITLE_H + ROWS * (CELL + LABEL_H + PAD) + PAD

def find_font(size):
    for p in [r"C:\Windows\Fonts\msyhbd.ttc", r"C:\Windows\Fonts\msyh.ttc",
              r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arial.ttf"]:
        if os.path.exists(p):
            try: return ImageFont.truetype(p, size)
            except: pass
    return ImageFont.load_default()

sheet = Image.new("RGBA", (total_w, total_h), (15, 15, 18, 255))
d = ImageDraw.Draw(sheet)
title_font = find_font(28)
label_font = find_font(20)
handle_font = find_font(14)

d.text((PAD, 18), "OpenMeme.art · 15 个 KOL 推特账号 LOGO", font=title_font, fill=(230, 230, 230, 255))

projects = [
    ("01-paboxoxyz",       "PABOXX",       3,  "Pabox"),
    ("02-eloscapeHQ",     "ELOSCAPE",     3,  "Eloscape"),
    ("03-forevercultfund", "FOREVERCULT",  4,  "Forever Cult"),
    ("04-LPPoolParty",     "LP POOL",      6,  "LP Pool Party"),
    ("05-metricxyz",       "METRIC",       8,  "Metric"),
    ("06-FissionXYZ",      "FISSION",      7,  "Fission"),
    ("07-TitanExchange_",  "TITAN",        7,  "Titan Exchange"),
    ("08-instinct_xyz",    "INSTINCT",     9,  "Instinct"),
    ("09-stonkrobbers",    "STONKROBBERS", 5,  "StonkRobbers"),
    ("10-arcus_xyz",       "ARCUS",        6,  "Arcus"),
    ("11-Lighter_xyz",     "LIGHTER",      8,  "Lighter"),
    ("12-ponsdotfamily",   "PONS",         5,  "Pons"),
    ("13-fablesfi",        "FABLES",       4,  "Fables"),
    ("14-meridiandotxyz",  "MERIDIAN",     4,  "Meridian"),
    ("15-pairdotfund",     "PAIR",         5,  "Pair"),
]

y = TITLE_H
for row in range(ROWS):
    x = PAD
    for col in range(COLS):
        idx = row * COLS + col
        if idx >= len(projects): break
        pid, name, score, twitter = projects[idx]
        # Logo
        path = os.path.join(DIR, f"{pid}.png")
        if os.path.exists(path):
            img = Image.open(path).convert("RGBA").resize((CELL, CELL), Image.LANCZOS)
            sheet.paste(img, (x, y))
        # Label below
        d.text((x + 6, y + CELL + 4), f"#{idx+1:02d} @{twitter}  {score}/10",
               font=handle_font, fill=(0, 255, 136, 255) if score >= 7 else (180, 180, 180, 255))
        d.text((x + 6, y + CELL + 24), name, font=label_font, fill=(240, 240, 240, 255))
        x += CELL + PAD
    y += CELL + LABEL_H + PAD

sheet.save(OUT)
print(f"saved: {OUT}  ({sheet.size})")
