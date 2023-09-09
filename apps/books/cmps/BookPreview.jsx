export function BookPreview({ book }) {
  return (
    <article className='book-preview'>
      <h2>{book.title}</h2>
      <h4>
        Price:{' '}
        {`${(book.listPrice && book.listPrice.amount) || 'Unknown'} ${
          (book.listPrice && book.listPrice.currencyCode) || ''
        }`}
      </h4>
      <h4>Published: {book.publishedDate}</h4>
      <img
        src={(book.thumbnail && book.thumbnail) || 'No Image'}
        alt={book.title}
      />
    </article>
  )
}
