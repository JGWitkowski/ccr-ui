import { Alert, Box, InputLabel, Snackbar, TextField } from '@mui/material'
import { useState } from 'react'
import { useLoginMutation } from '../../services/docs'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../../compoments/ErrorMessage'
import { setToken } from '../Auth/authSlice'
import { setUser } from './userSlice'

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const isNewPassword = searchParams.get('newpassword')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState('')
  const [login, { isLoading }] = useLoginMutation()

  const submitLogin = handleSubmit(async (formData) => {
    try {
      const user = await login(formData).unwrap()
      dispatch(setToken({ token: user.token, refreshToken: user.refreshToken }))
      localStorage.setItem('refreshToken', user.refreshToken)
      localStorage.setItem('username', user.username)
      dispatch(setUser(user))
      navigate('/')
    } catch (err) {
      setAlertSeverity('error')
      setSnackBarMessage(err.data.message)
      setOpen(true)
    }
  })

  return (
    <Box className="max-w-2xl flex flex-col m-auto p-4 mb-12 w-full">
      <h1 className="text-2xl self-start mb-3 mt-6 font-bold">Sign in</h1>
      {isNewPassword && (
        <p className="mb-8">Please sign in using your new password.</p>
      )}
      <Box className="mb-6 w-full">
        <InputLabel className="mb-2" htmlFor="username">
          Username
        </InputLabel>
        <TextField
          className="w-full"
          id="username"
          type="text"
          {...register('username', {
            required: {
              value: true,
              message: 'Username is required',
            },
          })}
        />
        <ErrorMessage text={errors.username?.message} />
      </Box>
      <Box className="mb-6 w-full">
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
        className="block text-white bg-blue-700 border hover:bg-gray-50 hover:text-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center mb-6"
        onClick={submitLogin}
      >
        Submit
      </button>
      <a
        className="block text-blue-700 bg-white border hover:bg-gray-50 hover:text-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center mb-6"
        href="/forgot-password"
      >
        Forgot Password?
      </a>
      <span>
        Not registered?{' '}
        <a
          className="ont-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="/create-account"
        >
          Create account
        </a>
      </span>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity={alertSeverity}>{snackBarMessage}</Alert>
      </Snackbar>
    </Box>
  )
}
export default Login
