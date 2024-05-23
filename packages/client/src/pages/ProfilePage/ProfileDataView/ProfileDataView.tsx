import React, { FC } from 'react'
import { Flex, Typography } from 'antd'
import styled from 'styled-components'
import { LIGHT_GREY } from '../../../constants/color'
import { userSelector } from '../../../store/slices/userSlice/user.slice'
import { useSelector } from 'react-redux'

const UserDataContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
  margin-bottom: 24px;
`

const UserDataItem = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid ${LIGHT_GREY};
`

const Items = {
  first_name: 'Имя',
  second_name: 'Фамилия',
  login: 'Никнeйм',
  email: 'Почта',
  phone: 'Телефон',
}

export const ProfileDataView: FC = () => {
  const data = useSelector(userSelector)

  return (
    <UserDataContainer>
      {Object.keys(Items).map(key => (
        <UserDataItem key={key}>
          <Typography>{Items[key as keyof typeof Items]}</Typography>
          <Typography>{data[key as keyof typeof data]}</Typography>
        </UserDataItem>
      ))}
    </UserDataContainer>
  )
}
