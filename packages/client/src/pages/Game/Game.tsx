import { useEffect, useState } from 'react'
import { Core } from '../../core/core'
import { StartGamePage } from './StartGamePage/StartGamePage'
import { useNavigate } from 'react-router'
import { EPATH } from '../../models/models'
import { EndGameModal } from './StartGamePage/StartGamePage.style'
import { EMODAL_TYPE } from '../../components/Modal/models/models'
import { GameContainer, Properties } from './GamePage.style'
import { setLeaderboard } from '../../store/slices/leaderboardSlice/leaderboard.thunk'
import { useAppDispatch } from '../../store/store'
import { useSelector } from 'react-redux'
import { userSelector } from '../../store/slices/userSlice/user.slice'
import { leaderboardSelector } from '../../store/slices/leaderboardSlice/leaderboard.slice'

export const Game = () => {
  const [gameStarted, setGameStarted] = useState(false)
  const [game, setGame] = useState<Core>()
  const [health, setHealth] = useState<number>()
  const [towers, setTowers] = useState<number>()
  const [killed, setKilled] = useState<number>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { id, display_name, login, avatar } = useSelector(userSelector)
  const leaderboard = useSelector(leaderboardSelector)

  useEffect(() => {
    const instanceGame = new Core({ canvas: document.querySelector('canvas') })
    instanceGame.onEndGame = () => {
      stopGame()
      setLeaderboardRecord(instanceGame.killedEnemies)
    }
    setGame(instanceGame)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (game) {
        setHealth(game.homeHealth)
        setTowers(game.countTowers)
        setKilled(game.killedEnemies)
      }
    }, 700)
    return () => clearInterval(interval)
  }, [game])

  const startGame = () => {
    setGameStarted(true)
    game?.startGame()
  }

  const stopGame = () => {
    setIsModalOpen(true)
  }

  const restartGame = () => {
    setIsModalOpen(false)
    setGameStarted(false)
  }

  const setLeaderboardRecord = (score: number) => {
    const userLeaderboardRecord = leaderboard?.find(record => record.id === id)
    const newScoreTotal = userLeaderboardRecord?.scoreTotal
      ? userLeaderboardRecord.scoreTotal + score
      : score
    dispatch(
      setLeaderboard({
        id,
        display_name,
        login,
        avatar,
        scoreMaxIK: score,
        scoreTotalIK: newScoreTotal,
      })
    )
  }

  return (
    <div className="Core">
      <GameContainer style={{ display: gameStarted ? 'flex' : 'none' }}>
        <canvas id="canvas"></canvas>
        <Properties className="properties">
          <p>Жизнь: {health}</p>
          <p>Башни: {towers}</p>
          <p>Убито: {killed}</p>
        </Properties>
      </GameContainer>
      {!gameStarted && (
        <StartGamePage gameStarted={gameStarted} startGame={startGame} />
      )}
      <EndGameModal
        centered
        count={killed}
        type={EMODAL_TYPE.GAME_END}
        open={isModalOpen}
        onCancel={() => navigate(EPATH.LEADER_BOARD)}
        onOk={restartGame}
        cancelButtonProps={{ type: 'primary' }}
        okButtonProps={{ type: 'default' }}
        closeIcon={null}
      />
    </div>
  )
}
