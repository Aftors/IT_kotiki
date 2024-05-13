import { createSlice } from '@reduxjs/toolkit'

interface IThemeState {
  theme: boolean
}

const localTheme = () => {
  if (localStorage.getItem('theme') === undefined) {
    localStorage.setItem('theme', 'false')
    return false
  } else {
    return JSON.parse(localStorage.getItem('theme'))
  }
}

const initialState = {
  theme: localTheme(),
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
