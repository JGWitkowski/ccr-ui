import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  username: string
  email: string
  roles: []
}

const initialState: UserState = {
  username: '',
  email: '',
  roles: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload: { username, email, roles } }) => {
      state.username = username
      state.email = email
      state.roles = roles
    },
  },
})
export const selectToken = (state) => state.user
// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions
export const selectCurrentUser = (state) => state.auth.user
export default userSlice.reducer
