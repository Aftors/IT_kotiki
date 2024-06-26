export const mockLeaderboardItems = [
  {
    avatarPath: '',
    id: 1,
    playerName: 'Игрок 1',
    scoreMax: 18,
    userPosition: 1,
  },
  {
    avatarPath: '',
    id: 2,
    playerName: 'Игрок 2',
    scoreMax: 4,
    userPosition: 2,
  },
  {
    avatarPath: '',
    id: 3,
    playerName: 'Игрок 3',
    scoreMax: 15,
    userPosition: 3,
  },
]

export const expectedNoOrder = [
  {
    avatarPath: '',
    id: 2,
    playerName: 'Игрок 2',
    scoreMax: 4,
    userPosition: 2,
  },
  {
    avatarPath: '',
    id: 3,
    playerName: 'Игрок 3',
    scoreMax: 15,
    userPosition: 3,
  },
  {
    avatarPath: '',
    id: 1,
    playerName: 'Игрок 1',
    scoreMax: 18,
    userPosition: 1,
  },
]

export const expectedWithOrder = [
  {
    avatarPath: '',
    id: 1,
    playerName: 'Игрок 1',
    scoreMax: 18,
    userPosition: 1,
  },
  {
    avatarPath: '',
    id: 3,
    playerName: 'Игрок 3',
    scoreMax: 15,
    userPosition: 3,
  },
  {
    avatarPath: '',
    id: 2,
    playerName: 'Игрок 2',
    scoreMax: 4,
    userPosition: 2,
  },
]
