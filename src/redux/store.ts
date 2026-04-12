// store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './services/userApiSlice'
import { designApi } from './services/designApiSlice'
import { chatApi } from './services/chatApiSlice'
export const store = configureStore({
  reducer: {

    [authApi.reducerPath]: authApi.reducer,
    [designApi.reducerPath]: designApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(designApi.middleware)
      .concat(chatApi.middleware),
})