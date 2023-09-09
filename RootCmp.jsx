const { Route, Routes, Outlet } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './views/About.jsx'
import { Home } from './views/Home.jsx'
import { MailIndex } from './apps/mail/views/MailIndex.jsx'
import { NoteIndex } from './apps/note/views/NoteIndex.jsx'
import { BooksRoot } from './apps/books/BooksRoot.jsx'

export function App() {
  return (
    <Router>
      <section className='app'>
        <AppHeader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/book/*' element={<BooksRoot />}>
            <Route element={<Outlet />} />
          </Route>
          <Route path='/mail/*' element={<MailIndex />} />
          <Route path='/note' element={<NoteIndex />} />
        </Routes>
      </section>
    </Router>
  )
}
