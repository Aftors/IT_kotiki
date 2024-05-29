import type { RootState } from './src/store/store'

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}
export {}
