import { useEffect, useMemo } from 'react'

export const InfoWindow = (props) => {
  const { data, currentWindow } = props
  const foundClam = useMemo(() => {
    return data.find((clam) => {
      return clam._id === currentWindow.id
    })
  }, [])
  return (
    <>
      <div className="bottom-0 z-10 fixed h-80 w-80 bg-white p-4 pt-10">
        <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
          {foundClam.name}
        </h5>
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
            {foundClam.totalScore && foundClam.totalScore.toFixed(1)}
          </p>
        </div>
        <div className="mt-4 max-w-md">
          <p className="text-xs mb-1">Comments:</p>
          <div>
            <p className="text-xs">{foundClam.notes}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoWindow
