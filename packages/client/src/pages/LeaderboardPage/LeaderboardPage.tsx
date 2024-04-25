import { useEffect, useState } from 'react'
import { Flex, Typography } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import * as palette from '../../constants/color'
import { LeaderboardItem } from '../../components/LeaderboardItem/LeaderboardItem'
import { LeaderboardControls } from '../../components/LeaderboardControls/LeaderboardControls'
import { FieldData } from '../../components/LeaderboardControls/models/models'
import { objectSorter } from '../../utils/helpers'
import { leaderboardSelector } from '../../store/slices/leaderboardSlice/leaderboard.slice'
import { getLeaderboard } from '../../store/slices/leaderboardSlice/leaderboard.thunk'
import { useAppDispatch } from '../../store/store'
import { useSelector } from 'react-redux'

const { Title } = Typography

const PageContent = styled(Flex)`
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 760px;
  margin: 0 auto;
`

const ContentContainer = styled(PageContent)`
  gap: 16px;
  justify-content: flex-start;
  height: 70vh;
  overflow-y: auto;
  margin: 0 0 36px;
`

const PageTitle = styled(Title)`
  && {
    margin: 44px auto 30px;
    color: ${palette.DEEP_PINK};
    font-weight: bold;
  }
`

export const LeaderboardPage: React.FC = () => {
  const [isControlsOpen, setIsControlsOpen] = useState(false)
  const [sortedData, setSortedData] = useState<
    Record<string, string | number>[]
  >([])
  const [data, setData] = useState<Record<string, string | number>[]>([])

  const leaderboard = useSelector(leaderboardSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      getLeaderboard({
        cursor: 0,
        limit: 10,
      })
    )
  }, [])

  useEffect(() => {
    setData(leaderboard)
    setSortedData(leaderboard)
  }, [leaderboard])

  const toggleControls = () => setIsControlsOpen(!isControlsOpen)

  const handleSorter = (values: FieldData[]) => {
    const sortedData = objectSorter(data, values[1].value, values[0].value)
    setSortedData(sortedData)
    setData(sortedData)
  }

  const handleFilter = (values: FieldData[]) => {
    setData(values[0].value ? data.slice(0, 10) : sortedData)
  }

  return (
    <>
      <PageContent>
        <PageTitle level={1}>
          Рейтинг игроков
          <FilterOutlined onClick={toggleControls} />
        </PageTitle>
        <ContentContainer>
          {data?.map(
            ({ avatarPath, playerName, scoreTotal, scoreMax, id }, idx) => (
              <LeaderboardItem
                userPosition={idx + 1}
                avatarPath={avatarPath}
                playerName={playerName}
                scoreTotal={scoreTotal}
                scoreMax={scoreMax}
                key={id}
              />
            )
          )}
        </ContentContainer>
        <LeaderboardControls
          isOpen={isControlsOpen}
          onClose={toggleControls}
          onSorterChange={handleSorter}
          onFilterChange={handleFilter}
        />
      </PageContent>
    </>
  )
}
