import { Comment, Reaction } from '../db'
import type { Request, Response } from 'express'
import { IComment } from '../models/comment'
import { IReaction } from '../models/reaction'

export const addComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.create(req.body)
    res.status(200).json(comment)
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = (await Comment.findAll({
      where: { id_topic: req.query.id_topic },
      raw: true,
    })) as unknown as IComment[]

    for (const comment of comments) {
      comment.reactions = (await Reaction.findAll({
        where: { id_comment: comment.id },
        raw: true,
      })) as unknown as IReaction[]
    }

    res.status(200).json(comments)
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findOne({ where: { id: req.params.id } })
    res.status(200).json(comment)
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}

export const updateCommentById = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findOne({ where: { id: req.params.id } })
    if (comment) {
      const { content } = req.body
      await Comment.update({ content }, { where: { id: comment.id } })
      res.status(200).json({ message: 'OK' })
    } else {
      res.status(400).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}

export const deleteCommentById = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findOne({ where: { id: req.params.id } })
    if (comment) {
      await Comment.destroy({ where: { id: comment.id } })
      res.status(200).json({ message: 'OK' })
    } else {
      res.status(400).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}
