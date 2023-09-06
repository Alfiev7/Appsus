export function NotePreview({ note }) {
  console.log('NOTE Preview')
  return (
    <article className='note-preview'>
      <h2>{note.type}</h2>
      {/* <p>{note.info.map(item => item)}</p> */}
      <div className='note-actions'>
        <a className='material-icons-outlined md-32'>delete</a>
        <a className='material-icons-outlined'>palette</a>
      </div>
    </article>
  )
}
