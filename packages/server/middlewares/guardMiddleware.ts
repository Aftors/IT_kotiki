import { buildCheckFunction } from 'express-validator'

const checkFn = buildCheckFunction(['body', 'query', 'params'])

export const guardMiddleware = checkFn('*').trim().escape()
