const { useState, useEffect, useRef } = React
import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'

export function NoteRecording({ id, createdAt, isPinned, style, info, type }) {
  const [audioStream, setAudioStream] = useState(null)
  const [recording, setRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState(info.url || null)
  const [mediaRecorderState, setmediaRecorderState] = useState(null)
  const eqRef = useRef(null)

  useEffect(() => {
    let stream

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(audioStream => {
          stream = audioStream
          setAudioStream(audioStream)
        })
        .catch(error => {
          console.error('Error accessing microphone:', error)
        })
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (recording) {
      const interval = setInterval(() => {
        utilService.animateCSS(eqRef.current, 'tada')
      }, 200)
      return () => clearInterval(interval)
    }
  }, [recording])

  function startRecording() {
    if (audioStream) {
      const mediaRecorder = new MediaRecorder(audioStream)
      setmediaRecorderState(mediaRecorder)
      const chunks = []

      mediaRecorder.ondataavailable = e => {
        chunks.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        noteService.updateNoteContent(id, type, null, null, null, url)
      }

      mediaRecorder.start()
      setRecording(true)
    }
  }

  function stopRecording() {
    mediaRecorderState.stop()
    setRecording(false)
  }

  function handleRecording(ev) {
    ev.preventDefault()
    if (recording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <div className='note-recording' style={style}>
      {recording ? (
        <a
          ref={eqRef}
          className='material-symbols-outlined icon icon-eq'
          onClick={handleRecording}
          title='Stop recording'
        >
          graphic_eq
        </a>
      ) : (
        <a className='material-symbols-outlined icon icon-mic' onClick={handleRecording} title='Start recording'>
          mic
        </a>
      )}
      {
        <div className='audio-container'>
          <audio src={audioUrl} controls />
        </div>
      }
      <pre className='last-edit'>Last edit: {createdAt}</pre>
    </div>
  )
}
