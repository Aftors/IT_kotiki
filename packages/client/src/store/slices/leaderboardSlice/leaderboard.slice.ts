import { createSelector, createSlice } from '@reduxjs/toolkit'
import { getLeaderboard } from './leaderboard.thunk'
import { TSetUserScoreData } from '../../../utils/api/leaderboard'

export type TLeaderboardDTO = {
  data: TSetUserScoreData
}

type TLeaderboardState = {
  data: TLeaderboardDTO[]
  isLoading: boolean
  error: string
}

const initialState: TLeaderboardState = {
  data: [],
  isLoading: false,
  error: '',
}

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  selectors: {
    leaderboardSelector: createSelector(
      state => state.data,
      data => {
        const leaderboardItems = data.map((item: TLeaderboardDTO) => {
          const { id, display_name, login, avatar, scoreMaxIK } = item.data
          return {
            id,
            avatarPath: avatar,
            playerName: display_name || login,
            scoreMax: scoreMaxIK,
          }
        })
        return leaderboardItems
      }
    ),
  },
  reducers: create => ({
    clearLeaderboardData: create.reducer((state: TLeaderboardState) => {
      state.data = initialState.data
    }),
  }),
  extraReducers: builder => {
    builder.addCase(
      getLeaderboard.fulfilled,
      (state: TLeaderboardState, { payload }) => {
        state.data = payload
      }
    )
  },
})

export const { leaderboardSelector } = leaderboardSlice.selectors
