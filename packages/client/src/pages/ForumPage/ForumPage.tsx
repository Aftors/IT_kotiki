import { Flex, Typography } from 'antd'
import styled from 'styled-components'
import * as palette from '../../constants/color'
import { Outlet } from 'react-router'
import { FC } from 'react'

const { Title } = Typography

export const ForumPageContent = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 760px;
  margin: 0 auto;
`

export const ForumPageTitle = styled(Title)`
  && {
    color: ${palette.DEEP_PINK};
    margin: 44px auto 30px;
    font-weight: bold;
  }
`
export const ForumTopicsContainer = styled(ForumPageContent)`
  gap: 16px;
  height: fit-content;
  overflow-y: auto;
  margin: 0 0 36px;
`


export const ForumPage: FC = () => {
  return (
    <ForumPageContent>
      <Outlet />
    </ForumPageContent>
  )
}
