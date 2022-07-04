/*
 * @lc app=leetcode id=2262 lang=typescript
 *
 * [2262] Total Appeal of A String
 */

// @lc code=start

/**
 * This uses the algorithm provided by the hints, but improves upon its performance by
 * using a `Map` to store the characters we have seen and where we last saw them.
 */
function appealSum(s: string): number {
  let appealSum = 0

  const charLastSeenAt = new Map<string, number>()
  for (let i = 0; i < s.length; i++) {
    charLastSeenAt.set(s[i], i)
    for (const lastSeen of charLastSeenAt.values()) {
      appealSum += 1 + lastSeen
    }
  }

  return appealSum
}

// @lc code=end

export { appealSum }

/**
 * First attempt of the appealSum problem. The first pass at this solution just did a
 * naive brute force of the problem but it was unsurprisingly too slow. I figured creating
 * a `Set` for each index and adding the chars to that set as the substring size grew
 * might be fast enough, but this was still too slow.
 */
export function firstAttempt(s: string) {
  let appealSum = 0

  const setForSubstringAt = new Array<Set<string>>(s.length)
  for (let i = 0; i < setForSubstringAt.length; i++) {
    setForSubstringAt[i] = new Set<string>()
  }

  for (let substrEnd = 0; substrEnd < s.length; substrEnd++) {
    for (let i = 0; i + substrEnd < s.length; i++) {
      setForSubstringAt[i].add(s[i + substrEnd])
      appealSum += setForSubstringAt[i].size
    }
  }

  return appealSum
}
/**
 * The second attempt uses a `Map` for each substring length. The idea is that `Map` is a
 * window the size of the substring length and each iteration all that is required to
 * calculate the appeal is to add/remove the chars at either end of the window as it
 * advances. This proved to be slower than the first attempt.
 */
export function secondAttempt(s: string) {
  let appealSum = 0

  for (let substrEnd = 0; substrEnd < s.length; substrEnd++) {
    const map = new Map<string, number>()
    for (let i = 0; i + substrEnd < s.length; i++) {
      if (i === 0) {
        for (let j = 0; j <= i + substrEnd; j++) {
          map.set(s[j], (map.get(s[j]) ?? 0) + 1)
        }
      } else {
        map.set(s[i + substrEnd], (map.get(s[i + substrEnd]) ?? 0) + 1)
        if (map.get(s[i - 1]) === 1) {
          map.delete(s[i - 1])
        } else {
          map.set(s[i - 1], map.get(s[i - 1])! - 1)
        }
      }
      appealSum += map.size
    }
  }

  return appealSum
}

/**
 * The third attemp is similar to the second, but improves upon it by starting out with
 * the window being large and progressively getting smaller. This improves the speed so
 * that it is faster than the first attempt but not by much and only for large 𝑛.
 */
export function thirdAttempt(s: string) {
  let appealSum = 0

  const firstMap = new Map<string, number>()
  for (let i = 0; i < s.length; i++) {
    firstMap.set(s[i], (firstMap.get(s[i]) ?? 0) + 1)
  }
  appealSum += firstMap.size

  for (let substrEnd = s.length - 1; substrEnd >= 0; substrEnd--) {
    if (firstMap.get(s[substrEnd]) === 1) {
      firstMap.delete(s[substrEnd])
    } else {
      firstMap.set(s[substrEnd], firstMap.get(s[substrEnd])! - 1)
    }
    appealSum += firstMap.size

    const map = new Map(firstMap)
    for (let i = 1; i + substrEnd - 1 < s.length; i++) {
      map.set(s[i + substrEnd - 1], (map.get(s[i + substrEnd - 1]) ?? 0) + 1)
      if (map.get(s[i - 1]) === 1) {
        map.delete(s[i - 1])
      } else {
        map.set(s[i - 1], map.get(s[i - 1])! - 1)
      }
      appealSum += map.size
    }
  }

  return appealSum
}

/**
 * I finally gave in and read the hints. This is a rather straightforward implementation
 * of the algorithm provided by the hints, but I saw an obvious improvement which I made
 * in my final submission.
 */
export function fourthAttempt(s: string) {
  let appealSum = 0

  for (let i = 0; i < s.length; i++) {
    for (const char of alphabet) {
      for (let j = i; j >= 0; j--) {
        if (s[j] === char) {
          appealSum += 1 + j
          break
        }
      }
    }
  }

  return appealSum
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
