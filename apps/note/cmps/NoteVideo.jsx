import { NoteHeader } from './NoteHeader.jsx'

export function NoteVideo({ createdAt, info }) {
  const { url } = info
  return (
    <div className='note-video'>
      <div className={'video-container'}>{<iframe className='video-player' src={url}></iframe>}</div>
      <pre className='last-edit'>Last edit: {createdAt}</pre>
    </div>
  )
}
