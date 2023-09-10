const { useState, useEffect, useRef } = React
import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'

export function NoteRecording({ id, createdAt, info, type }) {
  const [audioStream, setAudioStream] = useState(null)
  const [recording, setRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState(info.url || null)
  const [mediaRecorderState, setmediaRecorderState] = useState(null)
  const eqRef = useRef(null)
  const micRef = useRef(null)
  let timeout

  function startRecording() {
    if (!audioStream) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          setAudioStream(stream)
          const mediaRecorder = new MediaRecorder(stream)
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
        })
        .catch(error => {
          console.error('Error accessing microphone:', error)
        })
    } else {
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

  function handleMouseDown() {
    timeout = setTimeout(() => {
      startRecording()
    }, 500)
  }

  function handleMouseUp() {
    clearTimeout(timeout)
    if (recording) {
      stopRecording()
    }
  }

  useEffect(() => {
    if (recording) {
      const interval = setInterval(() => {
        utilService.animateCSS(eqRef.current, 'tada')
      }, 200)
      return () => clearInterval(interval)
    }
  }, [recording])

  return (
    <div className='note-recording'>
      {recording ? (
        <React.Fragment>
          <p>Release to save</p>
          <a
            ref={eqRef}
            className='material-symbols-outlined icon icon-eq'
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            title='Stop recording'
          >
            graphic_eq
          </a>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>Hold to record</p>
          <a
            ref={micRef}
            className='material-symbols-outlined icon icon-mic'
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseOver={() => utilService.animateCSS(micRef.current, 'heartBeat')}
            title='Start recording'
          >
            mic
          </a>
        </React.Fragment>
      )}
      {
        <div className='audio-container'>
          <audio src={audioUrl} controls />
        </div>
      }
    </div>
  )
}
