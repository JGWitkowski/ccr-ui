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

const Home = () => {
  const { data, error, isLoading } = useGetClamsListQuery()
  const [currentWindow, setCurrentWindow] = useState(null)
  const [value, setTabValue] = useState(0)
  const [showOverlay, setShowOverlay] = useState(false)
  const hoverId = useSelector(selectHoverId)
  console.log('initisdjnfiosdfhoverId', hoverId)
  useEffect(() => {
    console.log('hoverId: ', hoverId)
  }, [hoverId])
  // const test = useMemo(() => {
  //   return { active: false }
  // }, [])

  const hoverHandlerCallback = useCallback((id) => {
    console.log('hover over id: ', id)
    setCurrentWindow({ id: id })
  }, [])
  const [parentState, setParentState] = useState('Initial Parent State')
  useEffect(() => {
    console.log('tes fhangEshowOverlay ', showOverlay)
  }, [showOverlay])
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
      {/* <div className="mb-4 w-full">
        <Link text="Add Review" url="/clams-submit" />
      </div> */}
      {/* <h1 className="text-lg text-left mb-6">
        Clam system in progress. Choose between limited options below:
      </h1>
      <Link text="Submit Review" url="/clams-submit" />
      <Link text="View All Reviews" url="/clams" /> */}
      {/* <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="List" {...a11yProps(0)} />
        <Tab label="Map" {...a11yProps(1)} />
      </Tabs> */}
      {/* <CustomTabPanel value={value} index={0}>
        {!isLoading && <ClamsList data={data} />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}></CustomTabPanel> */}
      {/* <ParentComponent /> */}
      {/* <h1 className="text-3xl text-left mb-6">Recent reviews</h1> */}
      <div className=" overflow-y-scroll z-10 top-72 fixed sm:w-4/12 w-full left-0 bottom-0 sm:overflow-x-hidden sm:top-20 sm:left-auto sm:right-0">
        {!isLoading && (
          <ClamsList hoverId={currentWindow && currentWindow.id} data={data} />
        )}
      </div>
      {/* <div className="relative right-0 sm:fixed w-full md:block md:w-8/12 bg-gray-400 h-screen mt-0">
        {showOverlay && currentWindow && currentWindow.id && (
          <InfoWindow data={data.data} currentWindow={currentWindow} />
        )}
      </div> */}
    </div>
  )
}

export default Home
