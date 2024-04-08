import { Flex, Typography } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { SIGN_PAGE_CONFIG } from './сonstants/SignPageConfig'
import { TSignPageType } from './models/models'
import { Form } from '../../components/Form/Form'
import { useLocation, useNavigate } from 'react-router'
import { ENOTIFICATION_TYPE, EPATH } from '../../models/models'
import { auth } from '../../utils/api/auth'
import { AUTH_ENDPOINT } from '../../utils/api/consts'
import {
  ISigninFormBody,
  ISignupFormBody,
} from '../../components/Form/models/models'
import { setNotificationInfo } from '../../store/slices/notification.slice'
import { useAppDispatch } from '../../store/store'
import styled from 'styled-components'

interface IProps {
  type: TSignPageType
}

const SignPageContainer = styled(Flex)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80vh;

  .form-wrapper {
    width: 330px;
    margin-top: 34px;
  }

  a {
    text-decoration: none;
  }
`

export const SignPage: FC<IProps> = ({ type }) => {
  const CONFIG = SIGN_PAGE_CONFIG[type]
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const fromPage = location.state?.from.pathname || EPATH.MAIN

  const handleAuth = (body: ISigninFormBody | ISignupFormBody) => {
    return auth(AUTH_ENDPOINT[type], body)
      .then(() => {
        localStorage.setItem('auth', 'true')
      })
      .then(() => {
        navigate(fromPage, { replace: true })
      })
      .catch(errorReason => {
        localStorage.setItem('auth', 'false')
        dispatch(
          setNotificationInfo({
            text: errorReason,
            type: ENOTIFICATION_TYPE.ERROR,
          })
        )
      })
  }

  return (
    <SignPageContainer>
      <Typography.Title level={1}>{CONFIG.title}</Typography.Title>
      <div className="form-wrapper">
        <Form type={type} onSubmit={handleAuth} />
      </div>
      <Link to={CONFIG.linkTo}>{CONFIG.textLink}</Link>
    </SignPageContainer>
  )
}
