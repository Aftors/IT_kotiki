import { Router } from 'express'
import { TopicControllers } from '../controllers'

const topicRouter = Router()
const {
  addTopic,
  getAllTopics,
  getTopicById,
  updateTopicById,
  deleteTopicById,
} = TopicControllers

topicRouter.post('/', addTopic)
topicRouter.get('/', getAllTopics)
topicRouter.get('/:id', getTopicById)
topicRouter.put('/:id', updateTopicById)
topicRouter.delete('/:id', deleteTopicById)

export { topicRouter }
