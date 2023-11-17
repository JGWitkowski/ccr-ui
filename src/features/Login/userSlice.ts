import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  user: string
  token: string
}

const initialState: UserState = {
  user: '',
  token: '',
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
    setCredentials: (state, { payload: { user, token } }) => {
      state.user = user
      state.token = token
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCredentials } = userSlice.actions
export const selectCurrentUser = (state) => state.auth.user
export default userSlice.reducer
