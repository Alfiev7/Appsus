export function NoteTxt({ id, createdAt, isPinned, style, info }) {
  const { txt, title } = info
  return (
    <div className='note-txt' style={style}>
      <h2>{title}</h2>
      <h3>{createdAt}</h3>
      <p>{txt}</p>
    </div>
  )
}
