import express, { Router } from 'express'
import { topicRouter } from './topic'

const router = Router()

router.use([express.json()])

router.use('/topics', topicRouter)

export default router
