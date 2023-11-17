import { Box } from '@mui/material'
import { useGetClamsListQuery } from '../../services/docs'

const ClamsList = () => {
  const { data, error, isLoading } = useGetClamsListQuery()
  return (
    <div className="max-w-2xl flex flex-col m-auto items-center p-4">
      <h1 className="text-4xl self-start mb-6">Reviews</h1>
      {!isLoading &&
        data &&
        data.data.map((clam, i) => (
          <div
            key={i}
            className="max-w-xl p-3 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-6"
          >
            <div className="mb-4 border-b-2 pb-3">
              <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {clam.name}
              </h5>
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
                {/* <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span> */}
                {/* <a
                  href="#"
                  className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                >
                  73 reviews
                </a> */}
              </div>
            </div>
            <Box className="flex flex-row">
              <Box className="flex flex-col text-sm">
                <Box className="mr-12 mb-1">
                  <span className="pr-1">Taste:</span>
                  <span className="font-bold">{clam.tasteScore}</span>
                </Box>
                <Box>
                  <span className="pr-1">Volume:</span>{' '}
                  <span className="font-bold">{clam.volumeScore}</span>
                </Box>
              </Box>
              <Box className="flex flex-col text-sm">
                <Box className="mr-12 mb-1">
                  <span className="pr-1">Consistency:</span>
                  <span className="font-bold">{clam.consistencyScore}</span>
                </Box>
                <Box>
                  <span className="pr-1">Price:</span>{' '}
                  <span className="font-bold">{clam.priceScore}</span>
                </Box>
              </Box>
            </Box>
            <Box className="mt-4">
              <p className="text-xs mb-1">Comments:</p>
              <Box>
                <p className="text-xs">{clam.notes}</p>
              </Box>
            </Box>
            {/* <svg
              className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
            </svg> */}
            {/* <a
              href="#"
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              See our guideline
              <svg
                className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </a> */}
          </div>
        ))}
    </div>
  )
}
export default ClamsList
