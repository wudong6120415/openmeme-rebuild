"""
Generate v3 LOGO concepts with MULTI-COLOR palettes and richer visual styles.
Use both image-01 (vector) and image-01-live (richer) to see what works best.
"""
import os, sys, json, time, urllib.request, urllib.error

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

API_KEY = "sk-cp-9ebPyN9XSpxje0C6MZsXPQvZnFQKdug3Qe7gjuGJykm_jgCfMSobFi0CdoBnx1viTQctRD1-Y7v9ql0DO-9sIROF_DpsGYA7zmjRezSJjYICoL4OgpEMR_k"
ENDPOINT = "https://api.minimax.cn/v1/image_generation"
OUT_DIR = r"F:\deepseek\openmeme-rebuild\public\logo-concepts-v3"
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
        return json.loads(resp.read())["data"]["image_urls"][0]


def download(url, path):
    with urllib.request.urlopen(url, timeout=30) as r:
        with open(path, "wb") as f:
            f.write(r.read())


# ─────────────────────────────────────────────
# 6 new concepts with RICH COLOR PALETTES
# ─────────────────────────────────────────────
CONCEPTS = [
    {
        "id": "v3-A-holographic-pepe",
        "label": "A · 全息 Pepe (彩虹渐变)",
        "prompt": (
            "Professional brand identity logo mark, geometric origami-folded Pepe frog head "
            "with holographic iridescent finish, shifting gradients from neon green (#00ff88) "
            "through cyan (#00d4ff) to magenta (#ff00aa) to purple (#a855f7), pure black background, "
            "vector-perfect crisp edges, distinctive silhouette, scales to favicon, "
            "modern crypto brand identity, no text, no watermark"
        ),
    },
    {
        "id": "v3-B-synthwave-pepe",
        "label": "B · 合成波 Pepe (复古渐变)",
        "prompt": (
            "Professional brand identity logo mark, geometric Pepe-style character in synthwave "
            "retro 80s aesthetic, gradient sunset from deep purple (#1e1b4b) to hot pink (#ff1493) "
            "to orange (#ff6b35), the Pepe face in neon green (#00ff88) with glowing rim light, "
            "retro wave aesthetic, professional brand design, vector-perfect, no text, no watermark"
        ),
    },
    {
        "id": "v3-C-multicolor-signal",
        "label": "C · 多彩信号气泡",
        "prompt": (
            "Professional brand identity logo mark, modern speech bubble with multi-color neon "
            "signal waves radiating outward, gradient from neon green to cyan to magenta, "
            "the bubble has two glowing meme eyes, dark background with subtle gradient, "
            "sophisticated cyberpunk aesthetic, vector-perfect design, distinctive silhouette, "
            "no text, no watermark"
        ),
    },
    {
        "id": "v3-D-glass-cube",
        "label": "D · 液态玻璃立方体",
        "prompt": (
            "Professional brand identity logo mark, isometric 3D cube with liquid glass "
            "glassmorphism effect, gradient from neon green to cyan to purple, with a meme "
            "character face visible inside the translucent cube, deep dark background with "
            "subtle color gradient, sophisticated modern design, vector-perfect edges, "
            "no text, no watermark"
        ),
    },
    {
        "id": "v3-E-pop-art-pepe",
        "label": "E · 波普艺术 Pepe",
        "prompt": (
            "Professional brand identity logo mark, Pepe-style frog head in pop art comic style "
            "with halftone dots, vibrant colors including neon green, hot pink, cyan, yellow, "
            "bold black outlines, comic book Lichtenstein aesthetic, distinctive design, "
            "vector-perfect, modern brand identity, no text, no watermark"
        ),
    },
    {
        "id": "v3-F-gradient-owl",
        "label": "F · 渐变几何猫头鹰",
        "prompt": (
            "Professional brand identity logo mark, geometric owl face with vibrant gradient "
            "from neon green (#00ff88) through cyan to magenta, X-shaped meme eyes in contrasting "
            "bright color, geometric triangular plane construction, dark background with subtle "
            "starry dot pattern, sophisticated crypto brand design, vector-perfect, "
            "no text, no watermark"
        ),
    },
]


results = []
for c in CONCEPTS:
    print(f"\n=== {c['label']} ===")
    # Just image-01 this round (cleaner vector logos with rich colors)
    try:
        url = call("image-01", c["prompt"])
        path = os.path.join(OUT_DIR, f"{c['id']}.png")
        download(url, path)
        size = os.path.getsize(path)
        print(f"  [OK] {c['id']}.png ({size//1024} KB)")
        results.append({"file": f"{c['id']}.png", "label": c["label"]})
    except Exception as e:
        print(f"  [ERR] {str(e)[:120]}")
    time.sleep(2)

print(f"\n=== Done: {len(results)} images ===")
for r in results:
    print(f"  {r['file']:40} {r['label']}")
