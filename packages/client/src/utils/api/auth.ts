import { authUrl } from './consts'
import {
  ISigninFormBody,
  ISignupFormBody,
} from '../../components/Form/models/models'
import axios from 'axios'

export const auth = (type: string, body: ISigninFormBody | ISignupFormBody) => {
  return axios
    .post(`${authUrl}/${type}`, body, {
      withCredentials: true,
    })
    .then(res => res.data)
    .catch(err => {
      if (err.response.data.reason === 'User already in system')
        return Promise.resolve()
      return Promise.reject(err.response.data.reason)
    })
}

export const logout = () => {
  return axios
    .post(
      `${authUrl}/logout`,
      {},
      {
        withCredentials: true,
      }
    )
    .then(res => res.data)
    .catch(err => Promise.reject(err.response.data.reason))
}
