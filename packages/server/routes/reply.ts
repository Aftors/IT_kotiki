import { Router } from 'express'
import { ReplyControllers } from '../controllers'

const replyRouter = Router()
const {
  addReply,
  getAllReplies,
  getReplyById,
  updateReplyById,
  deleteReplyById,
} = ReplyControllers

replyRouter.post('/', addReply)
replyRouter.get('/', getAllReplies)
replyRouter.get('/:id', getReplyById)
replyRouter.put('/:id', updateReplyById)
replyRouter.delete('/:id', deleteReplyById)

export { replyRouter }
