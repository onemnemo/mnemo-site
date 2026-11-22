import { Field } from '../../../components/Field'
import { Icon } from '../../../components/Icon'
import { SmartLink } from '../../../components/SmartLink'
import { GITHUB_URL } from '../../../lib/site'

export function Closing() {
  return (
    <section className="panel closing" id="download" aria-labelledby="closing-title">
      <Field name="dusk" glow={[0.72, 0.35]} />
      <div className="row">
        <div>
          <h2 id="closing-title">Want to give it a try?</h2>
          <p>
            It's free, and you can always export your notes and leave us behind if it's not for you.
            Of course, we hope you stick around.
          </p>
          <div className="cta">
            <SmartLink className="pill pill-light" href="/download">
              <Icon name="dl" />
              Download for desktop
            </SmartLink>
            <a className="pill pill-dim" href={GITHUB_URL}>
              <Icon name="gh" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
