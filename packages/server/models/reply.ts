import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize'

interface IReply {
  id: string
  id_comment: string
  id_user: string
  login_user: string
  content: string
}

export const replyModel: ModelAttributes<Model, IReply> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  id_comment: {
    type: DataType.STRING,
    allowNull: false,
  },
  id_user: {
    type: DataType.STRING,
    allowNull: false,
  },
  login_user: {
    type: DataType.STRING,
    allowNull: false,
  },
  content: {
    type: DataType.STRING,
    allowNull: false,
  },
}
