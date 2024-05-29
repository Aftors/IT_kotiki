import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  TSetUserScoreData,
  getAllScore,
  setUserScore,
} from '../../../utils/api/leaderboard'
import { TLeaderboardDTO } from './leaderboard.slice'

export const getLeaderboard = createAsyncThunk<
  TLeaderboardDTO[],
  { cursor: number; limit: number },
  { rejectValue: string }
>(
  'leaderboard/getLeaderboard',
  async ({ cursor, limit }, { rejectWithValue }) => {
    try {
      const responseData = await getAllScore({
        ratingFieldName: 'scoreMaxIK',
        cursor,
        limit,
      })
      return responseData
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const setLeaderboard = createAsyncThunk<
  TLeaderboardDTO[],
  TSetUserScoreData,
  { rejectValue: string }
>('leaderboard/setLeaderboard', async (data, { rejectWithValue }) => {
  try {
    const responseData = await setUserScore(data)
    return responseData
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
