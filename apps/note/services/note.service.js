import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const notesDB = [
  {
    id: 'n101',
    createdAt: 'Aug 20, 1994 at 05:20',
    type: 'NoteTxt',
    isPinned: false,
    style: {},
    style: { backgroundColor: '#b4ddd3' },
    info: {
      title: 'Componenta Estupanda ',
      txt: 'Fullstack Me Baby! Lorem ipsum dolpur adipisicing elit. Veoloremque non commodi dignissimos veniam aperiam quod, dolorum, unde illum nesciunt neque.',
    },
  },
  {
    id: 'n102',
    createdAt: 'Sep 11, 2011 at 16:24',
    type: 'NoteImg',
    isPinned: false,
    info: { url: 'https://i.imgflip.com/7y6l0y.jpg', title: 'Making this...' },
    style: { backgroundColor: '#fffabc' },
  },
  {
    id: 'n103',
    createdAt: 'Jul 13, 1973 at 08:30',
    type: 'NoteTodos',
    isPinned: false,
    style: { backgroundColor: '#d3bfdb' },
    info: {
      title: 'I have todo this !',
      todos: [
        { txt: "Catch 'em all", doneAt: null, isDone: false },
        { txt: 'Kamehameha a cat', doneAt: 187111111, isDone: false },
      ],
    },
  },
  {
    id: 'n104',
    createdAt: 'Jan 1, 0 at 00:00',
    type: 'NoteVideo',
    isPinned: false,
    style: {},
    info: {
      title: 'Deprecated feature',
      url: 'https://www.youtube.com/embed/Yvz_axxWG4Y',
    },
  },
  {
    id: 'n112',
    createdAt: 'Nov 08, 2023 at 18:00',
    type: 'NoteImg',
    isPinned: false,
    info: {
      url: 'https://t3.ftcdn.net/jpg/01/20/68/68/360_F_120686889_nDaqiMH8I5AmT5B0hpuJ14ZasdrrgRAK.jpg',
      title: 'CR mornings be like..',
    },
    style: { backgroundColor: '' },
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
  updateNoteContent,
  getIcons,
  getDefaultFilter,
  getPinnedNotes,
  getUnpinnedNotes,
}

function query(filterBy) {
  const regex = new RegExp(filterBy, 'i')

  return storageService.query(NOTES_KEY).then(notes => {
    if (filterBy) {
      return notes.filter(({ info, type }) => {
        return (
          regex.test(info.title) ||
          regex.test(info.txt) ||
          (info.todos && info.todos.some(todo => regex.test(todo.txt))) ||
          regex.test(type)
        )
      })
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

function getDefaultFilter() {
  return { title: '', txt: '', type: '' }
}

function getEmptyNote() {
  return {
    type: 'NoteTxt',
    isPinned: false,
    createdAt: utilService.getFormattedDate(),
    style: {},
    info: {
      title: '',
      txt: '',
      todos: [],
      url: '',
    },
  }
}

function updateNoteContent(noteId, noteType, updatedText, updatedTitle, index) {
  return get(noteId).then(note => {
    if (updatedTitle) note.info.title = updatedTitle

    switch (noteType) {
      case 'NoteTxt':
        if (updatedText) note.info.txt = updatedText
        break
      case 'NoteTodos':
        if (updatedText) note.info.todos[index].txt = updatedText
        break
      case 'NoteVideo':
      case 'NoteImg':
        break
      default:
        throw new Error('Unsupported noteType')
    }

    return save(note)
  })
}

function getIcons() {
  return {
    add_notes: {
      title: 'Text note',
      type: 'NoteTxt',
      placeholder: "What's on your mind ?",
      disabled: false,
      isExpanded: false,
    },
    check_box: {
      title: 'Todo list',
      type: 'NoteTodos',
      placeholder: 'Add title to create template',
      disabled: true,
      isExpanded: true,
    },
    image: {
      title: 'Image note',
      type: 'NoteImg',
      placeholder: 'Add image url',
      disabled: false,
      isExpanded: true,
    },
    slideshow: {
      title: 'Video note',
      type: 'NoteVideo',
      placeholder: 'Add video url',
      disabled: false,
      isExpanded: true,
    },
    brush: {
      title: 'Canvas note',
      type: 'NoteCanvas',
      placeholder: 'Add brush content',
      disabled: false,
      isExpanded: true,
    },
  }
}

function getPinnedNotes() {
  return storageService.query(NOTES_KEY).then(notes => {
    return notes.filter(note => note.isPinned)
  })
}

function getUnpinnedNotes() {
  return storageService.query(NOTES_KEY).then(notes => {
    return notes.filter(note => !note.isPinned)
  })
}
