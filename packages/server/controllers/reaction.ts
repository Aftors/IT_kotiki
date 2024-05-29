import { Op } from 'sequelize'
import { Reaction } from '../db'
import type { Request, Response } from 'express'

export const addReaction = async (req: Request, res: Response) => {
  try {
    const reply = await Reaction.create(req.body)
    res.status(200).json(reply)
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}

export const getAllReactions = async (req: Request, res: Response) => {
  try {
    const reactions = await Reaction.findAll({
      where: {
        [Op.or]: [{ id_comment: req.query.id }, { id_reply: req.query.id }],
      },
    })
    res.status(200).json(reactions)
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}

export const deleteReactionById = async (req: Request, res: Response) => {
  try {
    const reply = await Reaction.findOne({ where: { id: req.params.id } })
    if (reply) {
      await Reaction.destroy({ where: { id: reply.id } })
      res.status(200).json({ message: 'OK' })
    } else {
      res.status(400).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Bad request' })
  }
}
