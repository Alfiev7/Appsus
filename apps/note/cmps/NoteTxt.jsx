export function NoteTxt({ id, createdAt, isPinned, style, info }) {
  console.log('NoteTxt')
  const { txt } = info
  return (
    <div className='note-txt' style={style}>
      <h3>{createdAt}</h3>
      <p>{txt}</p>
    </div>
  )
}
