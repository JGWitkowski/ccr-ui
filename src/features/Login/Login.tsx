import { Box, Button, TextField } from '@mui/material'
import { useCallback, useState } from 'react'
import { useLoginMutation } from '../../services/docs'
import { useDispatch } from 'react-redux'
import { setCredentials } from './userSlice'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../../utils/auth'

const Login = () => {
  const dispatch = useDispatch()
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  })
  const navigate = useNavigate()
  const onChange = useCallback(({ target: { name, value } }) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
  }, [])
  const [login, { isLoading }] = useLoginMutation()
  const submitLogin = async () => {
    try {
      const user = await login(formState).unwrap()
      console.log('wahts  userL ', user)
      dispatch(setCredentials(user))
      setToken(user.token)
      navigate('/')
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
    <Box>
      <TextField id="username" type="text" onChange={onChange} />
      <TextField id="email" type="text" onChange={onChange} />
      <Button onClick={submitLogin}>Login</Button>
    </Box>
  )
}
export default Login
