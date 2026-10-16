"""
Generate v4 LOGO concepts combining ALL 4 meanings:
  Open (开放) + Meme (Pepe 表情) + 空投 (parachute tokens) + 撸毛 (sheep / farming)

Multi-element, rich illustration style logos with diverse color palettes.
"""
import os, sys, json, time, urllib.request, urllib.error

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

API_KEY = "sk-cp-9ebPyN9XSpxje0C6MZsXPQvZnFQKdug3Qe7gjuGJykm_jgCfMSobFi0CdoBnx1viTQctRD1-Y7v9ql0DO-9sIROF_DpsGYA7zmjRezSJjYICoL4OgpEMR_k"
ENDPOINT = "https://api.minimax.cn/v1/image_generation"
OUT_DIR = r"F:\deepseek\openmeme-rebuild\public\logo-concepts-v4"
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
# 6 multi-element concepts combining ALL 4 meanings
# ─────────────────────────────────────────────
CONCEPTS = [
    {
        "id": "v4-G-astronaut-pepe",
        "label": "G · Pepe 宇航员 + 降落伞币 + 绵羊星球",
        "prompt": (
            "Professional brand identity logo illustration for a crypto airdrop aggregator, "
            "central Pepe the Frog character in colorful astronaut suit with helmet visor flipped up (open), "
            "floating in vibrant space, multiple crypto coins with tiny parachutes raining around him (airdrop), "
            "cute sheep-shaped planet in the background (farming), vibrant multi-color palette including "
            "neon green Pepe, cyan helmet glass, magenta coins, gold stars and purple nebula, "
            "dynamic composition, sophisticated illustration, distinctive silhouette, "
            "vector-perfect edges, scales to favicon, no text, no watermark"
        ),
    },
    {
        "id": "v4-H-treasure-chest",
        "label": "H · 打开的宝箱 + Pepe + 金币 + 羊毛",
        "prompt": (
            "Professional brand identity logo illustration, vintage treasure chest with lid wide open (open), "
            "happy Pepe the Frog sitting inside peeking out (meme), pile of glowing crypto coins spilling "
            "from the chest (airdrop), soft sheep wool fleece as cushion and pattern (farming), "
            "vibrant multi-color palette with neon green Pepe, golden coins, magenta chest trim, cyan highlights, "
            "warm inviting composition, sophisticated illustration, distinctive silhouette, "
            "vector-perfect edges, no text, no watermark"
        ),
    },
    {
        "id": "v4-I-pepe-shearing-cloud",
        "label": "I · Pepe 剪羊毛云 + 下金币雨",
        "prompt": (
            "Professional brand identity logo illustration, Pepe the Frog character shearing a fluffy white "
            "cloud with golden scissors (farming), the cloud's mouth wide open raining crypto tokens like "
            "raindrops (airdrop + open), colorful gradient sky from deep purple to hot pink to cyan, "
            "vibrant multi-color palette including neon green Pepe, gold scissors and coins, magenta sky, "
            "cyan accents, sophisticated illustration, distinctive silhouette, "
            "vector-perfect edges, no text, no watermark"
        ),
    },
    {
        "id": "v4-J-pepe-rocket",
        "label": "J · Pepe 火箭 + 金币尾流 + 绵羊星座",
        "prompt": (
            "Professional brand identity logo illustration, Pepe the Frog riding a rocket launching upward "
            "(meme + airdrop metaphor), colorful rocket flames in rainbow gradient, trail of crypto tokens "
            "streaming behind like exhaust (airdrop), helmet visor open (open), cute sheep-shaped "
            "constellation pattern in starry sky (farming), vibrant multi-color palette of green, magenta, "
            "gold, cyan and purple, dynamic diagonal composition, distinctive silhouette, "
            "vector-perfect edges, no text, no watermark"
        ),
    },
    {
        "id": "v4-K-bubble-volcano",
        "label": "K · 气泡火山爆发 + Pepe + 绵羊",
        "prompt": (
            "Professional brand identity logo illustration, large speech bubble (meme) erupting like a "
            "colorful volcano, tokens shooting out the top in rainbow gradient (airdrop), the bubble's "
            "mouth open wide (open), small cute sheep at the base of the eruption (farming), "
            "vibrant multi-color palette including neon green, hot pink, cyan, gold, "
            "dynamic composition with motion, sophisticated illustration, distinctive silhouette, "
            "vector-perfect edges, no text, no watermark"
        ),
    },
    {
        "id": "v4-L-pepe-fishing",
        "label": "L · Pepe 钓鱼 + 降落伞币",
        "prompt": (
            "Professional brand identity logo illustration, Pepe the Frog holding a fishing rod "
            "(farming metaphor), catching a glowing crypto coin with a small parachute attached (airdrop), "
            "the fishing line forms an open graceful curve through the air (open), water splashes with "
            "token reflections below, vibrant multi-color palette including neon green Pepe, gold coin, "
            "magenta line, cyan water, warm friendly composition, sophisticated illustration, "
            "distinctive silhouette, vector-perfect edges, no text, no watermark"
        ),
    },
]


results = []
for c in CONCEPTS:
    print(f"\n=== {c['label']} ===")
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
