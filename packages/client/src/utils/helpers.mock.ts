export const mockLeaderboardItems = [
  {
    avatarPath: '',
    id: 1,
    playerName: 'Игрок 1',
    scoreToday: 18,
    scoreTotal: 143,
    userPosition: 1,
  },
  {
    avatarPath: '',
    id: 2,
    playerName: 'Игрок 2',
    scoreToday: 4,
    scoreTotal: 114,
    userPosition: 2,
  },
  {
    avatarPath: '',
    id: 3,
    playerName: 'Игрок 3',
    scoreToday: 15,
    scoreTotal: 165,
    userPosition: 3,
  },
]

export const expectedNoOrder = [
  {
    avatarPath: '',
    id: 2,
    playerName: 'Игрок 2',
    scoreToday: 4,
    scoreTotal: 114,
    userPosition: 2,
  },
  {
    avatarPath: '',
    id: 3,
    playerName: 'Игрок 3',
    scoreToday: 15,
    scoreTotal: 165,
    userPosition: 3,
  },
  {
    avatarPath: '',
    id: 1,
    playerName: 'Игрок 1',
    scoreToday: 18,
    scoreTotal: 143,
    userPosition: 1,
  },
]

export const expectedWithOrder = [
  {
    avatarPath: '',
    id: 1,
    playerName: 'Игрок 1',
    scoreToday: 18,
    scoreTotal: 143,
    userPosition: 1,
  },
  {
    avatarPath: '',
    id: 3,
    playerName: 'Игрок 3',
    scoreToday: 15,
    scoreTotal: 165,
    userPosition: 3,
  },
  {
    avatarPath: '',
    id: 2,
    playerName: 'Игрок 2',
    scoreToday: 4,
    scoreTotal: 114,
    userPosition: 2,
  },
]
