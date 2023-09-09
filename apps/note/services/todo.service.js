import { noteService } from './note.service.js'

export const todoService = {
  addTodo,
  removeTodo,
}

function addTodo(todoToAdd, id, setTodos) {
  noteService
    .get(id)
    .then(note => {
      const newTodo = { txt: todoToAdd, isDone: false, doneAt: null }
      note.info.todos.push(newTodo)
      return noteService.save(note).then(() => newTodo)
    })
    .then(newTodo => {
      setTodos(prevTodos => [...prevTodos, newTodo])
    })
    .catch(error => {
      console.error("Couldn't add todo:", error)
    })
}

function removeTodo(index, id, setTodos) {
  noteService
    .get(id)
    .then(note => {
      note.info.todos.splice(index, 1)
      return noteService.save(note)
    })
    .then(setTodos(prevTodos => prevTodos.filter((_, idx) => idx !== index)))
    .catch(err => {
      console.error("Couldn't remove todo:", err)
    })
}

// function onRemoveTodo(index) {
//     noteService
//       .get(id)
//       .then(note => {
//         note.info.todos.splice(index, 1)
//         return noteService.save(note)
//       })
//       .then(setTodos(prevTodos => prevTodos.filter((_, idx) => idx !== index)))
//       .catch(err => {
//         console.error("Couldn't remove todo:", err)
//       })
//   }
