"""
Render 4 OpenMeme logo concepts as PNGs using Pillow,
plus a comparison sheet showing all 4 with labels.

V2 — fixes:
- Use CJK font for Chinese labels (Microsoft YaHei)
- Concept 1 (Viral Bubble): proper rounded speech bubble
- Concept 3 (Open Eyes): make smile smaller, more meme-like
- Concept 4 (Meme Key): bigger meme face, cleaner key
"""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = r"F:\deepseek\openmeme-rebuild\preview"
SIZE = 400

BG = (10, 10, 10, 255)
GREEN = (0, 255, 136, 255)
BLACK = (10, 10, 10, 255)


def find_font(size: int, bold: bool = False):
    """CJK-capable fonts first, then Latin fallbacks."""
    candidates = [
        r"C:\Windows\Fonts\msyhbd.ttc",   # Microsoft YaHei Bold
        r"C:\Windows\Fonts\msyh.ttc",     # Microsoft YaHei
        r"C:\Windows\Fonts\simhei.ttf",
        r"C:\Windows\Fonts\simsun.ttc",
        r"C:\Windows\Fonts\segoeuib.ttf",
        r"C:\Windows\Fonts\arial.ttf",
    ]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()


def make_canvas() -> Image.Image:
    return Image.new("RGBA", (SIZE, SIZE), BG)


# ────────────────────────────────────────────────────────────
# Concept 1: Viral Speech Bubble (improved)
# ────────────────────────────────────────────────────────────
def render_viral_bubble() -> Image.Image:
    img = make_canvas()
    d = ImageDraw.Draw(img)
    cx, cy = SIZE // 2, SIZE // 2

    # burst rays (drawn first so they go behind bubble if overlap)
    rays = [
        (cx, 24, cx, 60),
        (SIZE - 50, 80, SIZE - 90, 110),
        (SIZE - 24, cy, SIZE - 60, cy),
        (SIZE - 50, SIZE - 80, SIZE - 90, SIZE - 110),
        (50, 80, 90, 110),
        (24, cy, 60, cy),
        (50, SIZE - 80, 90, SIZE - 110),
    ]
    for x1, y1, x2, y2 in rays:
        d.line([(x1, y1), (x2, y2)], fill=GREEN, width=7)

    # speech bubble: rounded rectangle using rounded_rectangle if available
    bx0, by0, bx1, by1 = 80, 80, SIZE - 80, 240
    bubble_radius = 50
    # rounded rectangle
    d.rounded_rectangle([bx0, by0, bx1, by1], radius=bubble_radius, fill=GREEN)

    # tail at the bottom-left
    tail = [(bx0 + 70, by1 - 4), (bx0 + 60, by1 + 36), (bx0 + 110, by1 - 4)]
    d.polygon(tail, fill=GREEN)
    # mask the seam between bubble and tail
    d.rectangle([bx0 + 60, by1 - 6, bx0 + 110, by1 + 2], fill=GREEN)

    # meme face: ">_<" eyes (chevrons)
    # left eye
    d.polygon([
        (cx - 60, cy - 30), (cx - 36, cy), (cx - 12, cy - 30),
        (cx - 22, cy - 26), (cx - 36, cy - 10), (cx - 50, cy - 26)
    ], fill=BLACK)
    # right eye
    d.polygon([
        (cx + 12, cy - 30), (cx + 36, cy), (cx + 60, cy - 30),
        (cx + 50, cy - 26), (cx + 36, cy - 10), (cx + 22, cy - 26)
    ], fill=BLACK)
    # smile (curve up at edges, like :3)
    d.arc([cx - 40, cy + 16, cx + 40, cy + 70], start=0, end=180, fill=BLACK, width=8)

    return img


# ────────────────────────────────────────────────────────────
# Concept 2: OM Monogram with Meme Face
# ────────────────────────────────────────────────────────────
def render_om_monogram() -> Image.Image:
    img = make_canvas()
    d = ImageDraw.Draw(img)
    cx, cy = SIZE // 2, SIZE // 2

    # Bold "O" ring (donut)
    d.ellipse([cx - 130, cy - 130, cx + 130, cy + 130], fill=GREEN)
    d.ellipse([cx - 84, cy - 84, cx + 84, cy + 84], fill=BLACK)

    # Meme eyes (vertical ovals)
    d.ellipse([cx - 38, cy - 36, cx - 8, cy + 16], fill=GREEN)
    d.ellipse([cx + 8, cy - 36, cx + 38, cy + 16], fill=GREEN)

    # M-shaped mouth (zigzag)
    pts = [(cx - 56, cy + 76), (cx - 38, cy + 48), (cx - 18, cy + 76),
           (cx, cy + 56), (cx + 18, cy + 76), (cx + 38, cy + 48), (cx + 56, cy + 76)]
    d.line(pts + [pts[0]], fill=GREEN, width=10, joint="curve")

    # accent dot at top of O (the "open" mark)
    d.ellipse([cx - 8, cy - 138, cx + 8, cy - 122], fill=GREEN)
    return img


