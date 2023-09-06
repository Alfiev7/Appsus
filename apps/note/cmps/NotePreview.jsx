import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'

export function NotePreview({ note }) {
  console.log('NOTE Preview')

  function compToRender() {
    switch (note.type) {
      case 'NoteTxt':
        return <NoteTxt {...note} />

      case 'NoteImg':
        return <NoteImg {...note} />

      // case 'NoteVideo':
      //   return <NoteVideo {...note} />

      case 'NoteTodos':
        return <NoteTodos {...note} />

      default:
        return null
    }
  }
  return (
    <article className='note-preview'>
      {compToRender()}
      <div className='note-actions'>
        <a className='material-icons-outlined md-32'>delete</a>
        <a className='material-icons-outlined'>palette</a>
      </div>
    </article>
  )
}
