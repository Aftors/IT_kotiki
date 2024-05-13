import { oauthUrl, BASE_URL } from './consts'
import axios from 'axios'

interface IOAuthBody {
  code: string
  redirect_uri: string
}

export const getServiceId = () => {
  return axios
    .get(`${oauthUrl}/service-id?redirect_uri=${BASE_URL}`)
    .then(res => res.data)
    .catch(err => {
      return Promise.reject(err.response.data.reason)
    })
}

export const oauth = (body: IOAuthBody) => {
  return axios
    .post(oauthUrl, body, {
      withCredentials: true,
    })
    .then(res => res.data)
    .catch(err => {
      if (err.response.data.reason === 'User already in system')
        return Promise.resolve()
      return Promise.reject(err.response.data.reason)
    })
}
