import { leaderboardUrl } from './consts'
import axios from 'axios'

export type TSetUserScoreData = {
  id: number
  display_name: string
  login: string
  avatar: string
  scoreMaxIK: number
  scoreTotalIK: number
}

type TGetAllScoreBody = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export const setUserScore = (data: TSetUserScoreData) => {
  const body = {
    data,
    ratingFieldName: 'scoreMaxIK',
    teamName: 'itkotiki',
  }
  return axios
    .post(leaderboardUrl, body, {
      withCredentials: true,
    })
    .then(res => res.data)
    .catch(err => {
      return Promise.reject(err.response.data.reason)
    })
}

export const getAllScore = (body: TGetAllScoreBody) => {
  return axios
    .post(`${leaderboardUrl}/all`, body, {
      withCredentials: true,
    })
    .then(res => res.data)
    .catch(err => {
      return Promise.reject(err.response.data.reason)
    })
}
