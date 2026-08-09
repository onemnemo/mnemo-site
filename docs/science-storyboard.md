# /science storyboard v2: "The journey of one fact"

> As built (2026-08-05). The page ships with all seven scenes, the scroll
> reveal layer, and the sitewide motion pass.
>
> The spark protagonist and the scene-7 logo reveal are not part of the
> page; the sections below that describe them are design history. Scene
> captions come from StageMarker instead: seven progress dashes plus
> "NN · Word" opening every scene, echoed by the dashes on the quiz card.
>
> Scene 3 uses QuizCard, a CSS-only stacked quiz card with radio answers,
> and scene 1 deals its fact card from the same deck. Scene 6 sits
> text-beside-lamp rather than stacked, the scene-7 mapping is a
> borderless 2x2, and the paper and cobalt bands carry texture-rules and
> texture-grid backgrounds.
>
> SVG diagrams carry the curve and network scenes, so those illustrations
> are not in the repo; rescue, night, and the graduation sprite strip are,
> kept small. Scene 1 opens on an animated squid treading water over the
> ink sea that forms the paper-to-cobalt boundary, and scene 6 animates
> its sleeper the same way.

Working design doc for the "Why it works" page. The page follows a single
fact through a student's memory, one scene per canvas band, and ends by
revealing that the journey was Mnemo's design doc all along. It must read
as a complete semantic article with JS disabled; every interaction is an
enhancement layer, never the content itself.

Tone rule: warm and credible. No pop-science numbers we cannot source.
The credibility IS the differentiator; this should feel like a
well-designed museum exhibit, not a landing page.

## The protagonist

The fact travels as the spark: a small warm-glowing mark that is secretly
the Mnemo logo glyph (the two brain lobes from logo_icon.svg). For six
scenes it is only ever "the memory." Scene 7 reveals the logo, so the
reader realizes they have been rooting for the brand mark all along, and
from then on the logo means "a memory that survived."

Rules for the spark:
- It is NEVER rasterized into generated art. It is one SVG element the
  page owns, so it can idle-shimmer, travel between scenes, dim, and cast
  light on its surroundings. Art prompts leave physical room for it.
- It is a survivor, not a mascot. Persistent, a little stubborn. Each
  scene gives it one emotional beat:
  1. New: born bright beside the fact card, gentle pulse.
  2. Fading: hesitates at the top of the curve, slides, dims, nearly
     exits the scene.
  3. Retrieved: caught at the last possible moment; the rope tightens one
     beat before it would drop out of frame.
  4. Strengthening: re-brightens at every review bump.
  5. Connected: travels several threads of the network at once (memory
     has many roads back, and the spark uses them).
  6. Consolidating: its flicker stops. Perfectly steady, perfectly still.
     Stillness reads as safety.
  7. Remembered: scales up, settles, and docks into the logo reveal.
- Every scene shows a one-word mono caption under the spark, so the
  reader always knows where the character is in its journey:
  New / Fading / Retrieved / Strengthening / Connected / Consolidating /
  Remembered.

Canvas order, each used exactly once (full palette tour on purpose):
paper, cobalt, blush, paper, meadow, ink, butter.

---

## Scene 1: A fact is born (paper) [New]

Hook, as three beats, not a title-plus-paragraph:
"Read this once." then the fact card: "Octopuses have three hearts."
then: "That tiny idea just changed your brain."

Science: a few neurons strengthened their connections to hold it, a
fresh memory trace, and a fragile one. ("Memory trace" is the accurate
term; "engram" only if we want the vocabulary lesson.)

Art: optional (P5). The spark is born beside the fact card.

## Scene 2: The fall (cobalt, light text) [Fading]

Heading: "Left alone, it fades fast."

Science: the forgetting curve. Ebbinghaus 1885, replicated by Murre and
Dros 2015. Without review, most of a new memory slips away within days.
Framing: forgetting is the brain's filing policy, not a defect.

Art: P1, Soma sliding down the curve.

Interaction: curve draws on scroll; the spark hesitates at the top,
slides, dims, and nearly leaves the frame. No-JS: drawn curve, dim spark
near the bottom.

## Scene 3: The rescue (blush) [Retrieved]

Heading: "Pulling it back is what saves it."

Opens by actually asking: "Quick, without scrolling up: how many hearts
does an octopus have?" A real flashcard (details/summary, works without
JS) lets the reader check themselves. The page practices what it
preaches; this is the most important interaction on the site.

Science: retrieval practice, Roediger and Karpicke 2006. Wording:
"Successful retrieval changes the memory itself and makes the next
recall easier." The effort is the treatment (desirable difficulty).

Art: P2, Soma hauling the rope. The catch happens at the last moment.

## Scene 4: The rhythm (paper) [Strengthening]

Heading: "Timing beats trying."

Science: the spacing effect (Cepeda et al. 2006; Dunlosky et al. 2013).
Must include the unintuitive sentence: "The best moment to review is not
right after learning. It is just before the memory would disappear."
Then: "Cramming buys you the exam. Spacing buys you the year."

