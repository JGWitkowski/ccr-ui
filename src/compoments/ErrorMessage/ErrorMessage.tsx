const ErrorMessage = (props) => {
  const { text } = props
  return (
    <>
      {text && (
        <div className="text-red-600 pt-2">
          <p>Error: {text}</p>
        </div>
      )}
    </>
  )
}
export default ErrorMessage
