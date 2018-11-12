export const generateId = ((index = 0) => () => (index++).toString())()
/**
 *
 * @param {Number} from  Lower limit
 * @param {Number} to    Upper limit
 * @param {Number} value Checked number value
 *
 * @return {Number} Either source value itself or limit value if range limits
 *   are exceeded
 */
export const inRange = (from, to, value) => {
  if (value < from) {
    return from
  }

  if (value > to) {
    return to
  }

  return value
  // lol
  // return value < from ? from : (value > to ? to : value)
}

export const createModalEvent = (args = {}) => {
  return {
    id: generateId(),
    timestamp: Date.now(),
    canceled: false,
    ...args
  }
}

export const getMutationObserver = () => {
  if (typeof window !== 'undefined') {
    const prefixes = ['', 'WebKit', 'Moz', 'O', 'Ms']

    for (let i = 0; i < prefixes.length; i++) {
      let name = prefixes[i] + 'MutationObserver'

      if (name in window) {
        return window[name]
      }
    }
  }

  return false
}
