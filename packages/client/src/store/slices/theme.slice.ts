import { createSlice } from '@reduxjs/toolkit'

interface IThemeState {
  theme: boolean
}

const initialState = {
  theme: false,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  selectors: {
    themeSelector: state => state.theme,
  },
  reducers: create => ({
    changeTheme: create.reducer((state: IThemeState) => {
      state.theme = !state.theme
    }),
  }),
})

export const { themeSelector } = themeSlice.selectors
export const { changeTheme } = themeSlice.actions
