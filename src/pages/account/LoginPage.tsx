import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Field } from '../../components/Field'
import { PageShell } from '../../components/layout/PageShell'
import { SmartLink } from '../../components/SmartLink'
import '../../styles/app.css'

type Mode = 'signin' | 'signup'

export default function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('signin')
  const signup = mode === 'signup'

  // Design only: real sign in will live in src/lib once sync ships.
  const submit = (e: FormEvent) => {
    e.preventDefault()
    navigate('/account')
  }

  return (
    <PageShell
      scope="p-app"
      title={signup ? 'Create your Mnemo account' : 'Sign in to Mnemo'}
      description="Sign in to manage sync and your devices."
      nav={{ solid: true, logoHref: '/', downloadHref: '/download' }}
    >
      <main className="panel auth">
        <div className="art">
          <Field name="silk-sunset" seed={19} />
        </div>
        <form className="form" onSubmit={submit}>
          <h1 className="h2">{signup ? 'Create an account.' : 'Welcome back.'}</h1>
          <p className="sub">
            {signup
              ? 'Start syncing in a minute. It is free.'
              : 'Sign in to manage sync and your devices.'}
          </p>
          {signup && (
            <label className="in">
              <span>Name</span>
              <input name="name" autoComplete="name" required />
            </label>
          )}
          <label className="in">
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label className="in">
            <span>Password</span>
            <input
              name="password"
              type="password"
              autoComplete={signup ? 'new-password' : 'current-password'}
              minLength={8}
              required
            />
          </label>
          {!signup && (
            <SmartLink className="forgot" href="/login">
              Forgot your password?
            </SmartLink>
          )}
          <button className="pill pill-solid wide" type="submit">
            {signup ? 'Create account' : 'Sign in'}
          </button>
          <p className="switch">
            {signup ? 'Already have an account?' : 'New to Mnemo?'}{' '}
            <button type="button" onClick={() => setMode(signup ? 'signin' : 'signup')}>
              {signup ? 'Sign in' : 'Create an account'}
            </button>
          </p>
        </form>
      </main>
    </PageShell>
  )
}
