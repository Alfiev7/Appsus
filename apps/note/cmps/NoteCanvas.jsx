import { noteService } from '../services/note.service.js'

const { useRef, useEffect, useState } = React

export function NoteCanvas({ id, createdAt, isPinned, style, info, type }) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const { url: canvasUrl } = info

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvasRef.current.getContext('2d')

    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
    }
    img.src = canvasUrl

    function startDrawing({ offsetX, offsetY }) {
      setIsDrawing(true)
      ctx.beginPath()
      ctx.moveTo(offsetX, offsetY)
    }

    function draw({ offsetX, offsetY }) {
      if (!isDrawing) return
      ctx.lineTo(offsetX, offsetY)
      ctx.stroke()
    }

    function stopDrawing() {
      setIsDrawing(false)
    }

    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseup', stopDrawing)

    return () => {
      canvas.removeEventListener('mousedown', startDrawing)
      canvas.removeEventListener('mousemove', draw)
      canvas.removeEventListener('mouseup', stopDrawing)
    }
  }, [isDrawing, canvasUrl])

  function onCanvasSave(newUrl) {
    console.log('newUrl', newUrl)
    noteService.updateNoteContent(id, type, null, null, null, newUrl)
  }

  function clearCanvas() {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    onCanvasSave(canvasRef.current.toDataURL())
  }

  return (
    <div className='note-canvas'>
      <canvas
        ref={canvasRef}
        width='300'
        height='150'
        className='canvas'
      ></canvas>
      <div className='canvas-buttons'>
        <button onClick={() => onCanvasSave(canvasRef.current.toDataURL())}>
          Save Canvas
        </button>
        <button onClick={clearCanvas}>Clear Canvas</button>
      </div>
    </div>
  )
}
