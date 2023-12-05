import { useEffect, useState } from 'react'
import { setHoverId } from '../Map/mapSlice'
import { useDispatch } from 'react-redux'

export const ListHover = (props) => {
  const dispatch = useDispatch()
  return (
    <>
      <div onMouseEnter={() => dispatch(setHoverId(Math.random()))}>
        hoverme
      </div>
    </>
  )
}

export default ListHover
