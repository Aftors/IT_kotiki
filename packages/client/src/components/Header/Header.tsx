import { FC, useEffect } from 'react'
import { Avatar, Flex, Layout } from 'antd'
import { EPATH } from '../../models/models'
import { Link } from 'react-router-dom'
import { StarOutlined, UserOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { userSelector } from '../../store/slices/userSlice/user.slice'
import { imgUrl } from '../../utils/api/consts'
import { useAppDispatch } from '../../store/store'
import { getUser } from '../../store/slices/userSlice/user.thunk'
import styled from 'styled-components'

const HeaderLayout = styled(Layout.Header)`
  a {
    text-decoration: none;
  }
`

export const Header: FC = () => {
  const { id, avatar } = useSelector(userSelector)
  const dispatch = useAppDispatch()

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
        <Link to={EPATH.PROFILE}>
          <Avatar
            src={`${imgUrl}${avatar}`}
            size="middle"
            icon={<UserOutlined />}
          />
        </Link>
      </Flex>
    </HeaderLayout>
  )
}
