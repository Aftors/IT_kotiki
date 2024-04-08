import React, { FC } from 'react'
import { useAppDispatch } from '../../../store/store'
import {
  EFORM_TYPE,
  IPasswordFormBody,
} from '../../../components/Form/models/models'
import { Form } from '../../../components/Form/Form'
import styled from 'styled-components'
import { Flex } from 'antd'
import { changePassword } from '../../../store/slices/userSlice/user.thunk'

const DataContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
`

export const ProfilePasswordForm: FC = () => {
  const dispatch = useAppDispatch()

  const changeData = (body: IPasswordFormBody) => {
    dispatch(changePassword(body))
  }

  return (
    <DataContainer>
      <Form type={EFORM_TYPE.PROFILE_PASSWORD} onSubmit={changeData} />
    </DataContainer>
  )
}
