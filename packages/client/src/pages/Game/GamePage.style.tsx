import { Flex } from 'antd'
import styled from 'styled-components'
import { DEEP_PINK } from '../../constants/color'

export const GameContainer = styled(Flex)`
  justify-content: center;
  align-items: center;
  position: relative;
  padding-top: 64px;
`

export const Properties = styled(Flex)`
  justify-content: center;
  align-items: center;
  gap: 12px;
  position: absolute;
  color: #fff;
  background-color: ${DEEP_PINK};
  padding: 12px 24px;
  top: 0;
  width: 100%;

  p {
    margin: 0;
    font-size: 18px;
  }
`
