import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
const { useEffect, useRef } = React

export function NoteMap() {
  const mapRef = useRef(null)
  let marker = null

  useEffect(() => {
    const mapOptions = {
      zoom: 15,
    }

    const map = new window.google.maps.Map(mapRef.current, mapOptions)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          const coords = { lat: latitude, lng: longitude }
          map.setCenter(coords)
          marker = new window.google.maps.Marker({
            position: coords,
            map: map,
            title: 'Current Location',
          })
          showSuccessMsg('Map pinned to your current location')
        },
        error => {
          console.error('Error getting location:', error)
        }
      )
    }

    return () => {
      if (marker) marker.setMap(null)
    }
  }, [])

  return (
    <div className='note-map'>
      <div ref={mapRef} className='map-container' style={{ height: '300px', width: '100%' }}></div>
    </div>
  )
}
