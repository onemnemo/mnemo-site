import { Field } from '../../../components/Field'
import { Reveal } from '../../../components/Reveal'
import { Shot } from '../../../components/Shot'
import { shot } from '../../../lib/assets'
import { NOTE_POINTS } from '../../../content/home'

export function NotesSplit() {
  return (
    <section className="split" id="notes" aria-labelledby="notes-title">
      <div className="wrap grid2">
        <Reveal className="art">
          <Field name="silk-rose" seed={42} />
          <div className="win">
            <Shot
              light={shot('note-chemistry-light')}
              dark={shot('note-chemistry-dark')}
              width={2880}
              height={1800}
              alt="A chemistry note with a rate law and a table of reaction orders."
              lazy
            />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="h2" id="notes-title">
            Notes built for real classes.
          </h2>
          <p className="sub">
            The editor handles what your courses need, so you can focus on studying.
          </p>
          <ul>
            {NOTE_POINTS.map((p) => (
              <li key={p.title}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {p.icon}
                </svg>
                <div>
                  <b>{p.title}</b>
                  {p.body}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
