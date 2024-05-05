import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize'

interface ITopic {
  id: string
  id_user: string
  title: string
  description: string
}

export const topicModel: ModelAttributes<Model, ITopic> = {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  id_user: {
    type: DataType.STRING,
    allowNull: false,
  },
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
  description: {
    type: DataType.STRING,
    allowNull: false,
  },
}
