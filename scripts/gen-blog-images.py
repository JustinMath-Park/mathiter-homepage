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
# Prompts — 2+ per post
#
# ⚠️ IMAGE DIVERSITY RULE (2026-06 — Justin feedback "이미지가 다 똑같다")
# Do NOT default every photo to the two over-used compositions:
#   (a) "single teenager leaning over a desk, warm lamp, three-quarter angle"
#   (b) "parent + child sitting across a kitchen/dining table with papers + tea"
# Rotate through a DIVERSE ARCHETYPE PALETTE so no two posts feel identical.
# Cap any single archetype at ~2-3 uses across the whole blog.
#
# ARCHETYPE PALETTE (mix freely; pick what fits the topic):
#   A. single student at desk            — USE SPARINGLY (was over-used)
#   B. parent + child at table           — USE SPARINGLY (was over-used)
#   C. over-shoulder 1:1 tutoring (red pen)
#   D. top-down flat-lay (objects/roadmap/planner as hero, no faces)
#   E. campus wide establishing (vary US / UK / SEA architecture)
#   F. glass-wall / whiteboard working (equations on the wall)
#   G. walking-and-talking outdoors (campus path)
#   H. window-side contemplative single figure (backlit, thinking)
#   I. peer / small-group study (3-4 diverse students)
#   J. exam-hall / testing-center wide (rows of desks, wall clock)
#   K. macro hands / still-life (calculator, compass, graded paper, stopwatch)
#   L. café / library-stacks casual study
#   M. results-day emotional moment (envelope / screen)
#   N. parent alone researching (couch or home-office, laptop)
#   O. standing at a wall planner / wall calendar
# Also vary: time of day, indoor/outdoor, angle (macro↔wide), with/without people.
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
    # Archetype H — window-side contemplative (was: single student at desk)
    "ap-calculus-ab-vs-bc-which-one-1.png": STYLE + """
A Korean high school student (around 16–17, soft side profile, no clear
identifiable face) standing by a tall bright window in a quiet study room,
holding one open mathematics textbook while a second, thicker textbook rests on
the windowsill — as if weighing two options. The student gazes out the window in
a thoughtful pause, the two books suggesting two different courses (one slimmer,
one denser). Soft diffused daylight backlights the figure, calm and
contemplative. A desk with notes sits softly out of focus behind.
The mood: the quiet weight of choosing between two paths — AB or BC — a
reflective moment of decision rather than active studying.
Horizontal landscape framing (16:9), editorial angle, backlit by the window.
""",

    # Archetype F — tutor at whiteboard (was: parent + child at table)
    "ap-calculus-ab-vs-bc-which-one-2.png": STYLE + """
A Korean tutor (40s, business-casual, partial profile, no clear face) standing at
a small glass writing wall or whiteboard, sketching two different calculus curves
side by side with a marker — one gentler, one steeper — explaining a difference to
a single teenage student (around 16–17) who sits nearby watching and taking notes.
The hand-drawn curves and a few arrows are visible on the board (abstract, no
readable text). A bright modern tutoring room with soft natural light. Emphasis on
the gesture of teaching at the board and the student's attentive posture.
The mood: a clear one-on-one explanation of how two similar courses actually
differ — calm expert guidance, the moment a confusing choice becomes clear.
Horizontal landscape framing (16:9), editorial angle from the side.
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

    # Archetype G — walking-and-talking outdoors (was: parent + child at table)
    "us-vs-uk-exam-tree-which-tree-2.png": STYLE + """
A Korean parent in their 40s and their teenage child (around 15–16) walking side
by side along a tree-lined campus pathway in soft morning light, talking as they
walk — the parent turned slightly toward the child mid-conversation, the child
carrying a school backpack. Behind them the path and modern school buildings
recede gently out of focus. Both seen in a soft three-quarter-from-behind view, no
clear identifiable faces. Dappled natural light through the trees, an unhurried,
open atmosphere.
The mood: a calm walking conversation about which direction to take — US or UK
track — a decision discussed openly while moving forward together.
Horizontal landscape framing (16:9), editorial angle following from behind.
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
    # Archetype J — exam-hall wide (was: single student at desk)
    "sat-math-800-korean-traps-1.png": STYLE + """
A wide editorial shot of a quiet examination hall / testing center: orderly rows
of individual desks, each with a laptop open to a neutral on-screen test interface
(abstract, no readable text or logos), several teenage students of mixed
nationality seated and focused, seen mostly from behind and in soft focus. A large
plain wall clock is visible on the far wall, emphasizing time pressure. Cool even
overhead light, a calm but high-stakes atmosphere. One Korean student in the
mid-foreground (back of head, no face) sits slightly sharper in focus.
The mood: the controlled tension of a real digital SAT testing environment — many
students, one clock, the quiet pressure of a timed exam.
Horizontal landscape framing (16:9), wide editorial angle down the rows.
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

    # Archetype D — top-down roadmap flat-lay, no faces (was: parent + child at table)
    "chadwick-kis-sis-nlcs-math-roadmap-2.png": STYLE + """
