import { Box, Button, InputLabel, Tab, Tabs, TextField } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import {
  useLazyGetRestaurantLongLatQuery,
  useSaveClamMutation,
} from '../../services/docs'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../../compoments/ErrorMessage'
import { SCORE_VALIDATION_RULE } from './clams.constants'
import CustomTabPanel from '../../compoments/Tab'
export const Clams = () => {
  const [getRestaurantLongLat, longlatResults] =
    useLazyGetRestaurantLongLatQuery()
  const [value, setTabValue] = useState(0)
  useEffect(() => {
    setLatLng({ lat: longlatResults.lat, long: longlatResults.lng })
  }, [longlatResults])
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm()
  const [saveClam, { isLoading }] = useSaveClamMutation()
  const [totalScore, setTotalScore] = useState(0)
  const consistencyScore = watch('consistencyScore')
  const volumeScore = watch('volumeScore')
  const tasteScore = watch('tasteScore')
  const priceScore = watch('priceScore')
  useEffect(() => {
    const score = calculateScore()
    setTotalScore(score)
    console.log('rhjfkldsjfhklsdf')
  }, [consistencyScore, volumeScore, tasteScore, priceScore])
  const [address, setAddress] = useState('')
  const [clamSaved, setClamSaved] = useState(false)
  const [latLng, setLatLng] = useState(null)
  const calculateScore = () => {
    const total =
      (Number(getValues('consistencyScore')) +
        Number(getValues('volumeScore')) +
        Number(getValues('tasteScore')) +
        Number(getValues('priceScore'))) /
      4
    return total
  }
  const onAddressChange = useCallback((address) => {
    console.log('addres obj: ', address)
    //onChange({ target: { name: 'address', value: address.value } })
    // setFormState((prev) => ({
    //   ...prev,
    //   [event.target.name]: event.target.value,
    // }))
    setValue('address', address)
    getRestaurantLongLat(address.value.place_id)
  }, [])
  const onChange = useCallback((event) => {
    setFormState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }, [])
  // const submitClam = async () => {

  //   try {
  //     const savedClam = await saveClam({
  //       ...formState,
  //       totalScore: totalScore,
  //     }).unwrap()
  //     setClamSaved(true)
  //   } catch (err) {
  //     console.log('Errrodsf: ', err)
  //   }
  // }
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }
  const submitClam = handleSubmit(async (data) => {
    console.log('datafafdsd: ', data)
    try {
      const savedClam = await saveClam({
        ...data,
        ...longlatResults.currentData,
        totalScore: data.overallScore ? data.overallScore : totalScore,
      }).unwrap()
      setClamSaved(true)
    } catch (err) {
      console.log('Errrodsf: ', err)
    }
  })
  return (
    <>
      {!clamSaved && (
        <Box className="max-w-2xl flex flex-col m-auto items-center p-4 mb-12">
          <Box className="w-full">
            <h1 className="text-2xl self-start mb-3 mt-6 font-bold">Info</h1>
            <Box className="mb-6">
              <InputLabel className="mb-2" htmlFor="name">
                Restaurant Name
              </InputLabel>
              <TextField
                className="w-full"
                id="name"
                type="text"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Restaurant name is required',
                  },
                })}
              />
              <ErrorMessage text={errors.name?.message} />
            </Box>
            <Box className="mb-6">
              <InputLabel className="mb-2">Location</InputLabel>
              <GooglePlacesAutocomplete
                selectProps={{
                  address,
                  onChange: onAddressChange,
                }}
                apiKey="AIzaSyAv9_xmZqNEp1dzVjfZYHWOKBs-Mk71pak"
              />
            </Box>
            <h1 className="text-2xl self-start mb-2 mt-12 font-bold">
              Scoring
            </h1>
            <p className="mb-4">What did you think?</p>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Simple Score" {...a11yProps(1)} />
                  <Tab label="Detailed Score" {...a11yProps(0)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Box className="pt-3">
                  <InputLabel className="mb-2">Overall Score</InputLabel>
                  <TextField
                    className="w-40"
                    id="overallScore"
                    type="number"
                    {...register('overallScore', SCORE_VALIDATION_RULE)}
                  />
                </Box>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Box className="pt-3">
                  <Box className="mb-6 w-6/12">
                    <InputLabel className="mb-2">Consistency Score</InputLabel>
                    <TextField
                      className="w-40"
                      id="consistencyScore"
                      type="number"
                      {...register('consistencyScore', SCORE_VALIDATION_RULE)}
                    />
                    <ErrorMessage text={errors.consistencyScore?.message} />
                  </Box>
                  <Box className="mb-6 w-6/12">
                    <InputLabel className="mb-2">Volume Score</InputLabel>
                    <TextField
                      className="w-40"
                      id="volumeScore"
                      type="number"
                      {...register('volumeScore', SCORE_VALIDATION_RULE)}
                    />
                    <ErrorMessage text={errors.volumeScore?.message} />
                  </Box>
                  <Box className="mb-6">
                    <InputLabel className="mb-2">Taste Score</InputLabel>
                    <TextField
                      className="w-40"
                      id="tasteScore"
                      type="number"
                      {...register('tasteScore', SCORE_VALIDATION_RULE)}
                    />
                    <ErrorMessage text={errors.tasteScore?.message} />
                  </Box>
                  <Box className="mb-6">
                    <InputLabel className="mb-2">Price Score</InputLabel>
                    <TextField
                      className="w-40"
                      id="priceScore"
                      type="number"
                      {...register('priceScore', SCORE_VALIDATION_RULE)}
                    />
                    <ErrorMessage text={errors.priceScore?.message} />
                  </Box>
                  <Box className="mb-6">
                    <span className="font-bold">
                      Total Score: {totalScore.toFixed(1)}
                    </span>
                  </Box>
                </Box>
              </CustomTabPanel>
            </Box>
            <h1 className="text-2xl self-start mb-3 mt-12 font-bold">
              Additional Details
            </h1>
            <Box className="mb-6">
              <InputLabel className="mb-2">Price</InputLabel>
              <TextField
                className="w-40"
                id="price"
                type="number"
                onChange={onChange}
                {...register('price')}
              />
            </Box>
            <Box className="mb-6">
              <InputLabel className="mb-2">Notes</InputLabel>
              <TextField
                className="w-full"
                id="notes"
                type="text"
                onChange={onChange}
                {...register('notes')}
              />
            </Box>
            {!isLoading && (
              <Button
                className="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={submitClam}
              >
                Save Clam
              </Button>
            )}
            {isLoading && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </Box>
        </Box>
      )}
      {clamSaved && (
        <Box className="max-w-2xl flex flex-col m-auto items-center p-4">
          <Box className="w-full">
            <h1 className="text-2xl self-start mb-9 mt-6">
              Thank you for claming!
            </h1>
            <a
              href="/"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              See all reviews
            </a>
          </Box>
        </Box>
      )}
    </>
  )
}
export default Clams
