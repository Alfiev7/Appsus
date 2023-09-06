export function NotePreview({ note }) {
  console.log('NOTE Preview')
  return (
    <article className='note-preview'>
      <h2>{note.type}</h2>
      {/* <p>{note.info.map(item => item)}</p> */}
    </article>
  )
}
