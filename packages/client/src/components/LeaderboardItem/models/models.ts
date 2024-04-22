export interface ILeaderboardItem {
  [key: string]: string | number
  avatarPath: string
  playerName: string
  scoreTotal: number
  scoreToday: number
  id: number
}
