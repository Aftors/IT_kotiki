import { EPAGE_TYPE } from '../../models/models'

export const BASE_URL = 'http://localhost:3000'

export const YANDEX_API = `${BASE_URL}/api/v2`
export const FORUM_API = `${BASE_URL}/api/forum`

export const authUrl = `${YANDEX_API}/auth`
export const userUrl = `${YANDEX_API}/user`
export const imgUrl = `${YANDEX_API}/resources`
export const oauthUrl = `${YANDEX_API}/oauth/yandex`
export const leaderboardUrl = `${YANDEX_API}/leaderboard`

export const AUTH_ENDPOINT = {
  [EPAGE_TYPE.SIGNIN]: 'signin',
  [EPAGE_TYPE.SIGNUP]: 'signup',
}
