import { configureStore } from '@reduxjs/toolkit'
import { notificationSlice } from './slices/notification.slice'
import { userSlice } from './slices/userSlice/user.slice'
import { useDispatch } from 'react-redux'
import { loaderSlice } from './slices/loader.slice'

export const store = configureStore({
  reducer: {
    [notificationSlice.name]: notificationSlice.reducer,
    [loaderSlice.name]: loaderSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  devTools: true,
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<any>()
