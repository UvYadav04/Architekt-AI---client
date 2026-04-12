// store/api/designApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseResponse } from './userApiSlice'
import type { design } from '../../types'


interface designResponse extends BaseResponse{
  data:design
}

interface userDesignsResponse extends BaseResponse{
  data:design[]
}

export const designApi = createApi({
  reducerPath: 'designApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
    credentials: 'include',
  }),
  tagTypes: ['Design'],
  endpoints: (builder) => ({

    getDesignInfoById: builder.query<designResponse,string>({
      query: (design_id:string) =>({
        url: `/auth/design/${design_id}`,
         credentials:'include'
       }),
      providesTags: ['Design'],
      // skip the query if either user_id or design_id is missing
      // Usage: const { data, ... } = useGetDesignInfoByIdQuery({ user_id, design_id }, { skip: !user_id || !design_id });
    }),

    getUserDesigns: builder.query<userDesignsResponse,void>({
      query: () => ({ 
        url: `auth/designs`,
        credentials:'include'
}),
      providesTags: ['Design'],
    }),

    updateDesign: builder.mutation({
      query: ({ design_id, updates }) => ({
        url: `/design/${design_id}`,
        method: 'PUT',
        body: updates,
        credentials:'include'

      }),
      invalidatesTags: ['Design'],
    }),

  }),
})

export const {
  useGetDesignInfoByIdQuery,
  useGetUserDesignsQuery,
  useUpdateDesignMutation,
} = designApi