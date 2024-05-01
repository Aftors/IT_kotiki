import { EPAGE_TYPE } from '../../models/models'

export const apiUrl = 'https://ya-praktikum.tech/api/v2'
export const redirectUrl = 'http://localhost:3000'

export const authUrl = `${apiUrl}/auth`
export const userUrl = `${apiUrl}/user`
export const imgUrl = `${apiUrl}/resources`
export const oauthUrl = `${apiUrl}/oauth/yandex`

export const AUTH_ENDPOINT = {
  [EPAGE_TYPE.SIGNIN]: 'signin',
  [EPAGE_TYPE.SIGNUP]: 'signup',
}
