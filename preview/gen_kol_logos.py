"""
Generate 15 KOL project logos in parallel via MiniMax image-01 API.
Each logo is a minimalist, brand-ready mark.
"""
import os, sys, json, time, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

PROJECT = r"F:\deepseek\openmeme-rebuild"
OUT_DIR = os.path.join(PROJECT, r"public\kol")
os.makedirs(OUT_DIR, exist_ok=True)

API_KEY = "sk-cp-9ebPyN9XSpxje0C6MZsXPQvZnFQKdug3Qe7gjuGJykm_jgCfMSobFi0CdoBnx1viTQctRD1-Y7v9ql0DO-9sIROF_DpsGYA7zmjRezSJjYICoL4OgpEMR_k"
ENDPOINT = "https://api.minimax.cn/v1/image_generation"


# Each project's logo concept (vary color, motif, mood)
PROJECTS = [
    # (id, name, color scheme, motif idea, prompt)
    ("01-paboxoxyz",      "PABOXX",       "neon green + black,  prediction box icon",            "professional brand mark logo, minimal geometric cube with question mark inside, neon green (#00ff88) on pure black, sleek tech aesthetic, single focal icon, 1024x1024, no text"),
    ("02-eloscapeHQ",    "ELOSCAPE",     "cyan gradient,        wave + portal motif",          "professional brand mark logo, abstract flowing wave forming a portal arch, cyan-blue gradient (#00d4ff to #0066ff) on pure black, modern fluid design, single focal icon, 1024x1024, no text"),
    ("03-forevercultfund","FOREVERCULT",  "magenta + purple,     diamond + flame motif",         "professional brand mark logo, geometric diamond with stylized flame inside, magenta-purple gradient (#ff00aa to #8800ff) on pure black, bold energetic, single focal icon, 1024x1024, no text"),
    ("04-LPPoolParty",    "LP POOL",      "cyan + teal,          water/liquidity motif",         "professional brand mark logo, abstract liquid pool ripple with LP letters hint, cyan-teal gradient (#06b6d4 to #14b8a6) on pure black, fluid DeFi feel, 1024x1024, no text"),
    ("05-metricxyz",      "METRIC",       "electric blue + green, chart/bar motif",             "professional brand mark logo, abstract rising bar chart inside shield, electric blue-to-green gradient (#3b82f6 to #00ff88) on pure black, fintech precision, 1024x1024, no text"),
    ("06-FissionXYZ",     "FISSION",      "orange + yellow,      atom/molecule motif",           "professional brand mark logo, abstract atomic nucleus with orbital ring, orange-to-yellow gradient (#ff6b35 to #fbbf24) on pure black, scientific fintech, 1024x1024, no text"),
    ("07-TitanExchange_", "TITAN",        "deep purple + cyan,   shield + lightning motif",      "professional brand mark logo, hexagonal shield with lightning bolt, deep purple-to-cyan gradient (#6366f1 to #06b6d4) on pure black, strong exchange vibe, 1024x1024, no text"),
    ("08-instinct_xyz",   "INSTINCT",     "iridescent rainbow,    brain/circuit motif",           "professional brand mark logo, abstract brain made of circuit traces, iridescent rainbow gradient on pure black, AI premium feel, 1024x1024, no text"),
    ("09-stonkrobbers",   "STONKROBBERS", "lime + hot pink,       bullish mascot/coin",           "professional brand mark logo, stylized rocket-coin character with sunglasses, lime-to-pink gradient (#84cc16 to #ec4899) on pure black, playful bullish, 1024x1024, no text"),
    ("10-arcus_xyz",      "ARCUS",        "deep red + black,     bow/sword motif",                "professional brand mark logo, sharp geometric arc/bow shape with energy lines, deep red-to-black gradient on pure black, powerful dex feel, 1024x1024, no text"),
    ("11-Lighter_xyz",    "LIGHTER",      "silver + electric blue,flame/lighter motif",         "professional brand mark logo, abstract lighter flame in geometric form, silver-to-blue gradient on pure black, sleek perps exchange, 1024x1024, no text"),
    ("12-ponsdotfamily",  "PONS",         "warm orange + coral,   bridge/connection motif",      "professional brand mark logo, abstract connection bridge with linked nodes, warm orange-coral gradient (#fb923c to #f97316) on pure black, community feel, 1024x1024, no text"),
    ("13-fablesfi",       "FABLES",       "teal + cream,         book/scroll motif",             "professional brand mark logo, open storybook with magic glow, teal-to-cream gradient on pure black, literary fantasy fintech, 1024x1024, no text"),
    ("14-meridiandotxyz", "MERIDIAN",     "navy + gold,          compass/meridian motif",         "professional brand mark logo, geometric compass with meridian lines, navy-to-gold gradient (#1e3a8a to #fbbf24) on pure black, premium fund feel, 1024x1024, no text"),
    ("15-pairdotfund",    "PAIR",         "red + white,          pair/duality motif",            "professional brand mark logo, two interlocking geometric shapes (pair motif), red-to-white gradient on pure black, clean fund aesthetic, 1024x1024, no text"),
]


def gen(item):
    pid, name, scheme, prompt = item
    body = json.dumps({
        "model": "image-01",
        "prompt": prompt,
        "aspect_ratio": "1:1",
        "response_format": "url",
    }).encode("utf-8")
    req = urllib.request.Request(
        ENDPOINT, data=body,
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = json.loads(resp.read())
        url = data["data"]["image_urls"][0]
        out = os.path.join(OUT_DIR, f"{pid}.png")
        with urllib.request.urlopen(url, timeout=30) as r:
            with open(out, "wb") as f:
                f.write(r.read())
        return (pid, True, os.path.getsize(out))
    except Exception as e:
        return (pid, False, str(e)[:120])


print(f"=== generating {len(PROJECTS)} logos in parallel ===\n")
start = time.time()

# Run 4 in parallel (API rate limit friendly)
ok, fail = 0, 0
with ThreadPoolExecutor(max_workers=4) as ex:
    futs = {ex.submit(gen, p): p[0] for p in PROJECTS}
    for fut in as_completed(futs):
        pid, success, info = fut.result()
        status = "[OK]" if success else "[ERR]"
        sz = f"{info//1024} KB" if success else info
        print(f"  {status} {pid:25} {sz}")
        if success: ok += 1
        else: fail += 1

print(f"\n=== Done in {time.time()-start:.1f}s · {ok} ok, {fail} fail ===")
