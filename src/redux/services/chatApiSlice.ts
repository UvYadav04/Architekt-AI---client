// store/api/chatApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
  }),
  endpoints: (builder) => ({

    chat: builder.mutation({
      query: ({ user_id, design_id, query }) => ({
        url: `/chat`,
        method: 'POST',
        body: { user_id, design_id, query },
        credentials:'include'
      }),
    }),

  }),
})

export const { useChatMutation } = chatApi