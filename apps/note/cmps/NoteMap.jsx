const { useEffect, useRef } = React

export function NoteMap({ id, createdAt, isPinned, style, info, type }) {
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
        },
        error => {
          console.error('Error getting location:', error)
        }
      )
    }

    return () => {
      if (marker) {
        marker.setMap(null)
      }
    }
  }, [])

  return (
    <div className='note-map' style={style}>
      <div
        ref={mapRef}
        className='map-container'
        style={{ height: '300px', width: '100%' }}
      ></div>
      <pre className='last-edit'>Last edit: {createdAt}</pre>
    </div>
  )
}