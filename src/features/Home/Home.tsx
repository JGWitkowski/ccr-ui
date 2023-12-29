import { Tab, Tabs } from '@mui/material'
import Link from '../../compoments/Link'
import { useGetClamsListQuery } from '../../services/docs'
import ClamsList from '../ClamsList'
import CustomTabPanel from '../../compoments/Tab/CustomTabPanel'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Map from '../Map'
import InfoWindow from '../InfoWindow'
import ParentComponent from '../ParentComponent/ParentComponent'
import GoogleMap from '../GoogleMap/GoogleMap'
import ListHover from '../ListHover/ListHover'
import MapHover from '../MapHover/MapHover'
import { useSelector } from 'react-redux'
import { selectHoverId } from '../Map/mapSlice'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { data, error, isLoading } = useGetClamsListQuery()
  const [currentWindow, setCurrentWindow] = useState(null)
  const [value, setTabValue] = useState(0)
  const navigate = useNavigate()
  const [showOverlay, setShowOverlay] = useState(false)
  const hoverId = useSelector(selectHoverId)

  const hoverHandlerCallback = useCallback((id) => {
    setCurrentWindow({ id: id })
  }, [])
  const [parentState, setParentState] = useState('Initial Parent State')
  const updateParentState = useCallback(
    (newState) => {
      setParentState(newState)
    },
    [setParentState],
  )
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }
  return (
    <div className="overflow-hidden sm:flex">
      <div className="fixed sm:relative z-10 sm:w-8/12 w-full min-h-full">
        {data && (
          <GoogleMap
            hoverHandlerCallback={hoverHandlerCallback}
            updateParentState={updateParentState}
            data={data.data}
            setShowOverlay={setShowOverlay}
            hoverId={hoverId}
          />
        )}
      </div>
      <div className=" overflow-y-scroll z-10 top-72 fixed sm:w-4/12 w-full left-0 bottom-0 sm:overflow-x-hidden sm:top-20 sm:left-auto sm:right-0">
        {!isLoading && (
          <ClamsList hoverId={currentWindow && currentWindow.id} data={data} />
        )}
      </div>
    </div>
  )
}

export default Home
