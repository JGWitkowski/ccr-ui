import { createSlice } from '@reduxjs/toolkit'
console.log('auth reset')
const initialState = {
  token: '',
  refreshToken: '',
  counter: 12,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload: { token, refreshToken } }) => {
      state.token = token
      state.refreshToken = refreshToken
      console.log('slice', token)
      console.log('slice: ', refreshToken)
    },
    increment: (state, action) => {
      state.counter = action.payload
    },
  },
})

export const { setToken, increment } = authSlice.actions

export default authSlice.reducer
