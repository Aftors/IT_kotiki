import React, { FC } from 'react'
import { Form } from '../../../components/Form/Form'
import styled from 'styled-components'
import { Flex } from 'antd'
import { EFORM_TYPE, IUserInfo } from '../../../components/Form/models/models'
import { useSelector } from 'react-redux'
import { userSelector } from '../../../store/slices/userSlice/user.slice'
import { useAppDispatch } from '../../../store/store'
import { changeUserInfo } from '../../../store/slices/userSlice/user.thunk'

const DataContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
`

export const ProfileDataForm: FC = () => {
  const dispatch = useAppDispatch()
  const data = useSelector(userSelector)

  const changeData = (body: IUserInfo) => {
    dispatch(changeUserInfo(body))
  }
  return (
    <DataContainer>
      <Form
        type={EFORM_TYPE.PROFILE_INFO}
        onSubmit={changeData}
        initialData={data}
      />
    </DataContainer>
  )
}
