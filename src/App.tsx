import { lazy, Suspense } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { ScrollManager } from './components/layout/ScrollManager'
import HomePage from './pages/home/HomePage'

const DownloadPage = lazy(() => import('./pages/download/DownloadPage'))
const DocsHomePage = lazy(() => import('./pages/docs/DocsHomePage'))
const DocArticlePage = lazy(() => import('./pages/docs/DocArticlePage'))

/**
 * Account pages are designs with sample data. They only exist in development, or when
 * VITE_ENABLE_ACCOUNTS=true at build time. Both checks are replaced at build time, so a
 * normal production build drops these chunks entirely and the paths fall through to 404.
 */
const ACCOUNTS = import.meta.env.DEV || import.meta.env.VITE_ENABLE_ACCOUNTS === 'true'
const LoginPage = ACCOUNTS ? lazy(() => import('./pages/account/LoginPage')) : null
const AccountPage = ACCOUNTS ? lazy(() => import('./pages/account/AccountPage')) : null
const AdminPage = ACCOUNTS ? lazy(() => import('./pages/account/AdminPage')) : null
const RoadmapPage = lazy(() => import('./pages/roadmap/RoadmapPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

/** App wide layout. Providers that span routes (auth, later) belong here. */
function RootLayout() {
  return (
    <>
      <ScrollManager />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="download" element={<DownloadPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="docs" element={<DocsHomePage />} />
          <Route path="docs/:group/:slug?" element={<DocArticlePage />} />
          {LoginPage && <Route path="login" element={<LoginPage />} />}
          {AccountPage && <Route path="account" element={<AccountPage />} />}
          {AdminPage && <Route path="admin" element={<AdminPage />} />}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
