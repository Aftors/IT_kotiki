import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize'

interface IComment {
  id: string
  id_topic: string
  id_user: string
  login_user: string
  content: string
}

export const commentModel: ModelAttributes<Model, IComment> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  id_topic: {
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
