import { Field } from '../../components/Field'
import { Icon } from '../../components/Icon'
import { PageShell } from '../../components/layout/PageShell'
import { SmartLink } from '../../components/SmartLink'
import { ME } from '../../content/mockDashboard'
import '../../styles/app.css'

export default function AccountPage() {
  const used = ME.storageUsedGb / ME.storageTotalGb
  return (
    <PageShell
      scope="p-app"
      title="Your account | Mnemo"
      description="Sync, devices and your Mnemo account."
      nav={{ solid: true, logoHref: '/', downloadHref: '/download' }}
    >
      <main className="panel dash">
        <div className="wrap">
          <div className="top">
            <div>
              <h1 className="h2">Welcome back, {ME.name}.</h1>
              <p className="sub">Everything is in sync. Last synced {ME.lastSync}.</p>
            </div>
            <SmartLink className="pill pill-soft" href="/login">
              Sign out
            </SmartLink>
          </div>

          <div className="grid">
            <section className="box hero-box">
              <Field name="silk-sky" seed={23} />
              <div className="box-copy">
                <h2>Sync is on.</h2>
                <p>Changes on any device reach the others within seconds.</p>
                <button className="pill pill-light" type="button">
                  <Icon name="cycle" />
                  Sync now
                </button>
              </div>
            </section>

            <section className="box">
              <h2>Your library</h2>
              <ul className="stats">
                {ME.library.map((s) => (
                  <li key={s.text}>
                    <b>{s.value}</b>
                    {s.text}
                  </li>
                ))}
              </ul>
            </section>

            <section className="box">
              <h2>Plan and storage</h2>
              <p>
                {ME.plan}. {ME.storageUsedGb} GB of {ME.storageTotalGb} GB used.
              </p>
              <div
                className="meter"
                role="meter"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(used * 100)}
                aria-label="Storage used"
              >
                <i style={{ width: `${used * 100}%` }} />
              </div>
              <button className="pill pill-solid" type="button">
                Upgrade
              </button>
            </section>

            <section className="box span2">
              <h2>Devices</h2>
              <ul className="rows">
                {ME.devices.map((d) => (
                  <li key={d.name}>
                    <div>
                      <b>{d.name}</b>
                      {d.os}. {d.seen}.
                    </div>
                    {d.current ? (
                      <span className="mute">This device</span>
                    ) : (
                      <button className="pill pill-soft small" type="button">
                        Remove
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section className="box">
              <h2>Account</h2>
              <p>{ME.email}</p>
              <div className="actions">
                <button className="pill pill-soft" type="button">
                  Change password
                </button>
                <button className="pill pill-soft" type="button">
                  <Icon name="dl" />
                  Export my data
                </button>
                <button className="pill danger" type="button">
                  Delete account
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </PageShell>
  )
}
