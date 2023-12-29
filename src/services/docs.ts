import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import ky from 'ky'

import type { DocsList } from './types'
import { getToken } from '../utils/auth'
import { build } from 'vite'
import { Clam, ClamRequest, LatLong } from '../utils/types'

// Define a service using a base URL and expected endpoints
export const docsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://137.184.18.94/api',
    credentials: 'same-origin',
    // fetchFn: async (...args) => ky(...args),
  }),
  tagTypes: ['Clam'],
  endpoints: (builder) => ({
    getDocsList: builder.query<DocsList, void>({
      query: () => `/docs_list`,
    }),
    login: builder.mutation<any, any>({
      query: (body) => ({
        url: '/auth/signin',
        method: 'POST',
        body,
      }),
    }),
    saveClam: builder.mutation<any, ClamRequest>({
      query: (body) => ({
        url: '/save-clam',
        method: 'POST',
        body: body.payload,
        headers: {
          Authorization: `${body.token}`,
        },
      }),
      invalidatesTags: ['Clam'],
    }),
    getClamsList: builder.query<DocsList, void>({
      query: () => `/clams-list`,
      providesTags: ['Clam'],
    }),
    getRestaurantLongLat: builder.query<LatLong, any>({
      query: (place_id) => `/get-long-lat?placeid=${place_id}`,
    }),
    signUp: builder.mutation<any, any>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
      transformResponse: (response) => {
        console.log('transfor resfnlkjdf')
        if (response) {
          return response
        } else {
          // If there's an error, throw an object with the error details
          throw { test: response }
        }
      },
    }),
    forgotPassword: builder.mutation<any, any>({
      query: (body) => ({
        url: '/forgot-password',
        method: 'POST',
        body,
      }),
      transformResponse: (response) => {
        console.log('transfor resfnlkjdf')
        if (response) {
          return response
        } else {
          // If there's an error, throw an object with the error details
          throw { test: response }
        }
      },
    }),
    setNewPassword: builder.mutation<any, any>({
      query: (body) => ({
        url: '/reset',
        method: 'POST',
        body,
      }),
      transformResponse: (response) => {
        console.log('transfor resfnlkjdf')
        if (response) {
          return response
        } else {
          // If there's an error, throw an object with the error details
          throw { test: response }
        }
      },
    }),
    confirmCode: builder.mutation<any, any>({
      query: (body) => ({
        url: '/confirm-code',
        method: 'POST',
        body,
      }),
      transformResponse: (response) => {
        console.log('transfor resfnlkjdf')
        if (response) {
          return response
        } else {
          // If there's an error, throw an object with the error details
          throw { test: response }
        }
      },
    }),
    refreshTokenQuery: builder.mutation<any, any>({
      query: (body) => ({
        url: '/auth/refreshtoken',
        method: 'POST',
        body,
      }),
      transformResponse: (response) => {
        console.log('transfor resfnlkjdf')
        if (response) {
          return response
        } else {
          // If there's an error, throw an object with the error details
          throw { test: response }
        }
      },
    }),
    findUser: builder.mutation<any, any>({
      query: (body) => ({
        url: '/find-user',
        method: 'POST',
        body,
      }),
      transformResponse: (response) => {
        console.log('transfor resfnlkjdf')
        if (response) {
          return response
        } else {
          // If there's an error, throw an object with the error details
          throw { test: response }
        }
      },
    }),
  }),
  reducerPath: 'docsApi',
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLazyGetRestaurantLongLatQuery,
  useLoginMutation,
  useSaveClamMutation,
  useGetClamsListQuery,
  useGetRestaurantLongLatQuery,
  useSignUpMutation,
  useForgotPasswordMutation,
  useSetNewPasswordMutation,
  useConfirmCodeMutation,
  useFindUserMutation,
  useRefreshTokenQueryMutation,
} = docsApi
