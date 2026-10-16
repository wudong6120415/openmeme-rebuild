"""
Make comparison sheet for v2 logos (4 concepts x 2 models).
"""
import os
from PIL import Image, ImageDraw, ImageFont

OUT = r"F:\deepseek\openmeme-rebuild\public\logo-concepts-v2"
SHEET_OUT = r"F:\deepseek\openmeme-rebuild\preview"
CELL = 380
PAD = 20
LABEL_W = 220
TITLE_H = 80
SUBHEAD_H = 32
ROWS = 4

total_w = LABEL_W + 2 * CELL + 3 * PAD
total_h = TITLE_H + SUBHEAD_H + ROWS * (CELL + PAD) + PAD


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
    ("A-origami-pepe", "A · 折纸 Pepe", "几何折纸 · 展开的 Pepe"),
    ("B-negative-om", "B · 负空间 OM", "O 内嵌 M 字母 · 负空间"),
    ("C-signal-wave", "C · 气泡 + 信号波", "Speech bubble + 病毒扩散波"),
    ("D-owl-geometric", "D · 几何猫头鹰 2.0", "低多边形几何 owl"),
]

sheet = Image.new("RGBA", (total_w, total_h), (15, 15, 18, 255))
d = ImageDraw.Draw(sheet)

title_font = find_font(30)
label_font = find_font(22)
sub_font = find_font(18)
col_font = find_font(18)

d.text((PAD, 16), "OpenMeme.art · LOGO 第二轮 · 4 概念 × 2 模型 (8 张)", font=title_font, fill=(230, 230, 230, 255))
d.text((PAD, 50), "image-01 = 矢量风  ·  image-01-live = 实时高保真 (更大)", font=sub_font, fill=(170, 170, 170, 255))

y0 = TITLE_H + SUBHEAD_H - SUBHEAD_H + 10
d.text((LABEL_W + PAD, y0), "image-01 (矢量)", font=col_font, fill=(150, 150, 150, 255))
d.text((LABEL_W + PAD + CELL + PAD, y0), "image-01-live (高保真)", font=col_font, fill=(150, 150, 150, 255))

y = TITLE_H + SUBHEAD_H
for cid, label, sub in CONCEPTS:
    d.text((PAD, y + 12), label, font=label_font, fill=(0, 255, 136, 255))
    d.text((PAD, y + 42), sub, font=sub_font, fill=(190, 190, 190, 255))

    for i, suffix in enumerate(["std", "live"]):
        path = os.path.join(OUT, f"v2-{cid}-{suffix}.png")
        if os.path.exists(path):
            img = Image.open(path).convert("RGBA")
            img = img.resize((CELL, CELL), Image.LANCZOS)
            x = LABEL_W + PAD + i * (CELL + PAD)
            sheet.paste(img, (x, y))

    y += CELL + PAD

out_path = os.path.join(SHEET_OUT, "00-ai-comparison-v2.png")
sheet.save(out_path)
print(f"saved {out_path}  ({sheet.size})")
