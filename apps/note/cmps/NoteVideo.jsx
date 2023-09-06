export function NoteVideo({ id, createdAt, isPinned, style, info }) {
  const { url, title } = info
  return (
    <div className='note-video' style={style}>
      <h2>{title}</h2>
      <h3>{createdAt}</h3>
      <div className={'video-container'}>
        {<iframe width='220' height='220' src={url}></iframe>}
      </div>
    </div>
  )
}
