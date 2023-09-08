import { eventBusService } from '../services/event-bus.service.js'
const { useState, useEffect, useRef } = React

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', msg => {
      setMsg(msg)
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 1500)
    })
    return unsubscribe
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${msg.type}`}>
      <a className='material-symbols-outlined' onClick={closeMsg}>
        close
      </a>
      {msg.txt}
    </section>
  )
}
