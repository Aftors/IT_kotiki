import { Avatar, Badge, Tooltip, Typography } from 'antd'
import * as palette from '../../../../constants/color'
import styled from 'styled-components'

const { Paragraph } = Typography

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

export const Reaction = ({
  value,
  info,
  userId,
  handleReactionDelete,
  handleReactionSelect,
}) => {
  const userReactionInfo = info.find(item => item.id_user === userId.toString())

  const handleReactionClick = () => {
    if (userReactionInfo) {
      handleReactionDelete(userReactionInfo.id)
    } else {
      handleReactionSelect(value)
    }
  }

  return (
    <Badge count={info.length} key={value}>
      <Tooltip title={<UsersList info={info} />}>
        <CommentAvatar
          size="small"
          onClick={handleReactionClick}
          $isSelected={!!userReactionInfo}>
          {value}
        </CommentAvatar>
      </Tooltip>
    </Badge>
  )
}
