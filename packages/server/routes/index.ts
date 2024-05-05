import express, { Router } from 'express'
import { topicRouter } from './topic'
import { commentRouter } from './comment'

const router = Router()

router.use([express.json()])

router.use('/topics', topicRouter)
router.use('/comment', commentRouter)

export default router
