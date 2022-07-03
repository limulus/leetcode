import { romanToInt } from './13.roman-to-integer'

describe('romanToInt()', () => {
  it('should throw when passed non-roman numeral characters', () => {
    expect(() => romanToInt('JKF')).toThrow(/Unexpected numeral value/)
  })

  it('should return 3 value for III', () => {
    expect(romanToInt('III')).toBe(3)
  })

  it('should return 58 for LVIII', () => {
    expect(romanToInt('LVIII')).toBe(58)
  })

  it('should return 1994 for MCMXCIV', () => {
    expect(romanToInt('MCMXCIV')).toBe(1994)
  })

  it('should return 25844 for MMDCCCXLIV', () => {
    expect(romanToInt('MMDCCCXLIV')).toBe(2844)
  })

  describe.each([
    ['I', 1],
    ['V', 5],
    ['X', 10],
    ['L', 50],
    ['C', 100],
    ['D', 500],
    ['M', 1000],
  ])('for lone numeral %s', (numeral, integer) => {
    it(`should return ${integer}`, () => {
      expect(romanToInt(numeral)).toBe(integer)
    })
  })

  describe.each([
    ['I', ['V', 4]],
    ['I', ['X', 9]],
    ['X', ['L', 40]],
    ['X', ['C', 90]],
    ['C', ['D', 400]],
    ['C', ['M', 900]],
  ] as const)("for subtractor '%s'", (subtractor, [numeral, val]) => {
    it(`should return expected value when paired with ${numeral}`, () => {
      expect(romanToInt(`${subtractor}${numeral}`)).toBe(val)
    })
  })
})