A top-down editorial flat-lay of a hand-drawn academic roadmap as the clear hero
of the frame: a large sheet of paper with a hand-sketched grade-by-grade timeline
(columns and connecting arrows running from middle school through senior year,
abstract handwriting, no readable specifics) laid on a warm wooden table. Arranged
neatly around it: several colored pens and highlighters, a corner of a school
brochure, a small stack of past-paper booklets, a steaming mug of tea, a pair of
reading glasses. No faces — pure overhead composition focused on the plan itself.
The mood: the satisfying clarity of a whole multi-year path mapped onto one page —
different curricula, different schools, one coherent plan.
Horizontal landscape framing (16:9), top-down editorial angle.
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
    # Archetype K — macro comparison still-life, no person (was: single student at desk)
    "sat-vs-act-for-international-school-1.png": STYLE + """
A top-down editorial still life on a wooden desk comparing two tests side by side,
no people in frame. On the LEFT: a 13-inch laptop open to a neutral digital test
interface with a small graphing-calculator widget in the corner (abstract, no
readable text, no logos). On the RIGHT: a thick paper test booklet with a pencil
and an eraser resting on it, plus a small separate science-style data-chart page.
Centered between them: a classic stopwatch and a sharpened pencil. Warm side
window light, shallow depth of field, clean balanced symmetry.
The mood: two college-entrance exams laid out for an honest comparison — digital
vs paper, one decision to weigh, presented calmly side by side.
Horizontal landscape framing (16:9), top-down editorial angle.
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

    # Archetype O — standing at a wall planner (was: parent + child at table)
    "g11-12-month-master-schedule-2.png": STYLE + """
A Korean parent in their 40s and their G11 teenage child (around 16–17) standing
together in front of a large wall-mounted year planner / whiteboard calendar,
actively marking exam months. The wall calendar shows a 12-month grid with
color-coded sticky notes and handwritten marks in several colors (abstract, no
readable specifics, no logos). The child reaches up to place a sticky note on one
month while the parent points to another — a dynamic, collaborative standing
posture. Bright natural room light, a modern home study wall. Both seen in soft
side profile, no clear faces.
The mood: mapping a demanding G11 year of overlapping SAT, AP and school exams —
standing back to see the whole year at once, planning it together.
Horizontal landscape framing (16:9), editorial angle from the side.
""",

    # ═══════════════════════════════════════════════════════
    # Topic 10: AP Statistics 한국 학생 5가지 함정
    # ═══════════════════════════════════════════════════════
    # Archetype K — macro hand writing English (was: single student at desk)
    "ap-statistics-korean-traps-1.png": STYLE + """
