import { NoteHeader } from './NoteHeader.jsx'

export function NoteVideo({ id, createdAt, isPinned, style, info }) {
  const { url } = info
  return (
    <div className='note-video' style={style}>
      <div className={'video-container'}>
        {<iframe className='video-player' src={url}></iframe>}
      </div>
      <pre className='last-edit'>Last edit: {createdAt}</pre>
    </div>
  )
}
