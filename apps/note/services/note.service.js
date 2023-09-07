import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const notesDB = [
  {
    id: 'n101',
    createdAt: 'Aug 20, 1994',
    type: 'NoteTxt',
    isPinned: true,
    style: {},
    style: { backgroundColor: '#b4ddd3' },
    info: {
      title: 'Estoy Componenta Estupando ',
      txt: 'Fullstack Me Baby! Lorem ipsum dolpur adipisicing elit. Veoloremque non commodi dignissimos veniam aperiam quod, dolorum, unde illum nesciunt neque.',
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
    style: { backgroundColor: '#d3bfdb' },
    info: {
      title: 'I have todo this, i have to !',
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
  {
    id: 'n112',
    type: 'NoteImg',
    isPinned: false,
    info: {
      url: 'https://t3.ftcdn.net/jpg/01/20/68/68/360_F_120686889_nDaqiMH8I5AmT5B0hpuJ14ZasdrrgRAK.jpg',
      title: 'Me on CR mornings',
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
      todos: [],
      url: '',
    },
  }
}

function updateNoteContent(noteId, noteType, updatedText, updatedTitle, index) {
  return get(noteId).then(note => {
    switch (noteType) {
      case 'NoteTxt':
        if (updatedTitle) note.info.title = updatedTitle
        if (updatedText) note.info.txt = updatedText
        return save(note)
      case 'NoteTodos':
        if (updatedTitle) note.info.title = updatedTitle
        if (updatedText) {
          note.info.todos[index].txt = updatedText
        }
        return save(note)

      default:
        throw new Error('Unsupported noteType')
    }
  })
}

function getIcons() {
  return {
    add_notes: {
      type: 'NoteTxt',
      placeholder: "What's on your mind ?",
      disabled: false,
      isExpanded: false,
    },
    check_box: {
      type: 'NoteTodos',
      placeholder: 'Add todos title',
      disabled: true,
      isExpanded: true,
    },
    image: {
      type: 'NoteImg',
      placeholder: 'Add image url',
      disabled: false,
      isExpanded: true,
    },
    slideshow: {
      type: 'NoteVideo',
      placeholder: 'Add video url',
      disabled: false,
      isExpanded: true,
    },
    brush: {
      type: 'NoteCanvas',
      placeholder: 'Add brush content',
      disabled: false,
      isExpanded: true,
    },
  }
}
