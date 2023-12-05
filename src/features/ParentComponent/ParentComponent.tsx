import React, { useState } from 'react'
import ChildComponent from '../ChildComponent/ChildComponent'

const ParentComponent = () => {
  const [parentState, setParentState] = useState('Initial Parent State')

  const updateParentState = (newState) => {
    setParentState(newState)
  }

  return (
    <div>
      <p>Parent State: {parentState}</p>
      <ChildComponent updateParentState={updateParentState} />
    </div>
  )
}

export default ParentComponent