# ────────────────────────────────────────────────────────────
# Concept 3: Open Eyes (Pepe-like)
# ────────────────────────────────────────────────────────────
def render_open_eyes() -> Image.Image:
    img = make_canvas()
    d = ImageDraw.Draw(img)

    # Left eye (large rounded)
    d.ellipse([56, 96, 196, 256], fill=GREEN)
    d.ellipse([100, 152, 152, 212], fill=BLACK)
    d.ellipse([118, 160, 134, 176], fill=GREEN)

    # Right eye (mirrored)
    d.ellipse([SIZE - 196, 96, SIZE - 56, 256], fill=GREEN)
    d.ellipse([SIZE - 152, 152, SIZE - 100, 212], fill=BLACK)
    d.ellipse([SIZE - 134, 160, SIZE - 118, 176], fill=GREEN)

    # Subtle smile
    d.arc([(140, 280), (SIZE - 140, 340)], start=0, end=180, fill=GREEN, width=10)
    return img


# ────────────────────────────────────────────────────────────
# Concept 4: Meme Key (improved: bigger face, cleaner key)
# ────────────────────────────────────────────────────────────
def render_key_meme() -> Image.Image:
    img = make_canvas()
    d = ImageDraw.Draw(img)

    # Key bow (top circle, ring) — make it bigger and the face more prominent
    bow_cx, bow_cy = 130, 150
    bow_outer = 80
    bow_inner = 60
    d.ellipse([bow_cx - bow_outer, bow_cy - bow_outer, bow_cx + bow_outer, bow_cy + bow_outer], outline=GREEN, width=22)
    # accent inner ring (lighter)
    d.ellipse([bow_cx - 14, bow_cy - 14, bow_cx + 14, bow_cy + 14], fill=GREEN)

    # Key shaft (horizontal bar)
    d.rectangle([bow_cx + bow_outer - 4, bow_cy - 16, SIZE - 60, bow_cy + 16], fill=GREEN)

    # Key teeth (2)
    d.rectangle([SIZE - 110, bow_cy + 16, SIZE - 90, bow_cy + 50], fill=GREEN)
    d.rectangle([SIZE - 80, bow_cy + 16, SIZE - 60, bow_cy + 60], fill=GREEN)

    # Meme face inside the bow (well-sized, prominent)
    # left eye
    d.ellipse([bow_cx - 32, bow_cy - 22, bow_cx - 14, bow_cy + 4], fill=GREEN)
    # right eye
    d.ellipse([bow_cx + 14, bow_cy - 22, bow_cx + 32, bow_cy + 4], fill=GREEN)
    # smile
    d.arc([(bow_cx - 22, bow_cy + 14), (bow_cx + 22, bow_cy + 50)], start=0, end=180, fill=GREEN, width=6)
    return img


# ────────────────────────────────────────────────────────────
# Sheet
# ────────────────────────────────────────────────────────────
LABELS = [
    ("1 · 病毒气泡", "Speech bubble 爆开 · meme 扩散"),
    ("2 · OM 字母融合", "Bold O + 内嵌 meme 表情"),
    ("3 · 睁开的大眼", "Pepe 风格 · 醒着的 meme"),
    ("4 · Meme 钥匙", "钥匙解锁 meme · 开 = 通"),
]

SHEET_COLS = 4
SHEET_PAD = 24
LABEL_H = 60


def render_sheet():
    sheet_w = SHEET_COLS * SIZE + (SHEET_COLS + 1) * SHEET_PAD
    sheet_h = SIZE + 2 * SHEET_PAD + LABEL_H + 50
    sheet = Image.new("RGBA", (sheet_w, sheet_h), (15, 15, 18, 255))
    d = ImageDraw.Draw(sheet)

    title_font = find_font(36, bold=True)
    label_font = find_font(26, bold=True)
    sub_font = find_font(20)

    d.text((SHEET_PAD, 10), "OpenMeme.art · LOGO 候选方案 4 选 1",
           font=title_font, fill=(230, 230, 230, 255))

    concepts = [
        render_viral_bubble(),
        render_om_monogram(),
        render_open_eyes(),
        render_key_meme(),
    ]

    for i, (img, (title, sub)) in enumerate(zip(concepts, LABELS)):
        x = SHEET_PAD + i * (SIZE + SHEET_PAD)
        y = SHEET_PAD + 30
        sheet.paste(img, (x, y))
        d.text((x + 12, y + SIZE + 12), title, font=label_font, fill=GREEN)
        d.text((x + 12, y + SIZE + 46), sub, font=sub_font, fill=(190, 190, 190, 255))

    return sheet


if __name__ == "__main__":
    concepts = [
        (render_viral_bubble(), "01-viral-bubble.png"),
        (render_om_monogram(), "02-om-monogram.png"),
        (render_open_eyes(), "03-open-eyes.png"),
        (render_key_meme(), "04-key-meme.png"),
    ]
    for img, name in concepts:
        img.save(os.path.join(OUT, name))
        print(f"saved {name}")

    sheet = render_sheet()
    sheet.save(os.path.join(OUT, "00-comparison.png"))
    print(f"saved 00-comparison.png  ({sheet.size})")
