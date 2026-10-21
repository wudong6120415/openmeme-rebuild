"""Generate KOL hero banner — 21:9 widescreen."""
import os, sys, json, urllib.request

sys.stdout.reconfigure(encoding="utf-8")

PROJECT = r"F:\deepseek\openmeme-rebuild"
OUT = os.path.join(PROJECT, r"public\kol\kol-hero.png")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

API_KEY = "sk-cp-9ebPyN9XSpxje0C6MZsXPQvZnFQKdug3Qe7gjuGJykm_jgCfMSobFi0CdoBnx1viTQctRD1-Y7v9ql0DO-9sIROF_DpsGYA7zmjRezSJjYICoL4OgpEMR_k"

prompt = (
    "Abstract cyberpunk banner background for Chinese crypto KOL leaderboard website, "
    "wide horizontal 21:9 format 1920x820, deep dark navy background (#0a0a0f) with "
    "subtle Chinese character matrix rain pattern in faint green, glowing neon green "
    "data stream lines flowing horizontally, abstract chart bars and graph curves "
    "silhouetted in the background with soft glow, floating blue cryptocurrency coin "
    "shapes, premium fintech dashboard aesthetic, no text, no people, no logos, "
    "no brand names, ultra-clean modern design, photographic quality"
)

body = json.dumps({
    "model": "image-01",
    "prompt": prompt,
    "aspect_ratio": "21:9",
    "response_format": "url",
}).encode("utf-8")

req = urllib.request.Request(
    "https://api.minimax.cn/v1/image_generation",
    data=body,
    headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
    method="POST",
)
try:
    with urllib.request.urlopen(req, timeout=90) as r:
        data = json.loads(r.read())
    url = data["data"]["image_urls"][0]
    print(f"url: {url[:80]}")
    with urllib.request.urlopen(url, timeout=60) as r:
        img = r.read()
    with open(OUT, "wb") as f:
        f.write(img)
    print(f"saved: {OUT}  ({len(img)//1024} KB)")
except Exception as e:
    print(f"err: {e}")