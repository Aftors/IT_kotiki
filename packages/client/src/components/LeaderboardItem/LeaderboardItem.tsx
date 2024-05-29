import { Avatar, Typography } from 'antd'
import { Card } from '../Card/Card'
import * as palette from '../../constants/color'
import styled from 'styled-components'
import { ILeaderboardItem } from './models/models'
import { imgUrl } from '../../utils/api/consts'

const { Text, Title } = Typography

const LeaderboardCard = styled(Card)`
  border: 1px solid ${palette.LIGHT_GREY};
  border-radius: 12px;
`

const CardTitle = styled(Title)`
  && {
    margin: 0 auto 0 16px;
    color: ${palette.DEEP_PINK};
    font-weight: bold;
  }
`

const CardAvatar = styled(Avatar)`
  width: 44px;
  height: 44px;
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CardText = styled(Text)`
  color: ${palette.LIGHT_GREY};
`

const BoldText = styled(CardText)`
  font-weight: bold;
  color: ${palette.LIGHT_PINK};
`

export const LeaderboardItem: React.FC<Omit<ILeaderboardItem, 'id'>> = ({
  userPosition,
  avatarPath,
  playerName,
  scoreMax,
}) => (
  <LeaderboardCard>
    <BoldText>{userPosition}</BoldText>
    <CardAvatar src={`${imgUrl}${avatarPath}`} />
    <CardTitle level={2}>{playerName}</CardTitle>
    <CardInfo>
      <CardText>Личный рекорд:</CardText>
      <BoldText>{scoreMax}</BoldText>
    </CardInfo>
  </LeaderboardCard>
)
