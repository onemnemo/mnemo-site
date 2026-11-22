import { Field } from '../../../components/Field'
import { Reveal } from '../../../components/Reveal'
import { Shot } from '../../../components/Shot'
import { shot } from '../../../lib/assets'
import type { SilkName } from '../../../lib/webgl/palettes'

interface WellProps {
  field: SilkName
  seed: number
  name: string
  width: number
  height: number
  alt: string
}

function Well({ field, seed, name, width, height, alt }: WellProps) {
  return (
    <div className="well">
      <Field name={`silk-${field}`} seed={seed} />
      <Shot
        className="shot"
        light={shot(`${name}-light`)}
        dark={shot(`${name}-dark`)}
        width={width}
        height={height}
        alt={alt}
        lazy
      />
    </div>
  )
}

/** The bento grid of smaller details. */
export function Details() {
  return (
    <section className="details" aria-labelledby="details-title">
      <div className="wrap">
        <div className="head">
          <Reveal as="h2" className="h2" id="details-title">
            From problem sets to exam week.
          </Reveal>
        </div>
        <div className="bento">
          <Reveal as="article" className="bx b-a">
            <h3>Maths that reads like maths.</h3>
            <p>Type equations inline or as blocks, right next to the figure they explain.</p>
            <Well
              field="sky"
              seed={71}
              name="closeup-equations"
              width={1506}
              height={850}
              alt="A physics note with the equation of motion for a damped oscillator."
            />
          </Reveal>
          <Reveal as="article" className="bx b-b" delay={0.06}>
            <div>
              <h3>Jump anywhere in two keys.</h3>
              <p>Search across every note, flashcard and mind map as fast as you can type.</p>
            </div>
            <div className="keys" aria-hidden="true">
              <kbd>Cmd</kbd>
              <span>+</span>
              <kbd>K</kbd>
            </div>
          </Reveal>
          <Reveal as="article" className="bx b-c" delay={0.12}>
            <div className="big">10,000+</div>
            <p>cards in a single library, with zero lag when it's time to review.</p>
          </Reveal>
          <Reveal as="article" className="bx b-s" delay={0.18}>
            <h3>Projects, courses and daily life.</h3>
            <p>Organize work, research and personal folders together without the clutter.</p>
            <Well
              field="meadow"
              seed={72}
              name="closeup-sidebar"
              width={496}
              height={1800}
              alt="The sidebar with Biology 101, Organic chemistry, Norwegian B2 and other courses."
            />
          </Reveal>
          <Reveal as="article" className="bx b-d">
            <h3>Code that stays tidy.</h3>
            <p>
              Syntax-highlighted blocks for lab scripts and CS assignments, kept right beside your
              notes.
            </p>
            <Well
              field="rose"
              seed={73}
              name="closeup-code"
              width={1506}
              height={652}
              alt="A code block inside a lab note."
            />
          </Reveal>
          <Reveal as="article" className="bx b-e" delay={0.06}>
            <h3>A streak worth keeping.</h3>
            <p>Use your home screen to keep track of your life.</p>
            <Well
              field="sunset"
              seed={74}
              name="closeup-stats"
              width={2122}
              height={400}
              alt="Home widgets showing a 23 day streak and 88 percent retention."
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
