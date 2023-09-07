import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const notesDB = [
  {
    id: 'n101',
    createdAt: "Aug 20, '94 at 05:20",
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
    createdAt: "Sep 11, '11 at 16:24",
    type: 'NoteImg',
    isPinned: false,
    info: { url: 'https://i.imgflip.com/7y6l0y.jpg', title: 'Making this...' },
    style: { backgroundColor: '#fffabc' },
  },
  {
    id: 'n103',
    createdAt: "Jul 13, '73 at 08:30",
    type: 'NoteTodos',
    isPinned: false,
    style: { backgroundColor: '#d3bfdb' },
    info: {
      title: 'I have todo this !',
      todos: [
        { txt: "Catch 'em all", doneAt: 'Aug 20, 1994', isDone: false },
        { txt: 'Kamehameha a cat', doneAt: 'Sep 9, 2011', isDone: false },
      ],
    },
  },
  {
    id: 'n104',
    createdAt: "Jan 1, '0 at 00:00",
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
    createdAt: "Nov 08, '23 at 18:00",
    type: 'NoteImg',
    isPinned: false,
    info: {
      url: 'https://t3.ftcdn.net/jpg/01/20/68/68/360_F_120686889_nDaqiMH8I5AmT5B0hpuJ14ZasdrrgRAK.jpg',
      title: 'CR mornings be like..',
    },
    style: { backgroundColor: '#e9e3d4' },
  },
  {
    id: 'n1112',
    createdAt: "Mar 02, '95 at 19:28",
    type: 'NoteCanvas',
    isPinned: false,
    info: {
      url: `
        data:image/png;base64,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
      `,
      title: 'WEIRD',
    },
    style: { backgroundColor: '#e2f6d3' },
  },
  {
    id: 'n15552',
    createdAt: "Jun 10, '22 at 21:28",
    type: 'NoteMap',
    isPinned: false,
    info: {
      url: '',
      title: 'Where I live',
    },
    style: { backgroundColor: '#f6e2dd' },
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
      coords: {
        lat: 0,
        lng: 0,
      },
    },
  }
}

function updateNoteContent(
  noteId,
  noteType,
  updatedText,
  updatedTitle,
  index,
  updatedUrl
) {
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
      case 'NoteCanvas':
        if (updatedUrl) note.info.url = updatedUrl
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
      placeholder: 'Add title to create todo-list',
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
      placeholder: 'Add title to create canvas',
      disabled: true,
      isExpanded: true,
    },
    map: {
      title: 'Map note',
      type: 'NoteMap',
      placeholder: 'Add title to create map',
      disabled: true,
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
