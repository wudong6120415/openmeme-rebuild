"""
Create comparison sheet of 8 AI-generated logos.
Fixed layout: label column on left + 2 variant columns.
"""
import os
from PIL import Image, ImageDraw, ImageFont

OUT = r"F:\deepseek\openmeme-rebuild\public\logo-concepts"
SHEET_OUT = r"F:\deepseek\openmeme-rebuild\preview"
CELL = 360
PAD = 20
LABEL_W = 240      # left column for labels
COLS = 3           # label + 2 variants
ROWS = 4           # 4 concepts
TITLE_H = 70
VARIANT_LABEL_H = 30

total_w = LABEL_W + 2 * CELL + 3 * PAD
total_h = TITLE_H + VARIANT_LABEL_H + ROWS * (CELL + PAD) + PAD


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
    ("01-viral-bubble", "1 · 病毒气泡", "Speech bubble 爆开"),
    ("02-om-monogram", "2 · OM 字母融合", "Bold O + 内嵌 meme 表情"),
    ("03-open-eyes", "3 · 睁开的大眼", "Pepe 风格 · 醒着的 meme"),
    ("04-meme-key", "4 · Meme 钥匙", "钥匙解锁 meme"),
]

sheet = Image.new("RGBA", (total_w, total_h), (15, 15, 18, 255))
d = ImageDraw.Draw(sheet)

title_font = find_font(32)
label_font = find_font(22)
sub_font = find_font(18)
variant_font = find_font(16)

# title
d.text((PAD, 16), "OpenMeme.art · AI 生成的 LOGO 候选 (8 张)", font=title_font, fill=(230, 230, 230, 255))

# variant column headers
y0 = TITLE_H
d.text((LABEL_W + PAD, y0 + 4), "Variant A", font=variant_font, fill=(150, 150, 150, 255))
d.text((LABEL_W + PAD + CELL + PAD, y0 + 4), "Variant B", font=variant_font, fill=(150, 150, 150, 255))

y = y0 + VARIANT_LABEL_H
for cid, label, sub in CONCEPTS:
    # row label
    d.text((PAD, y + 12), label, font=label_font, fill=(0, 255, 136, 255))
    d.text((PAD, y + 42), sub, font=sub_font, fill=(190, 190, 190, 255))

    # two variants
    for i, suffix in enumerate(["a", "b"]):
        path = os.path.join(OUT, f"ai-{cid}-{suffix}.png")
        if os.path.exists(path):
            img = Image.open(path).convert("RGBA")
            img = img.resize((CELL, CELL), Image.LANCZOS)
            x = LABEL_W + PAD + i * (CELL + PAD)
            sheet.paste(img, (x, y))

    y += CELL + PAD

out_path = os.path.join(SHEET_OUT, "00-ai-comparison.png")
sheet.save(out_path)
print(f"saved {out_path}  ({sheet.size})")
