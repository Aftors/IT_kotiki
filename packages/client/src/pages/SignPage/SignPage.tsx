import { Button, Flex, Typography } from 'antd'
import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SIGN_PAGE_CONFIG } from './сonstants/SignPageConfig'
import { EPAGE_TYPE } from '../../models/models'
import { TSignPageType } from './models/models'
import { Form } from '../../components/Form/Form'
import { useLocation, useNavigate } from 'react-router'
import { ENOTIFICATION_TYPE, EPATH } from '../../models/models'
import { auth } from '../../utils/api/auth'
import { getServiceId, oauth } from '../../utils/api/oauth'
import { AUTH_ENDPOINT, BASE_URL } from '../../utils/api/consts'
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

const OAuthButton = styled(Button)`
  width: 100%;
  border: none;
  margin: 0 0 24px;
`

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

  const handleAuthCallback = (callback: () => Promise<unknown>) => {
    callback()
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

  useEffect(() => {
    const code = new URLSearchParams(location.state?.from?.search).get('code')
    if (code) handleAuthCallback(() => oauth({ code, redirect_uri: BASE_URL }))
  }, [])

  const handleAuth = (body: ISigninFormBody | ISignupFormBody) => {
    handleAuthCallback(() => auth(AUTH_ENDPOINT[type], body))
  }

  const handleOAuth = async () => {
    const { service_id } = await getServiceId()
    const url = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${BASE_URL}`
    window.location.replace(url)
  }

  return (
    <SignPageContainer>
      <Typography.Title level={1}>{CONFIG.title}</Typography.Title>
      <div className="form-wrapper">
        <Form type={type} onSubmit={handleAuth} />
        {type === EPAGE_TYPE.SIGNIN && (
          <OAuthButton onClick={handleOAuth}>Войти через Яндекс</OAuthButton>
        )}
      </div>
      <Link to={CONFIG.linkTo}>{CONFIG.textLink}</Link>
    </SignPageContainer>
  )
}
