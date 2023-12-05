import {
  GoogleMap,
  useJsApiLoader,
  InfoBox,
  InfoBoxProps,
} from '@react-google-maps/api'
import React, { memo, useCallback, useState } from 'react'

export const Map = memo((props) => {
  console.log('refresh')
  const { data, containerStyle, hoverChange, updateParentState } = props
  const handleButtonClick = () => {
    // Call the function passed down from the parent to update its state
    updateParentState('New Parent State')
  }
  const center = {
    lat: -3.745,
    lng: -38.523,
  }
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDdg5aFvFo9vpCfYfAdMTHhUWWEXW8RMz4',
  })
  const [map, setMap] = useState(null)
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    createPins(data, map, bounds)
    setMap(map)
  }, [])
  const createPins = useCallback((data, map, bounds) => {
    data.map((clam, i) => {
      const infoWindow = new google.maps.InfoWindow({
        content: clam.comments,
      })
      const pin = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(
          //   Number(clam.lat) + Number(Number('0.00') + Math.random()),
          Number(clam.lat),
          Number(clam.long),
          //   clam.long + (Number('0.000') - Math.random()),
        ),
        map: map,
        zIndex: 1,
        optimized: false,
      })
      pin.set('id', clam._id)
      window.google.maps.event.addListener(pin, 'mouseover', () => {
        // hoverHandlerCallback(pin.get('id'))
        handleButtonClick()
        console.log('here')
        hoverChange.active = !hoverChange.active
      })
      window.google.maps.event.addListener(pin, 'click', () => {
        props.scrollTo(pin.get('id'))
      })
      window.google.maps.event.addListener(pin, 'mouseout', () => {})
      bounds.extend(pin.getPosition())
      console.log('saving pin: ', pin.getPosition()?.lat())
      map.fitBounds(bounds)
    })
  }, [])
  return (
    <>
      <div>
        <button onClick={handleButtonClick}>Update Parent State</button>
      </div>
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            //onUnmount={onUnmount}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
        </>
      ) : (
        <></>
      )}
    </>
  )
})

export default Map
