/*
 * @lc app=leetcode id=13 lang=typescript
 *
 * [13] Roman to Integer
 */

// @lc code=start

function numeralToInt(numeral: string): number {
  switch (numeral) {
    case 'I':
      return 1
    case 'V':
      return 5
    case 'X':
      return 10
    case 'L':
      return 50
    case 'C':
      return 100
    case 'D':
      return 500
    case 'M':
      return 1000
    default:
      throw new Error(`Unexpected numeral value: '${numeral}'`)
  }
}

function romanToInt(s: string): number {
  let accumulator = 0

  for (let i = 0; i < s.length; i++) {
    const numeral = s[i]
    const peekAhead = s[i + 1]

    if (
      (numeral === 'I' && (peekAhead === 'V' || peekAhead === 'X')) ||
      (numeral === 'X' && (peekAhead === 'L' || peekAhead === 'C')) ||
      (numeral === 'C' && (peekAhead === 'D' || peekAhead === 'M'))
    ) {
      accumulator += numeralToInt(peekAhead) - numeralToInt(numeral)
      ++i
    } else {
      accumulator += numeralToInt(numeral)
    }
  }

  return accumulator
}

// @lc code=end

export { romanToInt }
