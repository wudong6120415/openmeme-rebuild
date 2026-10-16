"""
Make comparison sheet for v3 logos (6 multi-color concepts).
"""
import os
from PIL import Image, ImageDraw, ImageFont

OUT = r"F:\deepseek\openmeme-rebuild\public\logo-concepts-v3"
SHEET_OUT = r"F:\deepseek\openmeme-rebuild\preview"
CELL = 380
PAD = 20
LABEL_W = 200
TITLE_H = 100

total_w = LABEL_W + 3 * CELL + 4 * PAD
total_h = TITLE_H + 2 * (CELL + PAD) + PAD


def find_font(size: int):
    for p in [
        r"C:\Windows\Fonts\msyhbd.ttc",
        r"C:\Windows\Fonts\msyh.ttc",
        r"C:\Windows\Fonts\segoeuib.ttf",
        r"C:\Windows\Fonts\arial.ttf",
    ]:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()


CONCEPTS = [
    ("v3-A-holographic-pepe", "A · 全息 Pepe", "彩虹渐变 · iridescent"),
    ("v3-B-synthwave-pepe",   "B · 合成波 Pepe", "复古 80s · sunset"),
    ("v3-C-multicolor-signal","C · 多彩信号气泡", "neon · 多色信号波"),
    ("v3-D-glass-cube",       "D · 液态玻璃立方体", "3D · glassmorphism"),
    ("v3-E-pop-art-pepe",     "E · 波普艺术 Pepe", "Lichtenstein · pop art"),
    ("v3-F-gradient-owl",     "F · 渐变几何猫头鹰", "几何 · 渐变 owl"),
]

COLS = 3

sheet = Image.new("RGBA", (total_w, total_h), (15, 15, 18, 255))
d = ImageDraw.Draw(sheet)

title_font = find_font(28)
sub_font = find_font(18)
label_font = find_font(20)
desc_font = find_font(16)

d.text((PAD, 18), "OpenMeme.art · LOGO 第三轮 · 多色 / 高吸引力 · 6 候选",
       font=title_font, fill=(230, 230, 230, 255))
d.text((PAD, 54), "image-01 · 多色调色板 · 渐变 / 复古 / 液态 / 波普 / 几何 等不同视觉风格",
       font=sub_font, fill=(170, 170, 170, 255))

for idx, (cid, label, desc) in enumerate(CONCEPTS):
    row = idx // COLS
    col = idx % COLS
    x = LABEL_W + PAD + col * (CELL + PAD) if col > 0 else PAD
    # Simpler: just compute by index
    x = LABEL_W + PAD + col * (CELL + PAD)
    y = TITLE_H + row * (CELL + PAD)

    # row label
    if col == 0:
        d.text((PAD, y + 12), label, font=label_font, fill=(0, 255, 136, 255))
        d.text((PAD, y + 40), desc, font=desc_font, fill=(190, 190, 190, 255))

    # image
    path = os.path.join(OUT, f"{cid}.png")
    if os.path.exists(path):
        img = Image.open(path).convert("RGBA")
        img = img.resize((CELL, CELL), Image.LANCZOS)
        sheet.paste(img, (x, y))

out_path = os.path.join(SHEET_OUT, "00-ai-comparison-v3.png")
sheet.save(out_path)
print(f"saved {out_path}  ({sheet.size})")
