import { Link as ReactRouterDomLink } from 'react-router-dom'
const Link = (props) => {
  const { url, text, full, children } = props
  return (
    <ReactRouterDomLink
      to={url}
      className={`block justify-center flex items-center text-blue-700 bg-white hover:bg-gray-50 hover:text-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center ${
        full ? 'w-full' : ''
      } `}
    >
      {text}
      {children}
    </ReactRouterDomLink>
  )
}

export default Link
