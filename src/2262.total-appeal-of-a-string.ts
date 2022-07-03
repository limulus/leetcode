/*
 * @lc app=leetcode id=2262 lang=typescript
 *
 * [2262] Total Appeal of A String
 */

// @lc code=start

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
