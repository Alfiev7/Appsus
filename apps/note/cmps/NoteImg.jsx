import { NoteHeader } from './NoteHeader.jsx'

export function NoteImg({
  id,
  createdAt,
  isPinned,
  style,
  info,
  onUpdateTitle,
}) {
  const { url, title } = info
  return (
    <div className='note-img' style={style}>
      <p>{<img src={url} alt={title} />}</p>
      <pre className='last-edit'>Last edit: {createdAt}</pre>
    </div>
  )
}
