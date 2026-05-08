"""
Blog photo generator — gpt-image-2 medium, photojournalism style

Generates editorial documentary-style photos for the Mathiter Tutoring blog.
Per blog post: ~2 images that help Korean parents visualize the topic
(international school scenes, students studying, family deciding paths, etc.).

Usage (from project root):
    python3 scripts/gen-blog-images.py

Idempotent: skips files that already exist. Delete a file to regenerate.

Output: public/blog/photos/<slug>-<n>.png  (1536x1024, 16:9 horizontal)
"""

import os
import sys
import base64
from pathlib import Path
from openai import OpenAI
from dotenv import load_dotenv

# Load OpenAI key from secrets
load_dotenv("/Users/justinminim4/projects/secrets/.env.openai")

api_key = os.environ.get("OPENAI_API_KEY")
if not api_key:
    print("❌ OPENAI_API_KEY not found in /Users/justinminim4/projects/secrets/.env.openai")
    sys.exit(1)

client = OpenAI(api_key=api_key)

REPO_ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = REPO_ROOT / "public" / "blog" / "photos"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ─────────────────────────────────────────────────────────────
# Style preamble — applied to every prompt
# ─────────────────────────────────────────────────────────────
STYLE = (
    "Photojournalism documentary style, professional editorial photography. "
    "DSLR camera, 50mm prime lens, natural lighting, soft shallow depth of field. "
    "Highly photorealistic, news-magazine quality (Reuters / AP / The Atlantic style). "
    "Subtle film grain, balanced color grading. Clean composition, journalistic framing. "
    "NO text, NO labels, NO captions, NO logos visible anywhere in the frame. "
)

# ─────────────────────────────────────────────────────────────
# Prompts — 2 per post
# ─────────────────────────────────────────────────────────────
PROMPTS = {
    # ═══════════════════════════════════════════════════════
    # Topic 1: International school math English terms (Persona 1)
    # ═══════════════════════════════════════════════════════
    "international-school-math-english-terms-50-1.png": STYLE + """
A Korean teenage student (around 13–14, middle school age) sitting at a wooden classroom desk
in a bright modern international school in Asia. The student is looking down at an open
English-language math textbook with mild concentration mixed with hesitation — pencil paused
mid-thought. The page on the desk shows mathematical figures (geometry, equations) with
English labels. Soft natural light through tall classroom windows. Other students slightly
out of focus in the background. The mood: a quiet moment of cognitive friction —
understanding the math but pausing at the unfamiliar English vocabulary.
Horizontal landscape framing (16:9), candid editorial angle.
""",

    "international-school-math-english-terms-50-2.png": STYLE + """
A close-up overhead shot of a study desk in a Korean home preparing for international move.
On the desk: an open English math workbook with handwritten Korean translation notes
in the margins, a Korean–English dictionary, a half-empty mug of tea, and several
sticky notes with vocabulary written by hand. A child's hand (out of focus, partial)
holding a pencil at the edge of the frame.
Warm late-afternoon lamp light. The mood: quiet, deliberate preparation —
the gap between two languages being bridged one word at a time.
Horizontal landscape framing (16:9), top-down editorial angle.
""",

    # ═══════════════════════════════════════════════════════
    # Topic 2: AP Calc AB vs BC (Persona 2)
    # ═══════════════════════════════════════════════════════
    "ap-calculus-ab-vs-bc-which-one-1.png": STYLE + """
A Korean high school student (around 16–17, 11th grade) sitting at a study desk
late at night, working through an AP Calculus practice problem set. Multiple
textbooks visible — one labeled with calculus formulas, derivatives and integrals
faintly visible. The student wears casual clothes, hair slightly messy, eyes
focused but tired. A laptop is open showing a graph or equation. A water bottle
and several pencils on the desk. Ambient warm desk lamp lighting.
The mood: serious focus, the weight of a major exam decision visible in posture.
Horizontal landscape framing (16:9), three-quarter angle from across the desk.
""",

    "ap-calculus-ab-vs-bc-which-one-2.png": STYLE + """
A Korean mother in her 40s and her teenage son sitting at a kitchen table at home,
having a serious conversation about academic choices. Between them on the table:
a printed school course catalog, a notebook with handwritten lists, two cups of tea.
The mother gestures gently with one hand, the son leaning forward listening. Both
faces show calm engagement — not arguing, problem-solving together.
Late afternoon natural light through a kitchen window. Neutral home interior.
The mood: a thoughtful family planning moment about a child's academic future.
Horizontal landscape framing (16:9), candid editorial angle from the side.
""",

    # ═══════════════════════════════════════════════════════
    # Topic 9: US vs UK exam tree (Persona 1+2)
    # ═══════════════════════════════════════════════════════
    "us-vs-uk-exam-tree-which-tree-1.png": STYLE + """
Wide establishing shot of a modern Southeast Asian international school campus
(Malaysia / Singapore / Hong Kong style). A diverse group of teenage students in
smart-casual school uniforms walking between buildings during a class change —
multiple ethnicities including Korean, Chinese, Malaysian, Indian. Tropical
landscaping with palm trees and modern architecture. Bright midday natural light.
Some students carry backpacks, talking in small groups. The campus feels
international, prestigious, contemporary.
Horizontal landscape framing (16:9), wide editorial angle.
""",

    "us-vs-uk-exam-tree-which-tree-2.png": STYLE + """
A Korean couple in their 40s sitting at a kitchen table at home, comparing two
international school brochures spread out side by side — one clearly marked as
American curriculum (with stars-and-stripes-like color cues), the other British
curriculum (with crown / royal blue color cues). A laptop shows a comparison
chart. The father holds one brochure, the mother holds the other. Both wear
expressions of careful deliberation — not confused, but thoughtfully weighing.
Coffee mugs and a notebook with handwritten pros/cons visible. Soft natural
window light. The mood: an important family decision in progress.
Horizontal landscape framing (16:9), three-quarter angle.
""",
}

# ─────────────────────────────────────────────────────────────
# Generate
# ─────────────────────────────────────────────────────────────
total = len(PROMPTS)
generated = 0
skipped = 0

for idx, (filename, prompt) in enumerate(PROMPTS.items(), 1):
    out_path = OUT_DIR / filename
    if out_path.exists():
        print(f"[{idx}/{total}] ↷ {filename} (already exists, skip)")
        skipped += 1
        continue

    print(f"[{idx}/{total}] generating {filename}...")
    try:
        resp = client.images.generate(
            model="gpt-image-2",
            prompt=prompt,
            size="1536x1024",  # horizontal 16:9 for blog inset
            quality="medium",
            n=1,
        )
        img_bytes = base64.b64decode(resp.data[0].b64_json)
        out_path.write_bytes(img_bytes)
        kb = len(img_bytes) // 1024
        print(f"        → {out_path.name} ({kb}KB)")
        generated += 1
    except Exception as e:
        print(f"        ❌ failed: {e}")
        sys.exit(1)

print(f"\n✅ done — generated {generated}, skipped {skipped} (already existed)")
print(f"   output: {OUT_DIR}")
