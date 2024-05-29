import React, { FC, useEffect, useState } from 'react'
import { Button, Flex } from 'antd'
import {
  Countdown,
  HintCard,
  HintCardWrapper,
  StartGameTitle,
} from './StartGamePage.style'

const CARD_HINT = [
  {
    id: 1,
    text: 'Здесь будет краткое описание механик чуть позже',
  },
  {
    id: 2,
    text: 'Здесь будет краткое описание механик чуть позже',
  },
]

interface StartGamePageProps {
  gameStarted: boolean
  startGame: () => void
}

export const StartGamePage: FC<StartGamePageProps> = ({
  gameStarted,
  startGame,
}) => {
  const TIME_REMAIN = Date.now() + 1.2 * 3000
  const [isDisabled, setIsDisabled] = useState(false)
  const [gameStarts, setGameStarts] = useState(false)

  useEffect(() => {
    setIsDisabled(false)
  }, [gameStarted])

  const startButtonClick = () => {
    setIsDisabled(true)
    setGameStarts(true)
  }

  return (
    <Flex vertical align="center" justify="center">
      {gameStarts && (
        <>
          <StartGameTitle>ИГРА НАЧНЕТСЯ ЧЕРЕЗ:</StartGameTitle>
          <Countdown format="ss" value={TIME_REMAIN} onFinish={startGame} />
        </>
      )}
      <HintCardWrapper>
        {CARD_HINT.map(({ id, text }) => (
          <HintCard key={id} title={`Подсказка #${id}`}>
            {text}
          </HintCard>
        ))}
      </HintCardWrapper>
      <Button
        disabled={isDisabled}
        size="large"
        onClick={startButtonClick}
        style={{
          width: 200,
          border: 'none',
        }}>
        СТАРТ
      </Button>
    </Flex>
  )
}
