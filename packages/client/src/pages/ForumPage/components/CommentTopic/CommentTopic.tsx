import { FC } from 'react'
import { Card, Flex, Tooltip, Typography, Popover } from 'antd'
import { SmileOutlined, CommentOutlined } from '@ant-design/icons'
import Picker from '@emoji-mart/react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../../../store/slices/theme.slice'
import { userSelector } from '../../../../store/slices/userSlice/user.slice'
import { Reaction } from '../Reaction/Reaction'

const { Text } = Typography

interface IProps {
  author: string
  content: string
  time: string
  id: string
  reactions: Record<string, Record<string, string | null>[]>
  onReactionSelect: (value: string, id: string) => void
  onReactionDelete: (id: string) => void
}

const CommentCard = styled(Card)`
  & {
    width: 100%;
    min-height: fit-content;

    .ant-card-head {
      min-height: fit-content;
      padding: 4px 24px;
    }

    .ant-card-body {
      padding: 4px 24px;
    }
  }
`

const CommentInfoBlock = styled(Flex)`
  & {
    margin: 0 0 8px;
  }
`

const CommentInfoText = styled(Text)`
  & {
    font-size: 14px;
  }
`

const ExtraBlock = ({ theme, handleReactionSelect }) => (
  <Flex gap={16}>
    <Tooltip title="Добавить реакцию">
      <Popover
        trigger="click"
        placement="topLeft"
        content={
          <Picker
            onEmojiSelect={e => handleReactionSelect(e.native)}
            locale="ru"
            theme={theme ? 'light' : 'dark'}
            navPosition="bottom"
            previewPosition="none"
          />
        }>
        <SmileOutlined />
      </Popover>
    </Tooltip>
    <Tooltip title="Добавить ответ">
      <CommentOutlined />
    </Tooltip>
  </Flex>
)

const CommentTopic: FC<IProps> = ({
  author,
  content,
  time,
  id,
  reactions,
  onReactionSelect,
  onReactionDelete,
}) => {
  const theme = useSelector(themeSelector)
  const { id: userId } = useSelector(userSelector)

  const handleReactionSelect = (value: string) => {
    onReactionSelect(value, id)
  }

  return (
    <CommentCard
      type="inner"
      title={content}
      extra={
        <ExtraBlock theme={theme} handleReactionSelect={handleReactionSelect} />
      }>
      <CommentInfoBlock gap={8}>
        <CommentInfoText>{author}</CommentInfoText>
        <CommentInfoText>
          {time.split('T')[0].split('-').reverse().join('.')}
        </CommentInfoText>
      </CommentInfoBlock>
      <Flex gap={12}>
        {Object.entries(reactions)?.map(([value, info]) => (
          <Reaction
            key={value}
            value={value}
            info={info}
            userId={userId}
            handleReactionDelete={onReactionDelete}
            handleReactionSelect={handleReactionSelect}
          />
        ))}
      </Flex>
    </CommentCard>
  )
}

export default CommentTopic
