import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { designApi } from './designApiSlice'

// User information interface
export interface User {
  name: string
  email: string,
  designsCreated:number,
}

// Base API response interface
export interface BaseResponse {
  success: boolean
  message?: string
  error?: string
}

// Login API accepts credentials and responds with user info
export interface LoginRequest {
  name: string
  email: string
}


// Get user info returns BaseResponse + user data
export interface GetUserInfoResponse extends BaseResponse {
  userInfo: User
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/auth`,
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<BaseResponse, LoginRequest>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
        credentials: 'include',

      }),
      invalidatesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(designApi.util.invalidateTags(['Design']))
            },
    }),

    getUserInfo: builder.query<GetUserInfoResponse, void>({
      query: () => ({
        url: '/user-info',
        credentials:'include'
      }),
      providesTags: ['User'],
    }),

    logout: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
        credentials: 'include',

      }),
      invalidatesTags: ["User"],
       async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(designApi.util.invalidateTags(['Design']))
            },
    }),
  }),
})

export const {
  useLoginMutation,
  useGetUserInfoQuery,
  useLogoutMutation,
} = authApi