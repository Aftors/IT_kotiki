import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  IPasswordFormBody,
  IUserInfo,
} from '../../../components/Form/models/models'
import axios from 'axios'
import { authUrl, userUrl } from '../../../utils/api/consts'
import { RcFile } from 'antd/es/upload'
import { IUserDTO } from './user.slice'

export const getUser = createAsyncThunk<
  IUserDTO,
  void,
  { rejectValue: string }
>('user/getUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${authUrl}/user`, {
      withCredentials: true,
      'Content-Type': 'application/json',
    })
    return response.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
export const changeUserAvatar = createAsyncThunk<
  IUserDTO,
  RcFile | undefined,
  { rejectValue: string }
>('user/changeAvatar', async (file, { rejectWithValue }) => {
  const body = new FormData()
  body.append('avatar', file)
  try {
    const response = await axios.put(`${userUrl}/profile/avatar`, body, {
      withCredentials: true,
      'Content-Type': 'multipart/form-data',
    })
    return response.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
export const changeUserInfo = createAsyncThunk<
  IUserDTO,
  IUserInfo,
  { rejectValue: string }
>('user/changeUserInfo', async (profileFormBody, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${userUrl}/profile`, profileFormBody, {
      withCredentials: true,
      'Content-Type': 'application/json',
    })
    return response.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
export const changePassword = createAsyncThunk<
  void,
  IPasswordFormBody,
  { rejectValue: string }
>('user/changeUserPassword', async (passwordFormBody, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${userUrl}/password`, passwordFormBody, {
      withCredentials: true,
      'Content-Type': 'application/json',
    })
    return response.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
