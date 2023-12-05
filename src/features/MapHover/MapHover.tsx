import { useSelector } from 'react-redux'
import { selectHoverId } from '../Map/mapSlice'
import { useEffect } from 'react'

export const MapHover = (props) => {
  console.log('refresh')
  const hoverId = useSelector(selectHoverId)
  useEffect(() => {
    console.log('hoverid: ', hoverId)
  }, [hoverId])
  return <></>
}

export default MapHover
