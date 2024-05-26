import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize'

interface IReaction {
  id: string
  id_comment: string | null
  id_reply: string | null
  id_user: string
  login_user: string
  value: string
}

export const reactionModel: ModelAttributes<Model, IReaction> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  id_comment: {
    type: DataType.STRING,
    defaultValue: null,
  },
  id_reply: {
    type: DataType.STRING,
    defaultValue: null,
  },
  id_user: {
    type: DataType.STRING,
    allowNull: false,
  },
  login_user: {
    type: DataType.STRING,
    allowNull: false,
  },
  value: {
    type: DataType.STRING,
    allowNull: false,
  },
}
