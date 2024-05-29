import { FC } from 'react'
import { EPATH } from '../../models/models'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Flex,
  Typography,
  Layout as ALayout,
  ConfigProvider,
} from 'antd'
import { ESTUB_TYPE, STUB_TEXT, STUB_TITLE } from './models/models'
import styled from 'styled-components'
import { DEEP_PINK } from '../../constants/color'
import { ANTD_CONFIG } from '../../constants/antd.config'
const { Text, Title } = Typography

const { Content } = ALayout

export const ErrorStub: FC<{
  type: ESTUB_TYPE
}> = ({ type }) => {
  const navigate = useNavigate()
  return (
    <ConfigProvider theme={ANTD_CONFIG}>
      <ALayout style={{ height: '100%' }}>
        <Content
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Flex vertical align="center" justify="center">
            <StubTitle>{STUB_TITLE[type]}</StubTitle>
            <Text
              style={{
                textAlign: 'center',
                whiteSpace: 'pre-wrap',
                marginBottom: 24,
              }}>
              {STUB_TEXT[type]}
            </Text>
            <Button
              onClick={() =>
                navigate(EPATH.MAIN, {
                  replace: true,
                })
              }
              style={{ border: 'none' }}
              size="large">
              Вернуться
            </Button>
          </Flex>
        </Content>
      </ALayout>
    </ConfigProvider>
  )
}

export const StubTitle = styled(Title)`
  margin-bottom: 48px;
  color: ${DEEP_PINK};
  letter-spacing: 20px;
  margin-left: 20px;
  &.ant-typography {
    color: ${DEEP_PINK};
  }
`
