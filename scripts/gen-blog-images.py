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

    # ═══════════════════════════════════════════════════════
    # Topic 3: IB Math AA HL 7점 받는 법 (Persona 2)
    # ═══════════════════════════════════════════════════════
    "ib-math-aa-hl-7-points-1.png": STYLE + """
A Korean teenage student (around 16–17, IB Diploma age) studying late at night
at a wooden desk in a quiet international school dorm or home study room.
Multiple long-form exam papers spread across the desk, dense with handwritten
mathematical working in pencil — equations, integrals, function graphs sketched
by hand. A graphing display calculator (GDC) sits next to the papers. The
student leans forward, brow slightly furrowed in concentration, mid-thought.
A warm desk lamp casts focused light on the work surface; the rest of the room
falls into soft shadow. A half-finished cup of tea on the corner of the desk.
The mood: the intense, lonely focus of a student deep in IB exam preparation —
the quiet weight of a 2-year diploma program nearing its decisive moment.
Horizontal landscape framing (16:9), three-quarter angle from across the desk.
""",

    "ib-math-aa-hl-7-points-2.png": STYLE + """
An over-the-shoulder view of a 1:1 tutoring session at a wooden table.
A Korean student (teenage, ~17) is seated facing forward, and an older
mentor figure (Korean man in his 40s, business-casual) sits next to them,
pointing at a multi-page handwritten mathematical exploration document
with red pen markings, sketches of graphs, and integral notation visible
on the pages. The student listens attentively, head tilted toward the
mentor. The pages on the table are clearly a working draft — marginalia,
crossed-out lines, fresh comments in red ink. A laptop open in the
background shows mathematical software (not in sharp focus). Soft natural
afternoon light through a window. Both faces visible only in partial
profile — emphasis on hands, the document, and the act of guided revision.
The mood: precise, calm mentorship — a draft being carefully shaped before
submission.
Horizontal landscape framing (16:9), over-shoulder editorial angle.
""",

    # ═══════════════════════════════════════════════════════
    # Topic 5: 대치동 → 국제학교 (Persona 1+2)
    # ═══════════════════════════════════════════════════════
    "korea-vs-us-math-daechi-perspective-1.png": STYLE + """
A Korean teenage student (around 14–15, middle school age) at a study desk
late at night in a Korean private-academy district setting (Daechi-dong
style). The desk is densely packed: a thick Korean math workbook open to
a page filled with handwritten work in pencil, multiple sharpened pencils
in a holder, a clear plastic ruler, a half-finished mug of barley tea,
stacked notes. The student leans forward, writing precise mathematical
notation by hand — no calculator visible. Warm desk-lamp light isolates
the work surface from a darker room background. Korean academic-pressure
atmosphere, but not stressful — focused, deeply absorbed.
The mood: the silent intensity of Korean math training — handwritten,
calculator-free, precise.
Horizontal landscape framing (16:9), three-quarter angle.
""",

    "korea-vs-us-math-daechi-perspective-2.png": STYLE + """
An overhead view of a wooden study table where two distinct sets of
materials are juxtaposed side-by-side: on the LEFT, a Korean math
workbook with handwritten Korean notation in pencil (clean, dense,
calculator-free); on the RIGHT, an English-language math textbook open
to a page with word problems and a Desmos-style graphing calculator
screen visible on a laptop. Between them sit a graphing calculator (TI
or similar), a notebook with bilingual English/Korean vocabulary lists
in handwriting, and a cup of coffee. A child's hand (partial, out of
focus at the edge) holds a pencil, mid-comparison. Warm late-afternoon
natural light through a window.
The mood: the quiet moment of bridging two mathematical worlds — neither
abandoned, both held at once.
Horizontal landscape framing (16:9), top-down editorial angle.
""",

    # ═══════════════════════════════════════════════════════
    # Topic 4: SAT Math 800 한국 학생 함정 5가지 (Persona 2)
    # ═══════════════════════════════════════════════════════
    "sat-math-800-korean-traps-1.png": STYLE + """
A Korean teenage student (around 16-17, high school junior) seated at a
desk taking a practice digital SAT exam. A laptop is open in front of
them showing a generic math testing interface (NOT actual SAT content
— just abstract math test layout with question number visible, neutral
white-and-blue design, no recognizable logos). Scratch paper to the
right of the laptop with handwritten work in pencil. A simple wristwatch
on the desk indicating time pressure. The student is leaning forward,
intensely focused, brow slightly furrowed. Natural daytime light through
a window. Books and a water bottle in soft-focus background.
The mood: the controlled tension of a high-stakes timed test — focused
intelligence under time pressure.
Horizontal landscape framing (16:9), three-quarter angle.
""",

    "sat-math-800-korean-traps-2.png": STYLE + """
Over-the-shoulder editorial shot of a 1:1 tutoring session. A Korean
tutor (40s, business-casual, partial profile only — no clear face) and
a teenage student (~17, back of head visible) are reviewing a printed
SAT-style math practice answer sheet together. The page on the table
shows multiple math problems with handwritten work, several red pen
circles around mistakes and a few short red annotations in margins
(generic math notation, NOT actual SAT content). A laptop sits open
nearby showing a Desmos-style graphing calculator with a parabola
plotted on it (not in sharp focus). Both hands visible — the tutor
pointing at a specific problem, the student's pencil paused mid-thought.
Warm afternoon natural light through a window. Wooden table surface.
The mood: precise, calm diagnosis — finding exactly where points were
lost.
Horizontal landscape framing (16:9), over-shoulder editorial angle.
""",

    # ═══════════════════════════════════════════════════════
    # Topic 8: IGCSE Extended Math A* 한국 학생 5가지 (Persona 2)
    # ═══════════════════════════════════════════════════════
    "igcse-extended-math-a-star-korean-traps-1.png": STYLE + """
Close-up over-the-shoulder shot of a Korean teenage student's hand
(age 15-16, IGCSE Year 10-11) holding a black pen and writing
mathematical working line-by-line on a generic exam-style answer
sheet. The page is filled with neat handwritten algebra steps —
multiple lines of working visible, fractions, equations with
substitution arrows, all in pencil/black pen with a calm precise
hand. NO actual Cambridge IGCSE content visible — just generic
math working (cosine rule, fraction arithmetic style). A scientific
calculator (Casio fx-style, generic) sits next to the page. A
school-style desk with warm afternoon light from a window.
The mood: the quiet discipline of writing every step out — the
exact habit that wins method marks.
Horizontal landscape framing (16:9), close-up over-shoulder angle
on the hand and the page (no face visible).
""",

    "igcse-extended-math-a-star-korean-traps-2.png": STYLE + """
Top-down editorial shot of a wooden study table. On the table:
a printed mock exam answer sheet with multiple math problems and
handwritten student work, several red pen annotations in margins
("show working", "+1 method", reasoning notes — generic, NOT
Cambridge content), a small bilingual notebook with English
geometry vocabulary lists ("alternate angles", "isosceles",
"cyclic quadrilateral", "bearings 045°") in clean handwriting,
a Casio scientific calculator, a protractor, a sharpened pencil.
A tutor's hand (40s, business casual sleeve visible at edge of
frame) holds a red pen, mid-annotation on the page. Soft natural
afternoon light from above-right. No faces visible.
The mood: precise diagnosis — where exactly did the marks slip,
and how does the student's English geometry vocabulary need to
grow.
Horizontal landscape framing (16:9), top-down editorial angle.
""",

    # ═══════════════════════════════════════════════════════
    # Topic 6: 채드윅·KIS·SIS·NLCS 학년별 로드맵 (Persona 2)
    # ═══════════════════════════════════════════════════════
    "chadwick-kis-sis-nlcs-math-roadmap-1.png": STYLE + """
Wide establishing shot of a modern Korean international school campus
exterior (generic, NOT a specific real school — composite stylized
architecture). Contemporary architecture with glass and brick facade,
landscaped courtyard with trees, several students (mixed ethnicity,
school-uniform style outfits) walking between buildings during a
class change. Late spring/early summer afternoon light. The campus
feels prestigious, well-resourced, calm but academically intense.
No identifying logos or school names visible anywhere.
The mood: the daily reality of a Korean international school
student — different campuses, different curricula, different paths.
Horizontal landscape framing (16:9), wide editorial angle.
""",

    "chadwick-kis-sis-nlcs-math-roadmap-2.png": STYLE + """
A Korean mother (early-40s) and her teenage child (around 14-15,
middle-school age) sit at a kitchen table at home, leaning over a
handwritten roadmap chart on a notebook — labeled columns "G7 G8
G9 G10 G11 G12" with handwritten subject names ("Pre-Algebra",
"Algebra I", "Geometry", "AP Calc", etc.). A school brochure is
open beside the notebook (generic, no recognizable school logo).
A laptop on the side shows a generic spreadsheet/comparison view.
Two teacups, a calm late-afternoon natural light from a window.
Both faces visible only in partial profile — emphasis on the
notebook and the act of planning together.
The mood: a quiet, thoughtful family planning moment — choosing
the right academic path one grade at a time.
Horizontal landscape framing (16:9), three-quarter angle.
""",

    # ═══════════════════════════════════════════════════════
    # Topic 7: 주재원 자녀 한국·해외 동시 대비 (Persona 3)
    # ═══════════════════════════════════════════════════════
    "expat-korean-students-math-roadmap-1.png": STYLE + """
A wide warm-toned scene of a Korean expat family at home in
Southeast Asia (Malaysia/Singapore/Hong Kong style apartment with
tropical greenery visible through tall windows). A Korean father
(early-40s, business casual) and mother (early-40s) sit at a
dining table with their teenage child (around 14-15) leaning into
the conversation. On the table: a printed road-map style sheet
with handwritten columns and arrows, a laptop displaying a generic
university comparison page (no recognizable logos), two coffee
cups, an open notebook with bilingual Korean/English notes. The
family is mid-conversation — engaged, thoughtful, not stressed.
Soft natural late-afternoon light through the windows.
The mood: an honest expat family planning conversation —
balancing two countries, two futures, one child.
Horizontal landscape framing (16:9), three-quarter angle.
""",

    "expat-korean-students-math-roadmap-2.png": STYLE + """
Close-up over-the-shoulder shot of a Korean teenage student
(around 16-17) sitting at a study desk in an apartment abroad
during a 1:1 online math tutoring session via Google Meet style
video call. A laptop screen shows a video call interface with a
math problem visible on a shared whiteboard (generic algebra
equations, no actual brand logos). Next to the laptop: a Korean-
language textbook, an English-language SAT-style practice page,
a graphing calculator. Through the window in the background,
Southeast Asian or East Asian tropical/modern cityscape view
suggesting the student is studying from abroad. Warm desk lamp
light, late evening / early night.
The mood: the quiet focus of a study session that bridges two
time zones and two academic systems — distance doesn't reduce
quality.
Horizontal landscape framing (16:9), three-quarter angle.
""",

    # ═══════════════════════════════════════════════════════
    # Topic 21: Exam prep calendar by grade — 3 tracks
    # ═══════════════════════════════════════════════════════
    "exam-prep-calendar-by-grade-3-tracks-1.png": STYLE + """
A Korean mother in her 40s sitting at a wooden dining table or home study
area, looking down at a large opened paper academic year planner spread out
in front of her with handwritten color-coded notes in different pen colors
marking different months — generic month markers visible (no readable text).
On the table beside the planner: a notebook with handwritten Korean notes,
a printed school course catalog, two different colored highlighter pens
(blue and red representing different tracks), a steaming mug of tea, a
smartphone face-down. She is gently underlining or marking a date with
focused, calm concentration — the moment of mapping out a child's year of
exams. Only her hands and side profile visible (no clear face).
Soft late afternoon natural window light. Neutral warm home interior.
The mood: a Korean parent quietly planning out her child's upcoming
academic year — calm, deliberate, organized. The sense of "let me see
what's actually coming this year."
Horizontal landscape framing (16:9), three-quarter editorial angle.
""",

    "exam-prep-calendar-by-grade-3-tracks-2.png": STYLE + """
Top-down editorial shot of a wooden study desk with a Korean teenage
student's open A4-size academic planner / monthly calendar in the center,
handwritten in two languages (Korean and English) with month and date grid
visible but no readable specifics. Around the planner scattered: a sharpened
pencil and a fountain pen, a small stack of colored sticky-flag tabs (blue,
purple, green, red — representing different exam tracks), an open math
textbook in English partially in frame, a Korean-English vocabulary
notebook, a steaming mug of tea, a smartphone face-down. A teenage hand
(partial, no face) hovering with a pen above a particular date as if
marking it. Warm afternoon light from above-left, soft shadows.
The mood: the quiet act of mapping out a school year — exam dates being
marked one at a time, the methodical preparation of a student who
knows what's coming.
Horizontal landscape framing (16:9), top-down editorial angle.
""",

    # ═══════════════════════════════════════════════════════
    # Topic 22: SAT vs ACT for international school — 2026 ACT 개편 반영
    # ═══════════════════════════════════════════════════════
    "sat-vs-act-for-international-school-1.png": STYLE + """
A Korean teenage student (around 16-17, G11 level, partial side profile only
— no clear face visible) sitting at a quiet study desk in late afternoon
light, taking a digital practice test on a 13-inch laptop. On the laptop
screen: a generic test interface showing a math problem area with a
graphing calculator widget visible in the corner (Desmos-style design but
no readable text, no logos). The student is wearing comfortable casual
clothes, leaning slightly forward in focused concentration with a hand
resting on the laptop trackpad. Next to the laptop on the wooden desk:
an open physical math notebook with handwritten work in two languages
(English equations + small Korean side notes), a sharpened pencil, a
half-empty mug of tea, a small wristwatch placed face-up (suggesting timed
practice). Warm window light from the side, soft shallow depth of field.
The mood: the quiet seriousness of a student taking an official practice
test in real exam conditions — the moment of measuring oneself against the
test's actual time pressure before deciding which exam to commit to.
Horizontal landscape framing (16:9), three-quarter editorial angle.
""",

    "sat-vs-act-for-international-school-2.png": STYLE + """
A Korean mother in her 40s and her teenage child (around 16, G11)
sitting together at a wooden dining table in a calm home setting, deep in
discussion about academic choices. Between them on the table: two
different printed test preparation booklets side by side (one with a
generic blue cover design, one with an orange cover — no readable text, no
brand names), a notebook with handwritten Korean notes and a comparison
chart drawn by hand, a printed page that looks like a college admissions
information sheet, two mugs of tea, a calculator. The mother is gently
pointing at one of the booklets while the child looks at it thoughtfully.
Both faces shown only in partial side profile (no clear face). Late
afternoon natural light through a kitchen window. Neutral warm home
interior with a small bookshelf in the soft-focus background.
The mood: a serious but calm Korean family conversation about which of
two college entrance exams suits the child better — the quiet weight of
a high-stakes decision being thought through together, not rushed.
Horizontal landscape framing (16:9), candid editorial angle from the side.
""",

    # ═══════════════════════════════════════════════════════
    # Topic 14: G11 12-month master schedule (SAT·AP·내신 동시 대비)
    # ═══════════════════════════════════════════════════════
    "g11-12-month-master-schedule-1.png": STYLE + """
Top-down editorial shot of a Korean G11 student's study desk in late
afternoon light. The desk is busy but organized — visible items:
an open SAT preparation book (generic blue cover, no readable brand
text), an AP Calculus textbook open to a page with handwritten margin
notes in two languages (English equations + small Korean notes),
a school binder with class notes peeking out, a printed academic year
planner with handwritten color-coded entries (different colored pens
for SAT/AP/school exams — no readable specifics), a sharpened pencil
and two fountain pens, a graphing calculator face-up, a small stack
of practice test pages, a steaming mug of tea, a small wristwatch
placed face-up suggesting timed practice. A teenage hand (partial,
no face) hovering over the planner with a pen, as if marking a date.
Warm window light from the side, soft shallow depth of field.
The mood: the quiet seriousness of a G11 student facing multiple
overlapping exam preparations — the moment of looking at all the
materials together and trying to plan the year ahead.
Horizontal landscape framing (16:9), top-down editorial angle.
""",

    "g11-12-month-master-schedule-2.png": STYLE + """
A Korean mother in her 40s and her G11 teenage child (around 16-17)
sitting together at a wooden dining table or home study desk, both
looking down at a large opened academic year planner spread between
them. The planner has handwritten color-coded entries in different
pen colors marking different months (generic month grid visible, no
readable specifics, no brand names). On the table beside the planner:
a notebook with handwritten Korean notes, a printed school course
catalog, two different colored highlighter pens (one red, one blue,
representing different priorities), a steaming mug of tea, a calculator,
a small stack of school exam papers. The mother is gently pointing at
one date in the planner with a pencil while the child looks at it
thoughtfully and takes notes. Both faces shown only in partial side
profile (no clear face). Late afternoon natural window light. Neutral
warm home interior with soft-focus bookshelf in the background.
The mood: a calm Korean family planning conversation about a G11
student's year ahead — the quiet weight of mapping out SAT·AP·school
exam priorities together, not rushed, methodical.
Horizontal landscape framing (16:9), candid editorial angle from the side.
""",

    # ═══════════════════════════════════════════════════════
    # Topic 10: AP Statistics 한국 학생 5가지 함정
    # ═══════════════════════════════════════════════════════
    "ap-statistics-korean-traps-1.png": STYLE + """
A Korean G11 student (around 16-17, partial side profile only — no
clear face visible) sitting at a wooden study desk in late afternoon
warm window light, deeply focused on writing English handwritten
responses on a sheet of free-response practice questions. The desk
shows a thoughtful study setup — visible items: an open statistics
textbook with bilingual handwritten margin notes (English equations
+ small Korean side notes — no specific brand readable), a separate
practice sheet partly filled in with neat English handwriting (text
blurred/illegible at distance), a graphing calculator face-up showing
a graph display, a sharpened pencil and a fountain pen, a stack of
flashcards bound with a ring (vocabulary terms — no readable text),
a steaming mug of tea, a small wristwatch face-up suggesting timed
practice. The student grips the fountain pen and is mid-sentence
on the practice sheet, looking down with quiet concentration —
the moment of carefully writing English justification.
The mood: the quiet seriousness of a Korean student facing the
language-heavy AP Statistics free-response — the moment of
choosing precise English phrasing for a statistical conclusion.
Horizontal landscape framing (16:9), three-quarter editorial angle.
""",

    "ap-statistics-korean-traps-2.png": STYLE + """
A Korean mother in her 40s and her G11 teenage child (around 16-17)
sitting together at a wooden dining table in a calm warm home setting,
both looking down at a printed page showing a generic test result
report with bar chart graphics visible (no readable specific scores or
brand names — abstract chart shapes). Beside the report on the table:
a notebook with handwritten Korean notes and English diagnostic
checkmarks, a printed page that looks like a practice problem set with
red pen corrections, two different colored highlighter pens, two mugs
of tea, a graphing calculator. The mother is gently pointing at one
chart on the report with a pencil while the child looks at it
thoughtfully and takes notes in the Korean notebook. Both faces shown
only in partial side profile (no clear face). Late afternoon natural
window light. Neutral warm home interior with soft-focus bookshelf
in the background.
The mood: a calm Korean family diagnostic conversation about exactly
where the child is losing points on AP Statistics free-response —
calm, methodical, problem-solving together.
Horizontal landscape framing (16:9), candid editorial angle from the side.
""",

    # ═══════════════════════════════════════════════════════
    # Topic 23: What is IB — third track guide (G4 parents)
    # ═══════════════════════════════════════════════════════
    "what-is-ib-third-track-guide-1.png": STYLE + """
A Korean mother in her late 30s or 40s and her young elementary-school
child (around 9-10, Grade 4 age) sitting together at a warm wooden
home study table in soft late-afternoon window light. They are looking
together at an open illustrated workbook and a colorful world map or
globe on the table, with the mother gently guiding with a pencil while
the child looks up with curiosity. On the table: a stack of children's
books, a few colored pencils in a cup, an open notebook with simple
handwriting, a small globe paperweight, a steaming mug of tea for the
mother and a glass of water for the child. Both faces shown only in
soft partial side profile (no clear identifiable face). Neutral warm
home interior with a soft-focus bookshelf in the background.
The mood: the early, hopeful stage of a Korean family thinking about
a child's long educational journey ahead — calm, warm, the beginning
of a long-term plan, not exam pressure. The child is still young.
Horizontal landscape framing (16:9), candid editorial angle from the side.
""",

    "what-is-ib-third-track-guide-2.png": STYLE + """
A Korean parent in their 40s sitting at a home desk in the evening,
researching international school options on a laptop, with several
printed school brochures and prospectuses spread on the desk beside
the laptop (generic brochure designs, no readable text or real school
names or logos). The parent holds a pen and is taking notes in a
notebook with a hand-drawn comparison chart (three columns suggesting
three options — abstract, no readable specifics). On the desk: a cup
of coffee, reading glasses, a smartphone face-down, a small stack of
documents. Only the parent's hands and soft side profile visible (no
clear face). Warm desk lamp light, calm evening atmosphere. Neutral
home-office interior, soft-focus bookshelf behind.
The mood: a Korean parent carefully comparing international school
curriculum options late in the evening — methodical, thoughtful,
weighing a major long-term decision for their child.
Horizontal landscape framing (16:9), three-quarter editorial angle.
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
