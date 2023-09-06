import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const notesDB = [
  {
    id: 'n101',
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: true,
    style: {},
    style: { backgroundColor: '#00d' },
    info: {
      txt: 'Fullstack Me Baby! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel suscipit cum excepturi corporis, eveniet consequuntur. Mollitia amet eligendi doloremque non commodi dignissimos veniam aperiam quod, dolorum, unde illum nesciunt neque.Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel suscipit cum excepturi corporis, eveniet consequuntur. Mollitia amet eligendi doloremque non commodi dignissimos veniam aperiam quod, dolorum, unde illum nesciunt neque.Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel suscipit cum excepturi corporis, eveniet consequuntur. Mollitia amet eligendi doloremque non commodi dignissimos veniam aperiam quod, dolorum, unde illum nesciunt neque.Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel suscipit cum excepturi corporis, eveniet consequuntur. Mollitia amet eligendi doloremque non commodi dignissimos veniam aperiam quod, dolorum, unde illum nesciunt neque.Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel suscipit cum excepturi corporis, eveniet consequuntur. Mollitia amet eligendi doloremque non commodi dignissimos veniam aperiam quod, dolorum, unde illum nesciunt neque.Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel suscipit cum excepturi corporis, eveniet consequuntur. Mollitia amet eligendi doloremque non commodi dignissimos veniam aperiam quod, dolorum, unde illum nesciunt neque.',
    },
  },
  {
    id: 'n102',
    type: 'NoteImg',
    isPinned: false,
    info: { url: 'https://i.imgflip.com/7y6l0y.jpg', title: 'Making this...' },
    style: { backgroundColor: '#fffabc' },
  },
  {
    id: 'n103',
    type: 'NoteTodos',
    isPinned: false,
    style: {},
    info: {
      title: 'Get my stuff together',
      todos: [
        { txt: 'Driving license', doneAt: null, isDone: false },
        { txt: 'Coding power', doneAt: 187111111, isDone: false },
      ],
    },
  },
  {
    id: 'n104',
    type: 'NoteVideo',
    isPinned: false,
    style: {},
    info: {
      title: 'Why use this ?',
      url: 'https://www.youtube.com/embed/uCH1ta5OUHw',
    },
  },
]
const NOTES_KEY = 'notesDB'
_createNotes()

export const noteService = {
  query,
  getNotes,
  remove,
  get,
  save,
  getEmptyNote,
}

function query(filterBy) {
  return storageService.query(NOTES_KEY).then(notes => {
    if (filterBy.title) {
      const regex = new RegExp(filterBy.title, 'i')
      notes = notes.filter(note => regex.test(note.title))
    }
    if (filterBy.price) {
      notes = notes.filter(note => note.listPrice.amount >= filterBy.price)
    }
    if (filterBy.publishedDate) {
      notes = notes.filter(note => note.publishedDate >= filterBy.publishedDate)
    }
    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId).then(note => {
    // note = _setNextPrevNoteId(note)
    return note
  })
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTES_KEY, note)
  } else {
    return storageService.post(NOTES_KEY, note)
  }
}

function getNotes() {
  return Promise.resolve(notesDB)
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY)
  if (!notes || !notes.length) {
    notes = notesDB
    utilService.saveToStorage(NOTES_KEY, notes)
  }
}

function getEmptyNote() {
  return {
    type: 'NoteTxt',
    isPinned: false,
    style: {},
    info: {
      title: '',
      txt: '',
    },
  }
}
