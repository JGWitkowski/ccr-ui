import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { combineReducers } from 'redux'

// import authReducer from './features/Login/userSlice'
import mapReducer from './features/Map/mapSlice'
import authReducer from './features/Auth/authSlice'
import userReducer from './features/Login/userSlice'
import { docsApi } from './services/docs'

// Setup redux-first-history
export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development' ? true : false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([docsApi.middleware]),
  reducer: combineReducers({
    auth: authReducer,
    user: userReducer,
    map: mapReducer,
    [docsApi.reducerPath]: docsApi.reducer,
  }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
