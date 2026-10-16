"""V4 comparison sheet: 6 multi-element logos."""
import os
from PIL import Image, ImageDraw, ImageFont

OUT = r"F:\deepseek\openmeme-rebuild\public\logo-concepts-v4"
SHEET_OUT = r"F:\deepseek\openmeme-rebuild\preview"
CELL = 380
PAD = 20
LABEL_W = 220
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
    ("v4-G-astronaut-pepe",   "G · Pepe 宇航员",   "空投币 + 绵羊星球 + 开放头盔"),
    ("v4-H-treasure-chest",   "H · 打开的宝箱",    "Pepe 探出头 + 金币 + 羊毛"),
    ("v4-I-pepe-shearing-cloud","I · Pepe 剪云",   "云嘴张开 + 下金币雨 + 剪羊毛"),
    ("v4-J-pepe-rocket",      "J · Pepe 火箭",     "空投尾流 + 开放头盔 + 绵羊星座"),
    ("v4-K-bubble-volcano",   "K · 气泡火山",      "气泡喷发 + 开放嘴 + 绵羊底座"),
    ("v4-L-pepe-fishing",     "L · Pepe 钓鱼",     "钓降落伞币 + 开放曲线"),
]

COLS = 3
sheet = Image.new("RGBA", (total_w, total_h), (15, 15, 18, 255))
d = ImageDraw.Draw(sheet)

title_font = find_font(28)
sub_font = find_font(16)
label_font = find_font(20)
desc_font = find_font(14)

d.text((PAD, 18), "OpenMeme.art · LOGO 第四轮 · 多元素叙事 · 6 候选",
       font=title_font, fill=(230, 230, 230, 255))
d.text((PAD, 54), "每个图都包含: Open + Meme (Pepe) + 空投 (parachute tokens) + 撸毛 (sheep / farm)",
       font=sub_font, fill=(170, 170, 170, 255))

for idx, (cid, label, desc) in enumerate(CONCEPTS):
    row = idx // COLS
    col = idx % COLS
    x = LABEL_W + PAD + col * (CELL + PAD)
    y = TITLE_H + row * (CELL + PAD)

    if col == 0:
        d.text((PAD, y + 12), label, font=label_font, fill=(0, 255, 136, 255))
        d.text((PAD, y + 40), desc, font=desc_font, fill=(190, 190, 190, 255))

    path = os.path.join(OUT, f"{cid}.png")
    if os.path.exists(path):
        img = Image.open(path).convert("RGBA")
        img = img.resize((CELL, CELL), Image.LANCZOS)
        sheet.paste(img, (x, y))

out_path = os.path.join(SHEET_OUT, "00-ai-comparison-v4.png")
sheet.save(out_path)
print(f"saved {out_path}  ({sheet.size})")
