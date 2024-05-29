import { Router } from 'express'
import { CommentControllers } from '../controllers'

const commentRouter = Router()
const {
  addComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
} = CommentControllers

commentRouter.post('/', addComment)
commentRouter.get('/', getAllComments)
commentRouter.get('/:id', getCommentById)
commentRouter.put('/:id', updateCommentById)
commentRouter.delete('/:id', deleteCommentById)

export { commentRouter }
