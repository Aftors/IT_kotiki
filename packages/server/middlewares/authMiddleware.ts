import { Request, Response, NextFunction } from 'express'
import fetch from 'cross-fetch'

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const cookie = request.header('cookie')
  if (cookie) {
    try {
      const resp = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          cookie,
        },
      })
      if (resp?.status !== 200) {
        throw new Error(resp?.statusText)
      }
      next()
    } catch (error) {
      const { message } = error as Error
      response.status(403).send(message)
    }
  } else {
    response.status(403).send('Unauthorized')
  }
}
