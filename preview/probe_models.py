"""
Probe what image models MiniMax supports, then run a high-quality test prompt.
"""
import os, sys, json, urllib.request, urllib.error

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

API_KEY = "sk-cp-9ebPyN9XSpxje0C6MZsXPQvZnFQKdug3Qe7gjuGJykm_jgCfMSobFi0CdoBnx1viTQctRD1-Y7v9ql0DO-9sIROF_DpsGYA7zmjRezSJjYICoL4OgpEMR_k"
ENDPOINT = "https://api.minimax.cn/v1/image_generation"

def call(model: str, prompt: str):
    body = json.dumps({
        "model": model,
        "prompt": prompt,
        "aspect_ratio": "1:1",
        "response_format": "url",
    }).encode("utf-8")
    req = urllib.request.Request(
        ENDPOINT,
        data=body,
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = json.loads(resp.read())
        urls = data.get("data", {}).get("image_urls", [])
        if urls:
            return ("OK", urls[0], data)
        return ("FAIL", None, data)
    except urllib.error.HTTPError as e:
        return ("HTTP_ERROR", e.code, e.read().decode("utf-8", errors="ignore")[:300])
    except Exception as e:
        return ("EXCEPTION", None, str(e)[:300])

models = ["image-01", "image-01-live", "image-2", "image-02", "MiniMax-image-01", "MiniMax-image-2"]

# refined prompt (much more sophisticated)
test_prompt = (
    "Professional brand identity logo mark for a cryptocurrency memecoin aggregator platform, "
    "modern minimalist design language inspired by Pentagram and Chermayeff & Geismar, "
    "geometric origami-folded Pepe-style frog head in neon green (#00ff88) on pure black background, "
    "subtle paper-fold shading and precise angular planes suggesting unfolding motion, "
    "sophisticated negative space, vector-perfect crisp edges, distinctive silhouette, "
    "scales beautifully from 16x16 favicon to large display, "
    "brand-ready corporate identity quality, no text, no watermark, just the mark"
)

print("=== Testing models ===\n")
for m in models:
    status, payload, raw = call(m, test_prompt)
    print(f"[{status}] model={m}")
    if status == "OK":
        print(f"    url: {payload[:90]}...")
    else:
        print(f"    payload: {str(payload)}")
        try:
            r = json.loads(raw) if isinstance(raw, str) else raw
            print(f"    body: {json.dumps(r)[:200]}")
        except Exception:
            print(f"    raw: {str(raw)[:200]}")
    print()
