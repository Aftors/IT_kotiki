import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ENOTIFICATION_TYPE } from '../../models/models'
import { isError } from '../utils/utils'
import { changePassword, changeUserInfo } from './userSlice/user.thunk'

interface INotificationData {
  type: ENOTIFICATION_TYPE | null
  text: string
}

interface INotificationState {
  isOpen: boolean
  data: INotificationData
}

const initialState = {
  isOpen: false,
  data: {
    type: null,
    text: '',
  },
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  selectors: {
    notificationSelector: state => state,
  },
  reducers: (create): any => ({
    setNotificationInfo: create.reducer(
      (
        state: INotificationState,
        { payload }: PayloadAction<INotificationData>
      ) => {
        state.data = payload
        state.isOpen = true
      }
    ),
    clearNotificationInfo: create.reducer((state: INotificationState) => {
      state.data = initialState.data
      state.isOpen = false
    }),
  }),
  extraReducers: builder => {
    builder
      .addCase(changeUserInfo.fulfilled, (state: INotificationState) => {
        state.data.text = 'Данные обновлены'
        state.data.type = ENOTIFICATION_TYPE.SUCCESS
        state.isOpen = true
      })
      .addCase(changePassword.fulfilled, (state: INotificationState) => {
        state.data.text = 'Данные обновлены'
        state.data.type = ENOTIFICATION_TYPE.SUCCESS
        state.isOpen = true
      })
      .addMatcher(
        isError,
        (state: INotificationState, action: PayloadAction<string>) => {
          state.data.text = action.payload
          state.data.type = ENOTIFICATION_TYPE.ERROR
          state.isOpen = true
        }
      )
  },
})

export const { setNotificationInfo, clearNotificationInfo } =
  notificationSlice.actions
export const { notificationSelector } = notificationSlice.selectors
