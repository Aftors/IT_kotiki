import { FC } from 'react'
import { Card, Flex, Tooltip, Typography, Popover, Badge, Avatar } from 'antd'
import { SmileOutlined, CommentOutlined } from '@ant-design/icons'
import Picker from '@emoji-mart/react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../../../store/slices/theme.slice'
import { userSelector } from '../../../../store/slices/userSlice/user.slice'
import * as palette from '../../../../constants/color'

const { Text, Paragraph } = Typography

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

const CommentAvatar = styled(Avatar)<{ $isSelected?: boolean }>`
  & {
    background-color: transparent;
    border: 1px solid
      ${props => (props.$isSelected ? palette.DEEP_PINK : palette.LIGHT_OCEAN)};
    cursor: pointer;
  }
`

const UsersListWrapper = styled(Paragraph)`
  && {
    color: inherit;
    font-size: 14px;
    margin: 4px;
  }
`

const UsersList = ({ info }) => (
  <UsersListWrapper ellipsis={{ rows: 4, expandable: true }}>
    {info.map(item => (
      <div key={item.id}>{item.login_user}</div>
    ))}
  </UsersListWrapper>
)

const ExtraBlock = ({ theme, handleEmojiSelect }) => (
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

const Reaction = ({ value, info, userId, handleReactionDelete }) => {
  const userReactionInfo = info.find(item => item.id_user === userId.toString())

  return (
    <Badge count={info.length} key={value}>
      <Tooltip title={<UsersList info={info} />}>
        <CommentAvatar
          size="small"
          onClick={() => handleReactionDelete(userReactionInfo?.id)}
          $isSelected={!!userReactionInfo}>
          {value}
        </CommentAvatar>
      </Tooltip>
    </Badge>
  )
}

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

  const handleEmojiSelect = e => {
    onReactionSelect(e.native, id)
  }

  return (
    <CommentCard
      type="inner"
      title={content}
      extra={
        <ExtraBlock theme={theme} handleEmojiSelect={handleEmojiSelect} />
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
            value={value}
            info={info}
            userId={userId}
            handleReactionDelete={onReactionDelete}
          />
        ))}
      </Flex>
    </CommentCard>
  )
}

export default CommentTopic
