import { Box, Button, InputLabel, TextField } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useSaveClamMutation } from '../../services/docs'
import { useDispatch } from 'react-redux'
export const Clams = () => {
  console.log('goot ehref')
  const dispatch = useDispatch()
  const [saveClam, { isLoading }] = useSaveClamMutation()
  const [totalScore, setTotalScore] = useState(0)
  const [formState, setFormState] = useState({
    name: '',
    address: {},
    consistencyScore: 0,
    volumeScore: 0,
    tasteScore: 0,
    priceScore: 0,
    price: 0,
    cuisine: '',
    awardWinning: '',
    notes: '',
    totalScore: totalScore,
  })
  useEffect(() => {
    console.log('consistency change')
    const score = calculateScore()
    setTotalScore(score)
  }, [
    formState.consistencyScore,
    formState.volumeScore,
    formState.tasteScore,
    formState.priceScore,
  ])
  const [address, setAddress] = useState('')
  const [clamSaved, setClamSaved] = useState(false)
  const calculateScore = () => {
    console.log('formState.consistencyScore: ', formState.consistencyScore)
    console.log('formState.volumeScore', formState.volumeScore)
    console.log('plus', formState.consistencyScore + formState.volumeScore)
    const total =
      (Number(formState.consistencyScore) +
        Number(formState.volumeScore) +
        Number(formState.tasteScore) +
        Number(formState.priceScore)) /
      4
    console.log('sjdfklsjdklftoatl: ', total)
    return total
  }
  const onAddressChange = useCallback((address) => {
    console.log('address: ', address)
    onChange({ target: { name: 'address', value: address.value } })
  }, [])
  const onChange = useCallback((event) => {
    console.log('bame:ASDfL ', event)
    // console.log('bame:ASDfL ', value)
    setFormState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))

    console.log('form astatE:v: ', formState)
  }, [])
  const submitClam = async () => {
    try {
      //   setFormState((prev) => ({
      //     ...prev,
      //     totalScore: totalScore,
      //   }))
      console.log('form astatE:v: ', totalScore)
      const savedClam = await saveClam({
        ...formState,
        totalScore: totalScore,
      }).unwrap()
      console.log('wahts  savedClam ', savedClam)
      setClamSaved(true)
      // dispatch(setCredentials(user))
      // setToken(user.token)
      // navigate('/')
    } catch (err) {
      console.log('Errrodsf: ', err)
      //   toast({
      //     status: 'error',
      //     title: 'Error',
      //     description: 'Oh no, there was an error!',
      //     isClosable: true,
      //   })
    }
  }
  return (
    <>
      {!clamSaved && (
        <Box className="max-w-2xl flex flex-col m-auto items-center p-4 mb-12">
          <h1 className="text-4xl self-start mb-4">Enter A New Clam</h1>
          <Box className="w-full">
            <h1 className="text-2xl self-start mb-3 mt-6">Info</h1>
            <Box className="mb-6">
              <InputLabel className="mb-2" htmlFor="name">
                Restaurant Name
              </InputLabel>
              <TextField
                className="w-full"
                id="name"
                name="name"
                type="text"
                onChange={onChange}
              />
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
            <h1 className="text-2xl self-start mb-3 mt-12">Scoring</h1>
            <Box className="mb-6">
              <InputLabel className="mb-2">Consistency Score</InputLabel>
              <TextField
                className="w-40"
                id="consistencyScore"
                name="consistencyScore"
                type="number"
                onChange={onChange}
              />
            </Box>
            <Box className="mb-6">
              <InputLabel className="mb-2">Volume Score</InputLabel>
              <TextField
                className="w-40"
                id="volumeScore"
                name="volumeScore"
                type="number"
                onChange={onChange}
              />
            </Box>
            <Box className="mb-6">
              <InputLabel className="mb-2">Taste Score</InputLabel>
              <TextField
                className="w-40"
                id="tasteScore"
                name="tasteScore"
                type="number"
                onChange={onChange}
              />
            </Box>
            <Box className="mb-6">
              <InputLabel className="mb-2">Price Score</InputLabel>
              <TextField
                className="w-40"
                id="priceScore"
                name="priceScore"
                type="number"
                onChange={onChange}
              />
            </Box>
            <Box className="mb-6">
              <span className="font-bold">
                Total Score: {totalScore.toFixed(1)}
              </span>
            </Box>
            <h1 className="text-2xl self-start mb-3 mt-12">
              Additional Details
            </h1>
            <Box className="mb-6">
              <InputLabel className="mb-2">Price</InputLabel>
              <TextField
                className="w-40"
                id="price"
                name="price"
                type="number"
                onChange={onChange}
              />
            </Box>
            {/* <InputLabel className="mb-2">Cuisine</InputLabel>
        <TextField className="w-full"
          id="cuisine"
          name="cuisine"
          type="text"
          onChange={onChange}
        /> */}
            {/* <InputLabel className="mb-2">Award Winning</InputLabel>
        <TextField className="w-full"
          id="awardWinning"
          name="awardWinning"
          type="number"
          onChange={onChange}
        /> */}
            <Box className="mb-6">
              <InputLabel className="mb-2">Notes</InputLabel>
              <TextField
                className="w-full"
                id="notes"
                name="notes"
                type="text"
                onChange={onChange}
              />
            </Box>
            {/* <InputLabel className="mb-2">Style</InputLabel>
        <TextField className="w-full" id="style" name="style" type="text" onChange={onChange} /> */}
            {/* <input id="address" placeholder="Enter Address" type="text" /> */}
            {/* <Button onClick={submitLogin}>Login</Button> */}
            <Button
              className="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={submitClam}
            >
              Save Clam
            </Button>
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
              href="/clams"
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
