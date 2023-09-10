import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
const { useEffect, useRef } = React

export function NoteMap({ info: { coords, title } }) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!window.google) {
      console.error('Google Maps API not loaded. Make sure you have included the API script.')
      return
    }

    const mapOptions = {
      zoom: 15,
    }

    const map = new window.google.maps.Map(mapRef.current, mapOptions)
    let marker = null

    if (coords && coords.lat && coords.lng) {
      map.setCenter({ lat: coords.lat, lng: coords.lng }) // Set the map center
      marker = new window.google.maps.Marker({
        position: {
          lat: coords.lat,
          lng: coords.lng,
        },
        map: map,
        title: title,
      })
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          const coords = { lat: latitude, lng: longitude }
          map.setCenter(coords) // Set the map center
          marker = new window.google.maps.Marker({
            position: coords,
            map: map,
            title: 'Current Location',
          })
        },
        error => {
          console.error('Error getting location:', error)
          // Handle the error, e.g., show an error message to the user.
        }
      )
    }

    return () => {
      if (marker) marker.setMap(null)
    }
  }, [coords, title]) // Include coords and title as dependencies

  return (
    <div className='note-map'>
      <div ref={mapRef} className='map-container' style={{ height: '300px', width: '100%' }}></div>
    </div>
  )
}
