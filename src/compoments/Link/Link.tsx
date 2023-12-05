const Link = (props) => {
  const { url, text, full } = props
  return (
    <a
      href={url}
      className={`block text-blue-700 bg-white border hover:bg-gray-50 hover:text-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center ${
        full ? 'w-full' : ''
      } `}
    >
      {text}
    </a>
  )
}

export default Link
