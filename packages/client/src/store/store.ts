import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { notificationSlice } from './slices/notification.slice'
import { userSlice } from './slices/userSlice/user.slice'
import { useDispatch } from 'react-redux'
import { loaderSlice } from './slices/loader.slice'
import { leaderboardSlice } from './slices/leaderboardSlice/leaderboard.slice'
import { themeSlice } from './slices/theme.slice'

export const reducer = combineReducers({
  [notificationSlice.name]: notificationSlice.reducer,
  [loaderSlice.name]: loaderSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [leaderboardSlice.name]: leaderboardSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
})

export const store = configureStore({
  reducer,
  devTools: true,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
})

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<any>()
