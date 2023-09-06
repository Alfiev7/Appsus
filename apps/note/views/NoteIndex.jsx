const { useEffect, useState } = React
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

export function NoteIndex() {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    noteService.getNotes().then(setNotes)
  }, [])

  if (!notes) return <div>Loading...</div>
  return <section className='note-index'>{<NoteList notes={notes} />}</section>
}
