// const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AddReview } from './cmps/AddReview.jsx'
import { BookAppHeader } from './cmps/BookAppHeader.jsx'
import { About } from './pages/About.jsx'
import { AboutTeam } from './cmps/AboutTeam.jsx'
import { AboutGoal } from './cmps/AboutGoal.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { Home } from './pages/Home.jsx'
import { AppHeader } from '../../cmps/AppHeader.jsx'

export function BooksRoot() {
  return (
    // <Router>
    <section className='app main-layout'>
      {/* <AppHeader /> */}
      <BookAppHeader />

      <main>
        <Routes>
          <Route path='/' element={<BookIndex />} />
          <Route path='/:bookId' element={<BookDetails />} />
          <Route path='review' element={<AddReview />} />
          <Route path='/edit/:bookId' element={<BookEdit />} />
        </Routes>
      </main>
    </section>
    // </Router>
  )
}
