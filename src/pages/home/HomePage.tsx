import { Fragment, useState } from 'react'
import { Field } from '../../components/Field'
import { PageShell } from '../../components/layout/PageShell'
import { WORD_BAND } from '../../content/home'
import '../../styles/home.css'
import { Billion } from './sections/Billion'
import { Closing } from './sections/Closing'
import { Curve } from './sections/Curve'
import { Details } from './sections/Details'
import { Faq } from './sections/Faq'
import { Hero } from './sections/Hero'
import { Next } from './sections/Next'
import { NotesSplit } from './sections/NotesSplit'
import { ScienceRail } from './sections/ScienceRail'
import { Statement } from './sections/Statement'
import { Tools } from './sections/Tools'

function WordBand() {
  const track = (
    <div className="track">
      {WORD_BAND.map((w) => (
        <Fragment key={w.word}>
          <span className="tile">
            <Field as="span" name={`silk-${w.field}`} seed={w.seed} />
          </span>
          <span className="w">{w.word}</span>
        </Fragment>
      ))}
    </div>
  )
  return (
    <div className="words" aria-hidden="true">
      {track}
      {track}
    </div>
  )
}

export default function HomePage() {
  const [navSolid, setNavSolid] = useState(false)
  return (
    <PageShell
      scope="p-home"
      title="Mnemo: Remember what you study"
      description="Notes, mind maps and flashcards in one free app. It works offline and keeps your library on your own computer."
      nav={{ solid: navSolid, current: 'home', logoHref: '/#top', downloadHref: '/download' }}
    >
      <main id="top">
        <div className="panel">
          <Hero onNavSolid={setNavSolid} />
          <Statement />
          <Tools />
          <NotesSplit />
          <Details />
        </div>
        <Curve />
        <div className="panel">
          <ScienceRail />
          <Billion />
          <Next />
        </div>
        <WordBand />
        <Faq />
        <Closing />
      </main>
    </PageShell>
  )
}
