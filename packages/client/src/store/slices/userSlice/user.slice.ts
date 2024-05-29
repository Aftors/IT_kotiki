import { createSlice } from '@reduxjs/toolkit'
import { IUserInfo } from '../../../components/Form/models/models'
import { changeUserAvatar, changeUserInfo, getUser } from './user.thunk'

export interface IUserDTO extends IUserInfo {
  id: number
  display_name: string
  avatar: string
}

type TUserState = {
  data: IUserDTO
  loadingAvatar: boolean
}

const initialState: TUserState = {
  data: {
    id: 0,
    login: '',
    first_name: '',
    second_name: '',
    display_name: '',
    avatar: '',
    phone: '',
    email: '',
  },
  loadingAvatar: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    userSelector: state => state.data,
    loadingAvatarSelector: state => state.loadingAvatar,
  },
  reducers: create => ({
    clearUserData: create.reducer((state: TUserState) => {
      state.data = initialState.data
    }),
  }),
  extraReducers: builder => {
    builder
      .addCase(getUser.fulfilled, (state: TUserState, action) => {
        state.data = action.payload
      })
      .addCase(changeUserAvatar.fulfilled, (state: TUserState, action) => {
        state.loadingAvatar = false
        state.data.avatar = action.payload.avatar
      })
      .addCase(changeUserAvatar.pending, (state: TUserState) => {
        state.loadingAvatar = true
      })
      .addCase(changeUserAvatar.rejected, (state: TUserState) => {
        state.loadingAvatar = false
      })
      .addCase(changeUserInfo.fulfilled, (state: TUserState, action) => {
        state.data = action.payload
      })
  },
})

export const { clearUserData } = userSlice.actions
export const { userSelector, loadingAvatarSelector } = userSlice.selectors
