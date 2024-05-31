import { FC } from 'react'
import { Card, Flex, Tooltip, Typography, Popover, Badge, Avatar } from 'antd'
import { SmileOutlined, CommentOutlined } from '@ant-design/icons'
import Picker from '@emoji-mart/react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../../../store/slices/theme.slice'

const { Text } = Typography

interface IProps {
  author: string
  content: string
  time: string
  id: string
  reactions: Record<string, Record<string, string | null>[]>
  onReactionSelect: (value: string, id: string) => void
  onReactionDelete: (
    value: string,
    info: Record<string, string | null>[]
  ) => void
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

const CommentAvatar = styled(Avatar)`
  & {
    background-color: transparent;
    border: 1px solid #d3f5ff;
    cursor: pointer;
  }
`

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

  const ExtraBlock = () => (
    <Flex gap={16}>
      <Tooltip title="Добавить реакцию">
        <Popover
          trigger="click"
          placement="topLeft"
          content={
            <Picker
              onEmojiSelect={handleEmojiSelect}
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

  const handleEmojiSelect = e => {
    onReactionSelect(e.native, id)
  }

  return (
    <CommentCard type="inner" title={content} extra={<ExtraBlock />}>
      <CommentInfoBlock gap={8}>
        <CommentInfoText>{author}</CommentInfoText>
        <CommentInfoText>
          {time.split('T')[0].split('-').reverse().join('.')}
        </CommentInfoText>
      </CommentInfoBlock>
      <Flex gap={8}>
        {Object.entries(reactions)?.map(([value, info]) => (
          <Badge count={info.length} size="small" key={value}>
            <CommentAvatar
              size="small"
              onClick={() => onReactionDelete(value, info)}>
              {value}
            </CommentAvatar>
          </Badge>
        ))}
      </Flex>
    </CommentCard>
  )
}
export default CommentTopic
