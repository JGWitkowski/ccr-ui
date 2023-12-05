import { Box, Tab, Tabs } from '@mui/material'
import Map from '../Map'
import { useCallback, useMemo, useState } from 'react'
import axios from 'axios'
import ClamsList from '../ClamsList'
import InfoWindow from '../InfoWindow'
import { useGetClamsListQuery } from '../../services/docs'
import CustomTabPanel from '../../compoments/Tab/CustomTabPanel'
function Reviews() {
  const containerStyle = {
    width: '100%',
    height: '100%',
  }
  const { data, error, isLoading } = useGetClamsListQuery()
  type Clam = {
    id: number
    name: string
    address: string
    totalScore: number
    tasteScore: number
    volumeScore: number
    consistencyScore: number
    priceScore: number
    lat: number
    long: number
    notes: string
  }
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [currentWindow, setCurrentWindow] = useState(null)
  //   const [value, setTabValue] = useState(0)
  //   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //     setTabValue(newValue)
  //   }
  //     function a11yProps(index: number) {
  //       return {
  //         id: `simple-tab-${index}`,
  //         'aria-controls': `simple-tabpanel-${index}`,
  //       }
  //     }
  const scrollTo = useCallback((id) => {
    const topPos = document.getElementById(id).offsetTop
    document.getElementById('clamList').scrollTop = topPos - 10
  }, [])
  return (
    <div className="w-full fixed flex justify-center min-h-screen">
      <div
        id="clamList"
        className="h-screen overflow-y-scroll w-full md:w-4/12 h-12"
      >
        {!isLoading && <ClamsList data={data} />}
      </div>
      <div className="w-full hidden md:block md:w-8/12 bg-gray-400 h-screen mt-0">
        {showInfoWindow && currentWindow && (
          <InfoWindow data={data.data} currentWindow={currentWindow} />
        )}
        {data && (
          <Map
            containerStyle
            hoverHandler={setCurrentWindow}
            data={data.data}
            setShowInfoWindow={setShowInfoWindow}
            scrollTo={scrollTo}
          />
        )}
      </div>
    </div>
  )
}

export default Reviews
