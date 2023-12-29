import { Alert, Box, InputLabel, Snackbar, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  useConfirmCodeMutation,
  useFindUserMutation,
  useForgotPasswordMutation,
  useSetNewPasswordMutation,
} from '../../services/docs'

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm()
  const [next, setNext] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [passwordReset, setPasswordReset] = useState(false)
  const [forgotPassword] = useForgotPasswordMutation()
  const [setNewPassword] = useSetNewPasswordMutation()
  const [confirmCode] = useConfirmCodeMutation()
  const [findUser] = useFindUserMutation()
  const [open, setOpen] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState('error')
  const navigate = useNavigate()
  const submitLogin = handleSubmit(async (formData) => {
    try {
      // const user = await login(formData).unwrap()
      // console.log('wahts  userL ', user)
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
  })
  const submitFindUser = async () => {
    try {
      const res = await findUser({ user: getValues('username') })
      console.log('res:L ', res)
      if (!res.error) {
        setOpen(false)
        setSnackBarMessage('')
        setNext(true)
      }
      if (res.error) {
        setAlertSeverity('error')
        setSnackBarMessage(res.error.data.message)
        setOpen(true)
      }
    } catch (err) {
      setAlertSeverity('error')
      setSnackBarMessage(err.data.message)
      setOpen(true)
    }
  }
  const submitConfirmCode = async (code) => {
    try {
      const res = await confirmCode({
        code: code,
        userName: getValues('username'),
      })
      if (!res.error) {
        setOpen(false)
        setSnackBarMessage('')
        setPasswordReset(true)
      }
      if (res.error) {
        setAlertSeverity('error')
        setSnackBarMessage(res.error.data.message)
        setOpen(true)
      }
    } catch (err) {
      setAlertSeverity('error')
      setSnackBarMessage(err.data.message)
      setOpen(true)
    }
  }
  const resetPassword = async (newPassword) => {
    try {
      const res = await setNewPassword({
        newPassword: newPassword,
        userName: getValues('username'),
      })
      navigate('/login?newpassword=true')
    } catch (err) {}
  }
  const sendConfirmation = async (to) => {
    try {
      const res = await forgotPassword({ to: to })
      console.log('fksdl;fk;sres: ', res)
      if (!res.error) {
        setOpen(false)
        setSnackBarMessage('')
        setCodeSent(true)
      }
      if (res.error) {
        setAlertSeverity('error')
        setSnackBarMessage(res.error.data.message)
        setOpen(true)
      }
    } catch (err) {
      setAlertSeverity('error')
      setSnackBarMessage(err.data.message)
      setOpen(true)
    }
  }
  return (
    <Box className="max-w-2xl flex flex-col m-auto p-4 mb-12 w-full">
      {!next && (
        <>
          <h1 className="text-2xl self-start mb-3 mt-6 font-bold">
            Find your clam account
          </h1>
          <p className="mb-8">
            Enter the email or username associated with your account to change
            your password.
          </p>
          <Box className="mb-6 w-full">
            <InputLabel className="mb-2" htmlFor="username">
              Email or Username
            </InputLabel>
            <TextField
              className="w-full"
              id="username"
              type="text"
              // onChange={onChange}
              {...register('username', {
                required: {
                  value: true,
                  message: 'Email or Username is required',
                },
              })}
            />
          </Box>
          {/* <TextField
          id="username"
          type="text"
          onChange={onChange}
          placeholder="Email"
        /> */}
          {/* <Box className="mb-6 w-full">
            <InputLabel className="mb-2" htmlFor="password">
              Password
            </InputLabel>
            <TextField
              className="w-full"
              id="password"
              type="password"
              // onChange={onChange}
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required',
                },
              })}
            />
          </Box> */}
          <button
            className="block text-white bg-blue-700 border hover:bg-gray-50 hover:text-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center mb-6"
            onClick={() => submitFindUser(true)}
          >
            Next
          </button>
        </>
      )}
      {next && !codeSent && (
        <>
          <h1 className="text-2xl self-start mb-3 mt-6 font-bold">
            Confirmation code
          </h1>
          <p className="mb-8">
            Before you can change your password, we need to make sure it’s
            really you. Your confirmation code will be sent to: <br />
            <strong className="mt-2 block">{getValues('username')}</strong>
          </p>
          <button
            className="block text-white bg-blue-700 border hover:bg-gray-50 hover:text-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center mb-6"
            onClick={() => sendConfirmation(getValues('username'))}
          >
            Send
          </button>
        </>
      )}
      {codeSent && !passwordReset && (
        <>
          <h1 className="text-2xl self-start mb-3 mt-6 font-bold">
            We sent you a code
          </h1>
          <p className="mb-8">
            Check your email to get your confirmation code. If you need to
            request a new code, go back and reselect a confirmation. <br />
            <strong className="mt-2 block">{getValues('username')}</strong>
          </p>
          <Box className="mb-6 w-full">
            <InputLabel className="mb-2" htmlFor="code">
              Enter your code
            </InputLabel>
            <TextField
              className="w-full"
              id="code"
              type="text"
              // onChange={onChange}
              {...register('code', {
                required: {
                  value: true,
                  message: 'Code is required',
                },
              })}
            />
            <button
              className="block text-white bg-blue-700 border hover:bg-gray-50 hover:text-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center mt-6"
              onClick={() => submitConfirmCode(getValues('code'))}
            >
              Next
            </button>
          </Box>
        </>
      )}
      {passwordReset && (
        <>
          <h1 className="text-2xl self-start mb-3 mt-6 font-bold">
            Please enter your new password.
          </h1>
          {/* <p className="mb-8">
            Check your email to get your confirmation code. If you need to
            request a new code, go back and reselect a confirmation. <br />
            <strong className="mt-2 block">{getValues('username')}</strong>
          </p> */}
          <Box className="mb-6 w-full">
            <InputLabel className="mb-2" htmlFor="code">
              New Password
            </InputLabel>
            <TextField
              className="w-full"
              id="newpassword"
              type="text"
              // onChange={onChange}
              {...register('newpassword', {
                required: {
                  value: true,
                  message: 'New Password is required',
                },
              })}
            />
            <button
              className="block text-white bg-blue-700 border hover:bg-gray-50 hover:text-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center mt-6"
              onClick={() => resetPassword(getValues('newpassword'))}
            >
              Reset Password
            </button>
          </Box>
        </>
      )}
      {/* <button
            className="block text-blue-700 bg-white border hover:bg-gray-50 hover:text-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center mb-6"
            onClick={submitLogin}
          >
            Forgot Password?
          </button> */}
      {/* <span>
            Not registered?{' '}
            <a
              className="ont-medium text-blue-600 dark:text-blue-500 hover:underline"
              href="/create-account"
            >
              Create account
            </a>
          </span> */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        // onClose={handleClose}
        // action={action}
      >
        <Alert severity={alertSeverity}>{snackBarMessage}</Alert>
      </Snackbar>
    </Box>
  )
  //   const dispatch = useDispatch()

  //   const [formState, setFormState] = useState({
  //     username: '',
  //     password: '',
  //   })
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //     setValue,
  //     watch,
  //     getValues,
  //   } = useForm()
  //   const navigate = useNavigate()
  //   const onChange = useCallback(({ target: { name, value } }) => {
  //     setFormState((prev) => ({ ...prev, [name]: value }))
  //   }, [])
  //   const [login, { isLoading }] = useLoginMutation()
  //   const submitLogin = handleSubmit(async (formData) => {
  //     try {
  //       const user = await login(formData).unwrap()
  //       console.log('wahts  userL ', user)
  //       dispatch(setCredentials(user))
  //       setToken(user.token)
  //       navigate('/')
  //     } catch (err) {
  //       console.log('Errrodsf: ', err)
  //       //   toast({
  //       //     status: 'error',
  //       //     title: 'Error',
  //       //     description: 'Oh no, there was an error!',
  //       //     isClosable: true,
  //       //   })
  //     }
  //   })
  // return (
  //   <Box className="max-w-2xl flex flex-col m-auto p-4 mb-12 w-full">
  //     <h1 className="text-2xl self-start mb-3 mt-6 font-bold">Sign in</h1>
  //     <Box className="mb-6 w-full">
  //       <InputLabel className="mb-2" htmlFor="username">
  //         Username
  //       </InputLabel>
  //       <TextField
  //         className="w-full"
  //         id="username"
  //         type="text"
  //         // onChange={onChange}
  //         {...register('username', {
  //           required: {
  //             value: true,
  //             message: 'Username is required',
  //           },
  //         })}
  //       />
  //     </Box>
  //     {/* <TextField
  //       id="username"
  //       type="text"
  //       onChange={onChange}
  //       placeholder="Email"
  //     /> */}
  //     <Box className="mb-6 w-full">
  //       <InputLabel className="mb-2" htmlFor="password">
  //         Password
  //       </InputLabel>
  //       <TextField
  //         className="w-full"
  //         id="password"
  //         type="password"
  //         // onChange={onChange}
  //         {...register('password', {
  //           required: {
  //             value: true,
  //             message: 'Password is required',
  //           },
  //         })}
  //       />
  //     </Box>
  //     <button
  //       className="block text-white bg-blue-700 border hover:bg-gray-50 hover:text-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center mb-6"
  //       onClick={submitLogin}
  //     >
  //       Submit
  //     </button>
  //     <button
  //       className="block text-blue-700 bg-white border hover:bg-gray-50 hover:text-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center mb-6"
  //       onClick={submitLogin}
  //     >
  //       Forgot Password?
  //     </button>
  //     <span>
  //       Not registered?{' '}
  //       <a
  //         className="ont-medium text-blue-600 dark:text-blue-500 hover:underline"
  //         href="/create-account"
  //       >
  //         Create account
  //       </a>
  //     </span>
  //   </Box>
  // )
}
export default ForgotPassword
