import { FC, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Header } from '../Header/Header'
import { ConfigProvider, Layout as ALayout, Spin } from 'antd'
import { EPATH } from '../../models/models'
import { ANTD_CONFIG, ANTD_CONFIG_BLACK } from '../../constants/antd.config'
import { Notification } from '../Notification/Notification'
import { useSelector } from 'react-redux'
import { loaderSelector } from '../../store/slices/loader.slice'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import { themeSelector } from '../../store/slices/theme.slice'

export const Layout: FC = () => {
  const { pathname } = useLocation()
  const isSignPage = [
    EPATH.SIGN_IN as string,
    EPATH.SIGN_UP as string,
  ].includes(pathname)

  const isLoading = useSelector(loaderSelector)
  const theme: boolean = useSelector(themeSelector)

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  return (
    <ConfigProvider theme={theme ? ANTD_CONFIG_BLACK : ANTD_CONFIG}>
      <ErrorBoundary>
        <Notification />
        <Spin spinning={isLoading} fullscreen />
        <ALayout style={{ height: '100%' }}>
          {!isSignPage && <Header />}
          <ALayout.Content>
            <Outlet />
          </ALayout.Content>
          <ALayout.Footer style={{ textAlign: 'center' }}>
            &#169;IT-котики {new Date().getFullYear()}
          </ALayout.Footer>
        </ALayout>
      </ErrorBoundary>
    </ConfigProvider>
  )
}
