import { Topic } from '../db'
import type { Request, Response } from 'express'

export const getAllTopics = async (_req: Request, res: Response) => {
  try {
    const topics = await Topic.findAll()
    res.status(200).json(topics)
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}

export const getTopicById = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.findOne({ where: { id: req.params.id } })
    res.status(200).json(topic)
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}

export const addTopic = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.create(req.body)
    res.status(200).json(topic)
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}

export const updateTopicById = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.findOne({ where: { id: req.params.id } })
    if (topic) {
      const { title, description } = req.body
      await Topic.update({ title, description }, { where: { id: topic.id } })
      res.status(200).json({ message: 'OK' })
    } else {
      res.status(400).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}

export const deleteTopicById = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.findOne({ where: { id: req.params.id } })
    if (topic) {
      await Topic.destroy({ where: { id: topic.id } })
      res.status(200).json({ message: 'OK' })
    } else {
      res.status(400).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}
