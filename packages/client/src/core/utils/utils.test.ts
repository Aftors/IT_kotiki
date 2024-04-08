import { randomInt } from './randomInt'
import { mouseCordsCheck } from './mouseCordsCheck'
import { distanceHypot } from './hypot'

describe('Testing utils functions', () => {
  describe('Testing randomInt function', () => {
    const min = 10
    const max = 100
    const num1 = randomInt(min, max)
    const num2 = randomInt(min, max)

    it('returns random integer numbers', () => {
      expect(Number.isInteger(num1)).toBe(true)
      expect(num1).not.toEqual(num2)
    })

    it('returns numbers in specified range', () => {
      expect(num1).not.toBeLessThan(min)
      expect(num1).not.toBeGreaterThan(max)
    })
  })

  describe('Testing mouseCordsCheck function', () => {
    const object = {
      x: 128,
      y: 320,
    }
    const width = 64
    const height = 128
    it('returns false if mouse is outside the object', () => {
      const mouse = {
        x: 1134,
        y: 511,
      }
      const result = mouseCordsCheck(mouse, object, width, height)
      expect(result).toBe(false)
    })
    it('returns true if mouse is inside the object', () => {
      const mouse = {
        x: 168,
        y: 400,
      }
      const result = mouseCordsCheck(mouse, object, width, height)
      expect(result).toBe(true)
    })
  })

  describe('Testing distanceHypot function', () => {
    const a = {
      x: 800,
      y: 200,
    }
    const b = {
      x: 700,
      y: 300,
    }
    const result = 141.4213562373095

    it('returns distance', () => {
      const distance = distanceHypot(a, b)
      expect(distance).toBe(result)
    })
  })
})
