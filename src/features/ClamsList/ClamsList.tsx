import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setHoverId } from '../Map/mapSlice'
import { useEffect, useRef } from 'react'

const ClamListItem = (props) => {
  const { clam, i, hoverId } = props
  const dispatch = useDispatch()
  // const targetElementRef = useRef(null)
  // const handleScrollToElement = () => {
  //   // Scroll to the target element
  //   targetElementRef.current.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'start',
  //   })
  // }
  // const handleMouseEnter = (id) => {
  //   console.log('hover id: ', id)
  //   dispatch(setMarkerHover(id))
  // }
  // useEffect(() => {
  //   handleScrollToElement()
  // }, [hoverId])
  // const handleMouseLeave = () => {
  //   dispatch(setMarkerHover(id))
  // }
  return (
    <>
      <div
        onMouseEnter={(event) => {
          // handleMouseEnter
          if (event.target.id) {
            dispatch(setHoverId(event.target.id))
          }
        }}
        id={clam._id.toString()}
        key={i}
        className={`${
          hoverId === clam._id ? 'bg-blue-100' : ''
        } pb-10 pt-5 max-w-3xl p-3 w-full bg-gray-50 hover:bg-white border-b-2 hover:border-black-900  hover:shadow dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="mb-4 border-b-2 border-gray-100 pb-3 relative">
          <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white max-w-[80%]">
            {clam.name}
          </h5>
          <div className="absolute top-0 right-0 text-sm text-gray-500">
            1 Review
          </div>
          {clam.address && (
            <p className="text-xs text-gray-500 mb-2 pr-10">
              {JSON.parse(clam.address).description}
            </p>
          )}
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
              {clam.totalScore && clam.totalScore.toFixed(1)}
            </p>
          </div>
        </div>
        {clam.tasteScore && (
          <div className="flex flex-row">
            <div className="flex flex-col text-sm">
              <div className="mr-12 mb-1">
                <span className="pr-1">Taste:</span>
                <span className="font-bold">{clam.tasteScore}</span>
              </div>
              <div>
                <span className="pr-1">Volume:</span>{' '}
                <span className="font-bold">{clam.volumeScore}</span>
              </div>
            </div>
            <div className="flex flex-col text-sm">
              <div className="mr-12 mb-1">
                <span className="pr-1">Consistency:</span>
                <span className="font-bold">{clam.consistencyScore}</span>
              </div>
              <div>
                <span className="pr-1">Price:</span>{' '}
                <span className="font-bold">{clam.priceScore}</span>
              </div>
            </div>
          </div>
        )}
        {!clam.tasteScore && (
          <div className="flex flex-row">
            <div className="flex flex-col text-sm">
              <div className="mr-12 mb-1">
                <span className="pr-1">Detailed score not available</span>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4 max-w-md">
          <p className="text-xs mb-1">Comments:</p>
          <div>
            <p className="text-xs">{clam.notes}</p>
          </div>
        </div>
      </div>
    </>
  )
}

const ClamsList = (props) => {
  const { data, hoverId } = props
  useEffect(() => {
    console.log('this hoverIdsdfsfd', hoverId)
    const targetElement = document.getElementById(hoverId)
    // const violation = document.getElementById(hoverId)
    if (targetElement) {
      // console.log('scrollto: ', violation)
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [hoverId])
  return (
    <div className="flex flex-col m-auto overflow-y-scroll">
      {data &&
        data.data.map((clam, i) => (
          <ClamListItem hoverId={hoverId} clam={clam} i={i} />
        ))}
    </div>
  )
}
export default ClamsList
