import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { PageShell } from '../../components/layout/PageShell'
import { ADMIN_STATS, DAILY_SYNCS, DOWNLOADS, USERS } from '../../content/mockDashboard'
import '../../styles/app.css'

export default function AdminPage() {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const users = USERS.filter(
    (u) => !q || `${u.name} ${u.email} ${u.plan}`.toLowerCase().includes(q),
  )
  const peak = Math.max(...DAILY_SYNCS)

  return (
    <PageShell
      scope="p-app"
      title="Admin | Mnemo"
      description="Mnemo admin dashboard."
      nav={{ solid: true, logoHref: '/', downloadHref: '/download' }}
    >
      <main className="panel dash">
        <div className="wrap">
          <div className="top">
            <div>
              <h1 className="h2">Admin.</h1>
              <p className="sub">Accounts, sync health and downloads across Mnemo.</p>
            </div>
          </div>

          <ul className="tiles">
            {ADMIN_STATS.map((s) => (
              <li className="box" key={s.text}>
                <b>{s.value}</b>
                {s.text}
              </li>
            ))}
          </ul>

          <div className="grid">
            <section className="box span2">
              <h2>Sync sessions, last 14 days</h2>
              <div
                className="bars"
                role="img"
                aria-label={`Daily sync sessions, from ${DAILY_SYNCS[0]} to ${DAILY_SYNCS[DAILY_SYNCS.length - 1]}`}
              >
                {DAILY_SYNCS.map((v, i) => (
                  <i
                    key={i}
                    style={{ height: `${(v / peak) * 100}%` }}
                    title={v.toLocaleString()}
                  />
                ))}
              </div>
            </section>
            <section className="box">
              <h2>Downloads by system</h2>
              <ul className="split-bars">
                {DOWNLOADS.map((d) => (
                  <li key={d.os}>
                    <span>{d.os}</span>
                    <span>{Math.round(d.share * 100)}%</span>
                    <div className="meter">
                      <i style={{ width: `${d.share * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="box span3">
              <div className="table-top">
                <h2>Accounts</h2>
                <label className="find">
                  <Icon name="search" />
                  <input
                    type="search"
                    placeholder="Search accounts"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search accounts"
                  />
                </label>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Plan</th>
                      <th>Devices</th>
                      <th>Last seen</th>
                      <th>Status</th>
                      <th aria-label="Actions" />
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.email}>
                        <td>
                          <b>{u.name}</b>
                          {u.email}
                        </td>
                        <td>{u.plan}</td>
                        <td>{u.devices}</td>
                        <td>{u.seen}</td>
                        <td>
                          <span className={`status s-${u.status.toLowerCase()}`}>{u.status}</span>
                        </td>
                        <td>
                          <button className="pill pill-soft small" type="button">
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!users.length && <p className="none">No accounts match “{query.trim()}”.</p>}
              </div>
            </section>
          </div>
        </div>
      </main>
    </PageShell>
  )
}
