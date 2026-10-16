"""
Generate 4 OpenMeme LOGO concepts via MiniMax image-01 API.
Each concept gets 2 variations for more choice.

Output: F:\deepseek\openmeme-rebuild\public\logo-concepts\ai-XX-name.png
"""
import os, sys, json, time, urllib.request, urllib.error

# Force UTF-8 stdout for Windows console
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

API_KEY = "sk-cp-9ebPyN9XSpxje0C6MZsXPQvZnFQKdug3Qe7gjuGJykm_jgCfMSobFi0CdoBnx1viTQctRD1-Y7v9ql0DO-9sIROF_DpsGYA7zmjRezSJjYICoL4OgpEMR_k"
ENDPOINT = "https://api.minimax.cn/v1/image_generation"
OUT_DIR = r"F:\deepseek\openmeme-rebuild\public\logo-concepts"
os.makedirs(OUT_DIR, exist_ok=True)


# ─────────────────────────────────────────────
# 4 concepts × 2 variations = 8 images
# ─────────────────────────────────────────────
CONCEPTS = [
    {
        "id": "01-viral-bubble",
        "label": "1 · 病毒气泡",
        "prompts": [
            # variation A — clean rays
            "Minimal flat vector logo design, neon green (#00ff88) speech bubble with classic meme face inside (two angular >_< eyes and small smile), 8 short straight burst rays radiating outward from the bubble, pure black background, simple geometric shapes, modern crypto website favicon style, professional and clean, 1024x1024",
            # variation B — softer rays, gradient
            "Minimal logo, neon green speech bubble with >_< meme eyes and smile, soft radial burst rays around it glowing outward, dark background, modern crypto mascot, simple shapes, professional, clean vector style",
        ],
    },
    {
        "id": "02-om-monogram",
        "label": "2 · OM 字母融合",
        "prompts": [
            "Minimal flat vector logo design, bold neon green (#00ff88) letter O rendered as a thick ring, two vertical oval meme eyes inside the ring, a zigzag M-shaped mouth that forms the letter M, tiny accent dot at top of the O suggesting an opening, pure black background, professional typographic logo, modern crypto brand identity, clean simple geometric shapes, 1024x1024",
            "Minimal logo, bold neon green capital letter O as a ring, meme face inside with eyes and M-shaped mouth, small accent dot on top of the O representing an opening, dark background, clean professional typography, modern crypto identity",
        ],
    },
    {
        "id": "03-open-eyes",
        "label": "3 · 睁开的大眼",
        "prompts": [
            "Minimal flat vector logo design, two large round neon green (#00ff88) wide-open cartoon eyes with black pupils and small white highlights, subtle smile underneath, Pepe-inspired friendly mascot style, pure black background, simple geometric shapes, modern crypto brand identity, 1024x1024",
            "Minimal logo, two big round neon green cartoon eyes wide open with black pupils and tiny white highlights, gentle smile below, Pepe style friendly mascot, dark background, clean shapes, modern crypto identity",
        ],
    },
    {
        "id": "04-meme-key",
        "label": "4 · Meme 钥匙",
        "prompts": [
            "Minimal flat vector logo design, classic key shape in neon green (#00ff88) lying horizontally, the round bow (head) of the key contains a cute small meme face with two eyes and a tiny smile, key teeth on the right side, pure black background, simple geometric shapes, modern crypto website favicon style, professional and clean, 1024x1024",
            "Minimal logo, neon green classic key shape horizontal, the round key bow has a small meme face with eyes and smile, key teeth on right, dark background, clean vector style, modern crypto identity",
        ],
    },
]


def call_api(prompt: str) -> str:
    """Call MiniMax image-01, return image URL."""
    body = json.dumps({
        "model": "image-01",
        "prompt": prompt,
        "aspect_ratio": "1:1",
        "response_format": "url",
    }).encode("utf-8")

    req = urllib.request.Request(
        ENDPOINT,
        data=body,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = json.loads(resp.read())
    urls = data.get("data", {}).get("image_urls", [])
    if not urls:
        raise RuntimeError(f"no image url in response: {data}")
    return urls[0]


def download(url: str, path: str):
    with urllib.request.urlopen(url, timeout=30) as resp:
        with open(path, "wb") as f:
            f.write(resp.read())


# ─────────────────────────────────────────────
# Run
# ─────────────────────────────────────────────
results = []
for c in CONCEPTS:
    print(f"\n=== {c['label']} ===")
    for i, prompt in enumerate(c["prompts"], start=1):
        suffix = chr(ord("a") + i - 1)
        filename = f"ai-{c['id']}-{suffix}.png"
        path = os.path.join(OUT_DIR, filename)
        try:
            url = call_api(prompt)
            download(url, path)
            size = os.path.getsize(path)
            print(f"  [OK] {filename} ({size//1024} KB)")
            results.append({"file": filename, "label": c["label"], "var": suffix})
        except urllib.error.HTTPError as e:
            err_body = e.read().decode('utf-8', errors='ignore')[:200]
            print(f"  [ERR] HTTP {e.code}: {err_body}")
        except Exception as e:
            print(f"  [ERR] {type(e).__name__}: {str(e)[:200]}")
        time.sleep(2)  # be polite to the API

print(f"\n=== Done: {len(results)} images ===")
for r in results:
    print(f"  {r['file']}  ({r['label']} - var {r['var']})")