Art: none; the diagram is the star. The scene-2 curve returns and gets
rescued repeatedly: decay, review, flatter decay, review, flatter still.
Spark re-brightens at each bump.

## Scene 5: The web (meadow) [Connected]

Heading: "Facts survive by making friends."

Science: elaboration and the generation effect. Memory is a network; a
fact wired to other facts has many roads back, and every extra road is
another chance to find it. Carries notes editor and mindmaps with equal
billing. Never imply a notes-to-flashcards pipeline.

Art: P3, Soma pins ONE card to the cork board, and the threads start
connecting themselves across the board: the board becomes a network on
its own. The spark travels multiple paths at once (the visual argument
for associative memory).

## Scene 6: The night shift (ink) [Consolidating]

Heading: "Then sleep files it away."

Science, worded carefully: "Sleep is when much of the brain's memory
consolidation happens: the hippocampus replays the day's keepers and
hands them to long-term storage. An app can remind you to study. It
cannot do this part for you." (Rasch and Born 2013.)

Art: P4, Soma asleep in a pool of lamplight beside an empty open jar;
the page places the live spark inside the jar.

Payoff: the spark's flicker, present all page, goes completely steady.
No pulse, no movement. The reader feels "it is safe now." Light doodles
as stars; the quietest scene by design.

## Scene 7: The reveal (butter, then tear into footer) [Remembered]

Heading: "You just watched one fact survive."

Then one line, alone: "Every tool in Mnemo exists to help that happen."

The mapping, one line each:
- Retrieval: flashcards and quizzes.
- Timing: a scheduler that reviews right before you would forget.
- Connections: notes in your own words, maps of how it all fits.
- Sleep: that's your job.

The logo reveal: the spark scales up, settles, and sits beside the
wordmark. "The little spark you have been following is the Mnemo mark.
A memory that survived."

Thesis, the last line before the CTA: "Mnemo was not designed around
features. It was designed around how memories survive."

Coral/inverted Download CTA, secondary link home. Sources block, then
TornEdge with mascot into the footer.

## Sources block

Small mono list, part of the credibility play: Ebbinghaus 1885; Murre
and Dros 2015; Roediger and Karpicke 2006; Cepeda et al. 2006; Dunlosky
et al. 2013; Rasch and Born 2013.

---

## Aliveness plan (journey, not a static flat page)

- The spark is one persistent element with an idle shimmer, and its glow
  tints what is near it (radial gradient that follows it; on the ink
  scene it IS the lamplight).
- Scene atmospheres, subtle and canvas-specific: faint graph-paper grid
  behind the cobalt curve, growth doodles on meadow, star doodles on
  ink. Texture never competes with type.
- Generated art gets split into layers for idle motion where the blobs
  are disconnected, following the 404 layer-split pattern already in
  scripts/process-assets.mjs (tv / soma / screen-mask). Candidates:
  the jar separate from sleeping Soma; the board separate from Soma.
- Sprite-sheet or layer animation over video: everything loops slowly
  and quietly. prefers-reduced-motion collapses all of it to the static
  article, which is complete on its own.

## Asset list (reference-anchored generation prompts)

All prompts attach the 404 scene plus the pose sheet as style
references. The spark never appears in art; each scene leaves room for
it. Files land in public/illos/science/ as slide.png, rescue.png,
web.png, night.png (optional: spark-catch.png, grad.png), then get keyed
and layer-split through scripts/process-assets.mjs.

P1 slide: Soma slides down a thick ink curve on its back, glasses
askew, gills trailing, flatly resigned; empty air alongside the curve
where the page will place the falling spark.

P2 rescue: Soma at the edge of a round hole, hauling a rope with both
paws, one foot braced, slightly gritted flat mouth; the rope rises out
of the hole and ends in a small loop just above it, with empty space
above the loop for the spark.

P3 web: Soma on a step stool pinning ONE index card to a cork board;
red yarn already connects several other pinned cards into a loose
network; one pinned card is blank, reserved for the spark; pencil behind
gill; deadpan concentration.

P4 night: Soma asleep curled on a round rug inside a warm circular pool
of lamplight, droopy nightcap, three tiny Z's; beside it an EMPTY open
glass jar (the page puts the spark inside); everything outside the pool
of light is plain cream; the scene must read as one island of light for
the near-black band.

## Build plan

1. Semantic article (this pass): all seven scenes with final copy,
   canvas bands, spark component with captions, static SVG figures
   (forgetting curve, spaced curve, constellation), the details/summary
   flashcard, logo reveal, sources, CTA, tear. Ships before art; slots
   reserved.
2. Art integration as assets arrive (keying + layer splitting).
3. Interaction layer: scroll-driven curve drawing, spark travel and
   beats, self-connecting threads, steady-glow moment, via
   IntersectionObserver and CSS. Static article remains the fallback.
4. Motion pass polish with the sitewide motion work.
