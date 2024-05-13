import express, { Router } from 'express'
import { guardMiddleware } from '../middlewares/guardMiddleware'
import { topicRouter } from './topic'
import { commentRouter } from './comment'
import { replyRouter } from './reply'

const router = Router()

router.use([express.json()])
router.use(guardMiddleware)

router.use('/topics', topicRouter)
router.use('/comments', commentRouter)
router.use('/replies', replyRouter)

export default router
