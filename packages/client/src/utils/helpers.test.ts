import { objectSorter } from './helpers'
import {
  mockLeaderboardItems,
  expectedNoOrder,
  expectedWithOrder,
} from './helpers.mock'

describe('Testing helpers functions', () => {
  describe('Testing objectsSorter function', () => {
    it('returns passed array if no sorting key provided', () => {
      const result = objectSorter(mockLeaderboardItems)
      expect(JSON.stringify(result)).toBe(JSON.stringify(mockLeaderboardItems))
    })
    it('returns array, sorted by key in ascending order if order parameter is not provided', () => {
      const key = 'scoreToday'

      const result = objectSorter(mockLeaderboardItems, key)
      expect(JSON.stringify(result)).toBe(JSON.stringify(expectedNoOrder))
    })
    it('returns array, sorted by key in descending order if order parameter is provided', () => {
      const key = 'scoreToday'
      const descOrder = true

      const result = objectSorter(mockLeaderboardItems, key, descOrder)
      expect(JSON.stringify(result)).toBe(JSON.stringify(expectedWithOrder))
    })
  })
})
