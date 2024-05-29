import { map } from './collision-map'
import { findPath } from './findPath'
import { ArrayToObject } from './findPath'
import { mockArray, expectedObjects } from './findPath.mock'

const pathStart = [4, 22]
const pathEnd = [7, 3]

describe('Testing findPath function', () => {
  it('returns path object', () => {
    const path = findPath(map, pathStart, pathEnd)
    expect(JSON.stringify(path)).toBe(JSON.stringify(expectedObjects))
  })
})

describe('Testing ArrayToObject function', () => {
  it('returns path object', () => {
    const objects = ArrayToObject(mockArray)
    expect(JSON.stringify(objects)).toBe(JSON.stringify(expectedObjects))
  })
})
