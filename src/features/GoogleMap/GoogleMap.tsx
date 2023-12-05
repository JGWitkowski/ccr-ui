import {
  GoogleMap,
  useJsApiLoader,
  InfoBox,
  InfoBoxProps,
} from '@react-google-maps/api'
import React, { memo, useCallback, useEffect, useState } from 'react'
import markerIcon from '../../clam-chowder-vectorportal.png'
import { useSelector, shallowEqual } from 'react-redux'
import { selectHoverId } from '../Map/mapSlice'

export const MapMemo = memo((props) => {
  console.log('changedddfjklsdjfklsdjfkljdskl')
  const { onLoad } = props
  const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 360px)',
    styles: [
      {
        featureType: 'all',
        elementType: 'all',
        stylers: [
          { saturation: -100 }, // Adjust the saturation for a retro look
          { lightness: 30 }, // Adjust the lightness for a retro look
        ],
      },
    ],
    // height: '100%',
  }
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      //   center={center}
      zoom={10}
      onLoad={onLoad}
      options={{
        // mapTypeId: isSatelliteView ? 'satellite' : 'roadmap',
        disableDefaultUI: true, // Hides the default Google Maps controls
      }}
      //onUnmount={onUnmount}
    >
      <></>
    </GoogleMap>
  )
})

export const Map = memo((props) => {
  console.log('dont refresh')
  const {
    data,
    hoverChange,
    updateParentState,
    hoverHandlerCallback,
    setShowOverlay,
    hoverId,
  } = props
  useEffect(() => {
    console.log('hoverId,sdfsdf ', hoverId)
  }, [hoverId])
  console.log('hoverId: ', hoverId)
  //   useEffect(() => {
  //     console.log('in map fdsfsdf: ', hoverId)
  //   }, [hoverId])
  const handleButtonClick = () => {
    // Call the function passed down from the parent to update its state
    updateParentState('New Parent State')
  }
  //   const center = {
  //     lat: -3.745,
  //     lng: -38.523,
  //   }
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDdg5aFvFo9vpCfYfAdMTHhUWWEXW8RMz4',
  })
  const [map, setMap] = useState(null)
  const onLoad = useCallback(function callback(map) {
    console.log('onload')
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    createPins(data, map, bounds)
    // setMap(map)
  }, [])
  const createPins = useCallback((data, map, bounds) => {
    data.map((clam, i) => {
      const infoWindow = new google.maps.InfoWindow({
        content: clam.comments,
      })
      const customMarkerIcon = {
        url: markerIcon, // Replace with the path to your custom marker icon
        scaledSize: new window.google.maps.Size(30, 30), // Adjust the size of the marker icon
      }
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
        icon: customMarkerIcon,
      })
      pin.set('id', clam._id)
      window.google.maps.event.addListener(pin, 'mouseover', () => {
        hoverHandlerCallback(pin.get('id'))
        setShowOverlay(true)
        handleButtonClick()
      })
      window.google.maps.event.addListener(pin, 'click', () => {
        // scrollTo(pin.get('id'))
        hoverHandlerCallback(pin.get('id'))
      })
      window.google.maps.event.addListener(pin, 'mouseout', () => {
        hoverHandlerCallback(null)
        setShowOverlay(false)
      })
      bounds.extend(pin.getPosition())
      map.fitBounds(bounds)
    })
  }, [])
  return (
    <>
      {isLoaded ? (
        <>
          {/* <img src={markerIcon} /> */}
          {/* <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            //onUnmount={onUnmount}
          >
            <></>
          </GoogleMap> */}
          <MapMemo
            // center={center}
            onLoad={onLoad}
          />
        </>
      ) : (
        <></>
      )}
    </>
  )
})

export default Map
