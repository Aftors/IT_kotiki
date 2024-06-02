import { EPAGE_TYPE } from '../../models/models'

const DEV_BASE_URL = 'http://localhost:3000'
const PROD_BASE_URL = 'https://it-kotiki-36-mf.ya-praktikum.tech'

export const BASE_URL = import.meta.env.DEV ? DEV_BASE_URL : PROD_BASE_URL

export const YANDEX_API = `${BASE_URL}/api/v2`
export const FORUM_API = `${BASE_URL}/api/forum`

// Yandex API
export const authUrl = `${YANDEX_API}/auth`
export const userUrl = `${YANDEX_API}/user`
export const imgUrl = `${YANDEX_API}/resources`
export const oauthUrl = `${YANDEX_API}/oauth/yandex`
export const leaderboardUrl = `${YANDEX_API}/leaderboard`

// Forum API
export const topicsUrl = `${FORUM_API}/topics`
export const commentsUrl = `${FORUM_API}/comments`
export const reactionsUrl = `${FORUM_API}/reactions`

export const AUTH_ENDPOINT = {
  [EPAGE_TYPE.SIGNIN]: 'signin',
  [EPAGE_TYPE.SIGNUP]: 'signup',
}