An extreme close-up (macro) of a Korean student's hand writing full English
sentences in pen on a free-response answer sheet — a handwritten statistical
justification, several neat lines of English prose visible mid-sentence (clearly
English handwriting but no specific readable brand content). The edge of a
graphing calculator and a few ring-bound flashcards rest just outside the main
focus. Warm afternoon window light rakes across the paper, emphasizing the texture
of the handwriting. Very shallow depth of field — the pen tip and the current line
sharp, everything else soft.
The mood: the heart of AP Statistics for a Korean student — not the math, but
writing the English justification precisely, one careful sentence at a time.
Horizontal landscape framing (16:9), macro close-up angle on the hand and page.
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

    # ═══════════════════════════════════════════════════════
    # Topic 24: Track strategy by target university (evocative-heavy)
    # ═══════════════════════════════════════════════════════
    "track-strategy-by-target-university-1.png": STYLE + """
A single Korean teenage student (around 14-15, seen from behind or in
soft side profile — no clear face) standing at a literal fork in a
path, where a walking trail splits into two or three diverging routes
through a calm green park or tree-lined campus in soft morning light.
The student carries a school backpack and stands still at the junction,
looking thoughtfully down the diverging paths, as if deciding which way
to go. The diverging paths are clearly visible, lined with trees,
receding into gentle distance. Soft natural morning light, dappled
shade, a quiet contemplative atmosphere.
The mood: the quiet weight of a major decision — a young student at a
crossroads, the metaphor of choosing one path among several diverging
futures. Hopeful, contemplative, not anxious.
Horizontal landscape framing (16:9), wide editorial angle from behind.
""",

    "track-strategy-by-target-university-2.png": STYLE + """
A Korean high school student (around 16-17, soft side profile, no clear
face) sitting at a library or study desk fully focused, surrounded by
thick academic books and notes, writing intently. The desk is rich with
the texture of serious study — several open textbooks stacked, neat
handwritten notes, a few sticky tabs marking pages, a fountain pen, a
glass of water, a small desk lamp casting warm focused light in an
otherwise dim library setting. Tall bookshelves softly out of focus in
the background. The single student is the clear focal point, illuminated.
The mood: the truth that at the top tier, what matters most is not the
track you choose but the depth and excellence of your work within it —
quiet, intense, dedicated mastery. The atmosphere of rigorous study.
Horizontal landscape framing (16:9), three-quarter editorial angle.
""",

    "track-strategy-by-target-university-3.png": STYLE + """
An evocative editorial still life on a wooden desk by a window in warm
morning light: a vintage-style globe of the world as the clear central
focus, with a few university-related objects arranged around it — a
small stack of college brochures (generic, no readable text or real
logos), an open notebook with handwritten notes, a passport, a pair of
reading glasses, a fountain pen, a steaming cup of tea. Soft natural
light streams from the window, highlighting the globe. No people in
frame — pure still-life composition. Shallow depth of field with the
globe sharp and surroundings softly blurred.
The mood: the sense of a world of universities opening up — global
possibility, the breadth of international options, a family looking
outward at the whole world. Aspirational, warm, hopeful.
Horizontal landscape framing (16:9), still-life editorial angle.
""",

    "track-strategy-by-target-university-4.png": STYLE + """
A Korean parent in their 40s and their teenage child (around 15-16)
sitting side by side at a warm wooden home table in soft afternoon
light, both looking together at an open notebook where a simple
hand-drawn plan or roadmap is sketched (abstract lines and boxes, no
readable text). The parent has an arm gently around or near the child
in a supportive gesture, both leaning in toward the shared notebook
with calm, collaborative body language. On the table: two mugs of tea,
a few printed pages, a pen, a closed laptop. Both faces shown only in
soft partial side profile (no clear identifiable face). Warm window
light, neutral cozy home interior, soft-focus bookshelf behind.
The mood: a warm, collaborative Korean parent-child moment of planning
a future path together — supportive, calm, the feeling that the right
choice is a matched one made together, not a competition. Reassuring.
Horizontal landscape framing (16:9), candid editorial angle from the side.
""",

    # ═══════════════════════════════════════════════════════
    # Topic 25: What is A-Level — UK exam guide
    # ═══════════════════════════════════════════════════════
    "what-is-a-level-guide-1.png": STYLE + """
A Korean teenage student (around 16-17, soft side profile, no clear
identifiable face) sitting at a wooden desk in a quiet British-style
international school study room or library, deeply focused on working
through an advanced mathematics problem in an A4 exam-style answer
booklet. On the desk: an open thick mathematics textbook with dense
notation visible (calculus, algebra — no readable brand text), a
scientific calculator, neatly handwritten working in pen, a couple of
sharpened pencils, a ruler, a glass of water. Tall bookshelves and a
window with soft natural daylight in the background. The student writes
with careful concentration — the depth-focused, single-subject mastery
that A-Level rewards.
The mood: the quiet, disciplined depth of British-curriculum study —
fewer subjects studied very deeply. Serious, focused, calm.
Horizontal landscape framing (16:9), three-quarter editorial angle.
""",

    # Archetype I — peer / small-group study (was: parent + child at table)
    "what-is-a-level-guide-2.png": STYLE + """
Three or four diverse sixth-form students (including a Korean teenager around
16–17, plus mixed-nationality peers) collaborating around a shared table in a
bright British-style international school common room. Open A-Level textbooks,
handwritten notes, a couple of laptops and a scientific calculator are spread
across the table; one student explains something to the others, who lean in. Soft
natural daylight from large windows, a relaxed but studious atmosphere. Faces seen
mostly in soft profile or from behind, no clear identifiable faces.
The mood: the collaborative side of A-Level study — a few subjects studied deeply,
peers working through hard material together in a sixth-form setting.
Horizontal landscape framing (16:9), candid editorial group angle.
""",

    "what-is-a-level-guide-3.png": STYLE + """
A wide editorial shot of a modern international school campus in a
Southeast Asian setting (Malaysia / Singapore style) — clean
contemporary architecture with tropical greenery, palm trees, students
of diverse nationalities walking between buildings in school uniforms
(seen at a distance, no clear identifiable faces). Bright warm daylight,
blue sky, a sense of an established British-curriculum international
school. Modern glass-and-concrete school buildings, a covered walkway,
manicured lawn.
The mood: the welcoming, established feel of a Southeast Asian
international school where British A-Level curriculum is the norm —
the destination many relocating Korean families are heading toward.
Hopeful, bright, aspirational.
Horizontal landscape framing (16:9), wide architectural editorial angle.
""",

    "what-is-a-level-guide-4.png": STYLE + """
A Korean 1:1 tutoring scene — a teenage student (around 16-17) and a
tutor sitting side by side at a wooden study desk, planning out an
A-Level study roadmap together. On the desk between them: an open
planner or large sheet with a hand-drawn two-year timeline and a
shortlist of subjects/units (abstract handwriting, no readable
specifics), a mathematics textbook, a scientific calculator, colored
pens, two mugs. The tutor gestures toward the timeline while the
student takes notes. Both shown in soft partial side profile (no clear
identifiable faces). Warm desk lamp and window light, calm focused
study atmosphere, soft-focus bookshelf behind.
The mood: the calm, structured work of designing an A-Level plan
one-on-one — subject choices, unit sequencing, modular session timing
mapped out together. Methodical, reassuring, expert.
Horizontal landscape framing (16:9), three-quarter editorial angle.
""",

    # ═══════════════════════════════════════════════════════
    # Topic 26: A-Level Math A* strategy (deep-dive)
    # ═══════════════════════════════════════════════════════
    "a-level-math-a-star-strategy-1.png": STYLE + """
Close-up over-the-shoulder shot of a Korean teenage student (around
16-17, no clear identifiable face) working through an advanced
A-Level mathematics problem, writing out the FULL working line by line
in a neat exam-style answer booklet — visible rows of handwritten
algebra and calculus steps (each step shown, method clearly laid out,
no readable specific text). On the wooden desk: an open advanced
mathematics textbook with dense notation, a scientific calculator, a
ruler, sharpened pencils, an eraser, a glass of water. Warm focused
desk-lamp light from the side, late afternoon. The emphasis of the
shot is the careful, complete written working — every step shown.
The mood: the disciplined habit that earns method marks — showing
every line of working, not just the final answer. Precise, methodical,
the difference between A and A-star.
Horizontal landscape framing (16:9), close-up over-the-shoulder angle.
""",

    # Archetype F — glass-wall equation working (was: side-by-side tutor planning, dup of what-is-a-level-4)
    "a-level-math-a-star-strategy-2.png": STYLE + """
A Korean tutor (40s, partial profile, no clear face) and a teenage student (around
16–17) standing together at a large glass study-room wall covered in handwritten
mathematical working — rows of algebra, calculus and a sketched function graph
flow across the glass in marker (abstract, no readable specifics). The tutor points
to one step in the chain of working while the student studies it, marker in hand.
A bright modern tutoring room, soft daylight, the glass wall of equations filling
the frame behind them.
The mood: building an A-Level math argument step by step on the wall — Pure
foundation first, applied on top — the visible logic of how A* working is
constructed, not just a desk of notes.
Horizontal landscape framing (16:9), editorial angle on the glass wall.
""",
    "international-school-admission-map-test-math-interview-1.png": STYLE + """
A Korean parent in their late 30s to 40s sitting at a home dining table in the
evening, looking thoughtfully at an open laptop and a few printed school
brochures, one hand resting near the chin in contemplation. A child's school
workbook and a small globe sit nearby on the table, softly out of focus. Warm
domestic lighting from a side lamp, a window with soft dusk light behind.
The mood: a parent quietly weighing an international-school move and wondering
how their child will handle the unfamiliar admission test. Partial profile,
contemplative, not a tight close-up.
Horizontal landscape framing (16:9), editorial documentary angle.
""",
    "international-school-admission-map-test-math-interview-2.png": STYLE + """
A pre-teen student (around 11 to 13, seen from behind and slightly to the side,
face not identifiable) sitting at a desk taking a test on a laptop in a quiet
study room. On the laptop screen, an abstract assessment interface with simple
geometric shapes and a clean multiple-choice layout (no readable text, no logos).
The student rests one hand near the trackpad, focused and slightly tense,
mid-decision on a single question. Scratch paper and a pencil beside the laptop.
Soft daylight from a window, shallow depth of field.
The mood: concentrating through a computer-adaptive placement test, one question
at a time, unable to go back to the previous one.
Horizontal landscape framing (16:9), editorial documentary angle.
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
