import { useForm } from 'react-hook-form'
import ErrorMessage from '../../compoments/ErrorMessage'
import {
  Alert,
  Box,
  Button,
  InputLabel,
  Snackbar,
  TextField,
} from '@mui/material'
import { useSignUpMutation } from '../../services/docs'
import { useState } from 'react'
import { setToken } from '../../utils/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateAccount = (props) => {
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)
  console.log('cmon token: ', token)
  const [accountSaved, setAccountSaved] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm()
  const dispatch = useDispatch()
  const [signUp, { isLoading }] = useSignUpMutation()
  const [open, setOpen] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState('')
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const submitAccount = handleSubmit(async (data) => {
    console.log('datafafdsd: ', data)
    try {
      const savedAccount = await signUp({
        ...data,
        // ...longlatResults.currentData,
        // totalScore: data.overallScore ? data.overallScore : totalScore,
      }).unwrap()
      console.log('got saveed account: ', savedAccount)
      //   setClamSaved(true)
      setAccountSaved(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
      dispatch(setCredentials(savedAccount))
      localStorage.setItem('refreshToken', savedAccount.refreshToken)
      // setToken(savedAccount.token)
    } catch (err) {
      console.log('err', err)
      setSnackBarMessage(err.data.message)
      setOpen(true)
      setAlertSeverity('error')
      console.log('Errrodsf: ', err)
    }
  })
  return (
    <>
      {!accountSaved && (
        <Box className="max-w-2xl flex flex-col m-auto items-center p-4 mb-12">
          <Box className="w-full">
            <h1 className="text-2xl self-start mb-3 mt-6 font-bold">
              Create your account
            </h1>
            <Box className="mb-6">
              <InputLabel className="mb-2" htmlFor="username">
                Username
              </InputLabel>
              <TextField
                className="w-full"
                id="username"
                type="username"
                {...register('username', {
                  required: {
                    value: true,
                    message: 'Username is required',
                  },
                })}
              />
              <ErrorMessage text={errors.username?.message} />
            </Box>
            <Box className="mb-6">
              <InputLabel className="mb-2" htmlFor="email">
                Email
              </InputLabel>
              <TextField
                className="w-full"
                id="email"
                type="email"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format',
                  },
                })}
              />
              <ErrorMessage text={errors.email?.message} />
            </Box>
            <Box className="mb-6">
              <InputLabel className="mb-2" htmlFor="password">
                Password
              </InputLabel>
              <TextField
                className="w-full"
                id="password"
                type="password"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                })}
              />
              <ErrorMessage text={errors.password?.message} />
            </Box>
            <button
              className="block text-blue-700 bg-white border hover:bg-gray-50 hover:text-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center mb-6"
              onClick={submitAccount}
            >
              Create account
            </button>
          </Box>
        </Box>
      )}
      {accountSaved && (
        <Box className="max-w-2xl flex flex-col m-auto items-center p-4">
          <Box className="w-full">
            <h1 className="text-2xl self-start mb-9 mt-6">
              Thank you for joining! You are being redirected to sign in...
            </h1>
            <br />
          </Box>
        </Box>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        // action={action}
      >
        <Alert severity={alertSeverity}>{snackBarMessage}</Alert>
      </Snackbar>
    </>
  )
}
export default CreateAccount
