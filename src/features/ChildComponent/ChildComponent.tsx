import React from 'react'

const ChildComponent = ({ updateParentState }) => {
  const handleButtonClick = () => {
    // Call the function passed down from the parent to update its state
    updateParentState('New Parent State')
  }

  return (
    <div>
      <button onClick={handleButtonClick}>Update Parent State</button>
    </div>
  )
}

export default ChildComponent
