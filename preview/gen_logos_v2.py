"""
Generate 4 NEW high-quality LOGO concepts with sophisticated prompts.
Uses both image-01 and image-01-live for comparison.
"""
import os, sys, json, time, urllib.request, urllib.error

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

API_KEY = "sk-cp-9ebPyN9XSpxje0C6MZsXPQvZnFQKdug3Qe7gjuGJykm_jgCfMSobFi0CdoBnx1viTQctRD1-Y7v9ql0DO-9sIROF_DpsGYA7zmjRezSJjYICoL4OgpEMR_k"
ENDPOINT = "https://api.minimax.cn/v1/image_generation"
OUT_DIR = r"F:\deepseek\openmeme-rebuild\public\logo-concepts-v2"
os.makedirs(OUT_DIR, exist_ok=True)


def call(model: str, prompt: str):
    body = json.dumps({
        "model": model,
        "prompt": prompt,
        "aspect_ratio": "1:1",
        "response_format": "url",
    }).encode("utf-8")
    req = urllib.request.Request(
        ENDPOINT, data=body,
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = json.loads(resp.read())
    return data["data"]["image_urls"][0]


def download(url, path):
    with urllib.request.urlopen(url, timeout=30) as r:
        with open(path, "wb") as f:
            f.write(r.read())


# ─────────────────────────────────────────────
# 4 NEW concepts (more sophisticated direction)
# Each: image-01 + image-01-live = 2 versions
# ─────────────────────────────────────────────
CONCEPTS = [
    {
        "id": "A-origami-pepe",
        "label": "A · 折纸 Pepe (展开)",
        "prompt": (
            "Professional brand identity logo mark for a cryptocurrency memecoin aggregator platform, "
            "modern minimalist design language inspired by Pentagram and Chermayeff & Geismar, "
            "geometric origami-folded Pepe-style frog head in neon green (#00ff88) on pure black background, "
            "subtle paper-fold shading and precise angular triangular planes suggesting unfolding motion, "
            "sophisticated negative space, vector-perfect crisp edges, distinctive silhouette, "
            "scales beautifully from 16x16 favicon to large display, "
            "brand-ready corporate identity quality, no text, no watermark"
        ),
    },
    {
        "id": "B-negative-om",
        "label": "B · 负空间 OM 字母",
        "prompt": (
            "Professional brand identity logo, bold letter O in neon green (#00ff88) with the letter M "
            "cleverly formed in negative space inside the O, two small meme-style eyes integrated into "
            "the design as part of the M letterform, pure black background, sophisticated typography, "
            "geometric precision, vector-perfect edges, distinctive silhouette, scales to favicon, "
            "Pentagram-quality brand identity, no text, no watermark"
        ),
    },
    {
        "id": "C-signal-wave",
        "label": "C · 气泡 + 信号波",
        "prompt": (
            "Professional brand identity logo, modern speech bubble in neon green (#00ff88) merging with "
            "a stylized sound wave and signal pulse radiating outward, two meme eyes inside the bubble, "
            "the wave lines suggesting viral spread and signal transmission, pure black background, "
            "sophisticated composition with proper visual weight, vector-perfect design, crypto-native "
            "aesthetic, Pentagram quality, brand-ready corporate identity, no text, no watermark"
        ),
    },
    {
        "id": "D-owl-geometric",
        "label": "D · 几何猫头鹰 2.0",
        "prompt": (
            "Professional brand identity logo, sophisticated low-poly geometric owl face in neon green "
            "(#00ff88) with meme-style X eyes, precise angular triangular planes construction, "
            "pure black background, modern minimalist design language inspired by Saul Bass, "
            "distinctive silhouette, vector-perfect edges, scales to 16x16 favicon, "
            "modern crypto brand aesthetic, brand-ready quality, no text, no watermark"
        ),
    },
]


results = []
for c in CONCEPTS:
    print(f"\n=== {c['label']} ===")
    for model, suffix in [("image-01", "std"), ("image-01-live", "live")]:
        filename = f"v2-{c['id']}-{suffix}.png"
        path = os.path.join(OUT_DIR, filename)
        try:
            url = call(model, c["prompt"])
            download(url, path)
            size = os.path.getsize(path)
            print(f"  [OK] {model:18} -> {filename} ({size//1024} KB)")
            results.append({"file": filename, "label": c["label"], "model": model})
        except Exception as e:
            print(f"  [ERR] {model}: {str(e)[:120]}")
        time.sleep(2)

print(f"\n=== Done: {len(results)} images ===")
for r in results:
    print(f"  {r['file']:40} {r['label']} ({r['model']})")
