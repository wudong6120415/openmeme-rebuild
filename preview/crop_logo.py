"""
Crop the astronaut logo to focus on Pepe character (for small-size use).
This makes the header / favicon show the character clearly instead of being a blur.
"""
import os, sys
from PIL import Image

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

PROJECT = r"F:\deepseek\openmeme-rebuild"
SRC = os.path.join(PROJECT, r"public\logo-concepts-v4\v4-G-astronaut-pepe.png")
PUB = os.path.join(PROJECT, r"public")

master = Image.open(SRC).convert("RGBA")
W, H = master.size
print(f"Source: {W}x{H}")

# The Pepe astronaut is centered-left in the original image.
# Looking at the image: Pepe takes roughly center 60% of the image,
# with the helmet/character roughly in the middle-bottom area.

# Strategy: crop to the central character area, then resize
# Original 1024x1024, character occupies roughly:
#   x: 180 to 750 (~570 px wide)
#   y: 200 to 850 (~650 px tall)

crop_box = (140, 200, 780, 850)   # left, top, right, bottom
cropped = master.crop(crop_box)
cw, ch = cropped.size
print(f"Cropped: {cw}x{ch}")

# Add padding (square aspect with transparent border)
target = 600
scale = target / max(cw, ch)
new_w = int(cw * scale)
new_h = int(ch * scale)
resized = cropped.resize((new_w, new_h), Image.LANCZOS)

# Center on transparent canvas
canvas = Image.new("RGBA", (target, target), (0, 0, 0, 0))
x_off = (target - new_w) // 2
y_off = (target - new_h) // 2
canvas.paste(resized, (x_off, y_off), resized)

# Save variants
# 1. PNG with transparent background (for use anywhere)
header_logo = os.path.join(PUB, "logo-header.png")
canvas.save(header_logo, "PNG")
print(f"  [OK] {header_logo}  ({os.path.getsize(header_logo)//1024} KB)")

# 2. ICO for favicon (smaller still)
favicon_small = canvas.resize((64, 64), Image.LANCZOS)
favicon_path = os.path.join(PUB, "favicon.png")
favicon_small.save(favicon_path, "PNG")
print(f"  [OK] {favicon_path}  ({os.path.getsize(favicon_path)//1024} KB)")

# 3. Apple touch icon (180x180)
apple = canvas.resize((180, 180), Image.LANCZOS)
apple_path = os.path.join(PUB, "apple-touch-icon.png")
apple.save(apple_path, "PNG")
print(f"  [OK] {apple_path}  ({os.path.getsize(apple_path)//1024} KB)")

print("\n=== Done. logo-header.png is now optimized for small-size use ===")
