import { stoneGame } from './877.stone-game'

describe('stoneGame()', () => {
  const game1 = [5, 3, 4, 5]
  it('should return true that Alice wins game 1', () => {
    expect(stoneGame(game1)).toBe(true)
  })

  const game2 = [3, 7, 2, 3]
  it('should return true that Alice wins game 2', () => {
    expect(stoneGame(game2)).toBe(true)
  })
})
