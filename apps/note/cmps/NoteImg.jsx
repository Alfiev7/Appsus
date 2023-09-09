export function NoteImg({ info }) {
  const { url, title } = info
  return (
    <div className='note-img'>
      <p>{<img src={url} alt={title} />}</p>
    </div>
  )
}
