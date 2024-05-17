import { Typography } from 'antd'
import styled from 'styled-components'
import * as palette from '../../constants/color'
import { Card } from '../Card/Card'
import { IForumTopic } from './models/models'
import { Link } from 'react-router-dom'
import { FC } from 'react'

const { Text } = Typography

const ForumCard = styled(Card)`
  border: 1px solid ${palette.DEEP_PINK};
  border-radius: 24px;
`
const ForumText = styled(Text)`
  margin-right: auto;
`


const ForumTopic: FC<Omit<IForumTopic, 'id'>> = ({ topicTitle, description, id }) => (
  <ForumCard type='inner' title={topicTitle} extra={<Link to={id}>Читать</Link>}>
    <ForumText>{description}</ForumText>
  </ForumCard>
)

export default ForumTopic
