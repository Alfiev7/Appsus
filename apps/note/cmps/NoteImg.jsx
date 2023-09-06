export function NoteImg({ id, createdAt, isPinned, style, info }) {
  const { url, title } = info
  return (
    <div className='note-txt' style={style}>
      <h2>{title}</h2>
      <h3>{createdAt}</h3>
      <p>{<img src={url} alt={title} />}</p>
    </div>
  )
}
