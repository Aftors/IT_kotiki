import dotenv from 'dotenv'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { topicModel, commentModel, replyModel, reactionModel } from './models'

dotenv.config()

const {
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT || ''),
  dialect: 'postgres',
}

const sequelize = new Sequelize(sequelizeOptions)

export const Topic = sequelize.define('Topic', topicModel)
export const Comment = sequelize.define('Comment', commentModel)
export const Reply = sequelize.define('Reply', replyModel)
export const Reaction = sequelize.define('Reaction', reactionModel)

Topic.hasMany(Comment, { foreignKey: 'id_topic' })
Comment.belongsTo(Topic, { foreignKey: 'id_topic', targetKey: 'id' })

Comment.hasMany(Reply, { foreignKey: 'id_comment' })
Reply.belongsTo(Comment, { foreignKey: 'id_comment', targetKey: 'id' })

Comment.hasMany(Reaction, { foreignKey: 'id_comment' })
Reaction.belongsTo(Comment, { foreignKey: 'id_comment', targetKey: 'id' })

Reply.hasMany(Reaction, { foreignKey: 'id_reply' })
Reaction.belongsTo(Reply, { foreignKey: 'id_reply', targetKey: 'id' })

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
