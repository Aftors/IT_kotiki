import { FC, useEffect } from 'react'
import { Avatar, Flex, Layout, Switch } from 'antd'
import { EPATH } from '../../models/models'
import { Link } from 'react-router-dom'
import { StarOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '../../store/slices/userSlice/user.slice'
import { imgUrl } from '../../utils/api/consts'
import { useAppDispatch } from '../../store/store'
import { getUser } from '../../store/slices/userSlice/user.thunk'
import styled from 'styled-components'
import * as palette from '../../constants/color'
import { changeTheme } from '../../store/slices/theme.slice'

const HeaderLayout = styled(Layout.Header)`
  a {
    text-decoration: none;
  }
`
const ControlsSwitch = styled(Switch)`
  &.ant-switch.ant-switch-checked {
    background: ${palette.DEEP_PURPLE};
    &:hover {
      background: ${palette.DEEP_PURPLE};
    }
  }
`

export const Header: FC = () => {
  const { id, avatar } = useSelector(userSelector)
  const dispatch = useAppDispatch()
  const dispatchTheme = useDispatch()

  useEffect(() => {
    if (!id) dispatch(getUser())
  }, [])

  return (
    <HeaderLayout>
      <Flex justify="space-between">
        <Flex gap="middle" color="white">
          <Link to={EPATH.MAIN}>Играть</Link>
          <Link to={EPATH.FORUM}>Форум</Link>
          <Link to={EPATH.LEADER_BOARD}>
            <StarOutlined />
          </Link>
        </Flex>
        <Flex gap="middle" align="center">
          <span>Тема</span>
          <ControlsSwitch onChange={() => dispatchTheme(changeTheme())} />
          <Link to={EPATH.PROFILE}>
            <Avatar
              src={`${imgUrl}${avatar}`}
              size="default"
              icon={<UserOutlined />}
            />
          </Link>
        </Flex>
      </Flex>
    </HeaderLayout>
  )
}
