import { Reply } from '../db'
import type { Request, Response } from 'express'

export const addReply = async (req: Request, res: Response) => {
  try {
    const reply = await Reply.create(req.body)
    res.status(200).json(reply)
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}

export const getAllReplies = async (req: Request, res: Response) => {
  try {
    const replies = await Reply.findAll({
      where: { id_comment: req.query.id_comment },
    })
    res.status(200).json(replies)
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}

export const getReplyById = async (req: Request, res: Response) => {
  try {
    const reply = await Reply.findOne({ where: { id: req.params.id } })
    res.status(200).json(reply)
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}

export const updateReplyById = async (req: Request, res: Response) => {
  try {
    const reply = await Reply.findOne({ where: { id: req.params.id } })
    if (reply) {
      const { content } = req.body
      await Reply.update({ content }, { where: { id: reply.id } })
      res.status(200).json({ message: 'OK' })
    } else {
      res.status(400).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}

export const deleteReplyById = async (req: Request, res: Response) => {
  try {
    const reply = await Reply.findOne({ where: { id: req.params.id } })
    if (reply) {
      await Reply.destroy({ where: { id: reply.id } })
      res.status(200).json({ message: 'OK' })
    } else {
      res.status(400).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}
