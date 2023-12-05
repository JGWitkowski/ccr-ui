import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// export interface UserState {
//   user: string
//   token: string
// }

const initialState: any = {
  hoverId: null,
}

export const mapSlice = createSlice({
  name: 'map',
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
    setHoverId: (state, action) => {
      //   console.log('sdjflksdjf: ', action.payload)
      state.hoverId = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setHoverId } = mapSlice.actions
export const selectHoverId = (state) => state.map.hoverId
export default mapSlice.reducer
