import { Router } from 'express'
import { ReactionControllers } from '../controllers'

const reactionRouter = Router()
const { addReaction, getAllReactions, deleteReactionById } = ReactionControllers

reactionRouter.post('/', addReaction)
reactionRouter.get('/', getAllReactions)
reactionRouter.delete('/:id', deleteReactionById)

export { reactionRouter }
