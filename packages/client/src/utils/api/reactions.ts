import { reactionsUrl } from './consts'
import axios from 'axios'

type TAddReactionBody = {
  id_user: number
  login_user: string
  value: string
  id_comment?: string
  id_reply?: string
}

export const addReaction = (body: TAddReactionBody) => {
  return axios
    .post(reactionsUrl, body, {
      withCredentials: true,
    })
    .then(res => res.data)
    .catch(err => {
      return Promise.reject(err.response.data.reason)
    })
}

export const getAllReactions = (id: string) => {
  return axios
    .post(`${reactionsUrl}`, null, {
      params: { id },
      withCredentials: true,
    })
    .then(res => res.data)
    .catch(err => {
      return Promise.reject(err.response.data.reason)
    })
}

export const deleteReaction = (id: string) => {
  return axios
    .delete(`${reactionsUrl}/${id}`, {
      withCredentials: true,
    })
    .then(res => res.data)
    .catch(err => {
      return Promise.reject(err.response.data.reason)
    })
}
