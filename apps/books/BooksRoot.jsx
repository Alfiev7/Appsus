// const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AddReview } from './cmps/AddReview.jsx'
import { BookAppHeader } from './cmps/BookAppHeader.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { BookIndex } from './pages/BookIndex.jsx'

export function BooksRoot() {
  return (
    <section className='app main-layout'>
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
  )
}
