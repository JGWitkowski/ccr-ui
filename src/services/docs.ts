import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import ky from 'ky'

import type { DocsList } from './types'
import { getToken } from '../utils/auth'
import { build } from 'vite'

// Define a service using a base URL and expected endpoints
export const docsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://137.184.18.94/api',
    credentials: 'same-origin',
    fetchFn: async (...args) => ky(...args),
  }),
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
    saveClam: builder.mutation<any, any>({
      query: (body) => ({
        url: '/save-clam',
        method: 'POST',
        body,
        prepareHeaders: (headers) => {
          headers.set('Accept', 'application/json')
          headers.set('Content-Type', 'application/json')
          headers.set('Authorization', getToken())
          return headers
        },
      }),
    }),
    getClamsList: builder.query<DocsList, void>({
      query: () => `/clams-list`,
    }),
    getRestaurantLongLat: builder.query<any, any>({
      query: (place_id) => `/get-long-lat?placeid=${place_id}`,
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
} = docsApi
