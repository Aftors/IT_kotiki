import { createSlice } from '@reduxjs/toolkit'
import { isError, isFulfilled, isPending } from '../utils/utils'

type TLoaderState = {
  isLoading: boolean
}

const initialState = {
  isLoading: false,
}

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  selectors: {
    loaderSelector: state => state.isLoading,
  },
  reducers: () => ({}),
  extraReducers: builder => {
    builder
      .addMatcher(isPending, (state: TLoaderState) => {
        state.isLoading = true
      })
      .addMatcher(isError, (state: TLoaderState) => {
        state.isLoading = false
      })
      .addMatcher(isFulfilled, (state: TLoaderState) => {
        state.isLoading = false
      })
  },
})

export const { loaderSelector } = loaderSlice.selectors
