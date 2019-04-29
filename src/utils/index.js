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
  return value < from ? from : (value > to ? to : value)
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

export const createDivInBody = () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  return div
}

export const blurActiveElement = () => {
  if (typeof document !== 'undefined' &&
    document.activeElement &&
    document.activeElement.tagName !== 'BODY' &&
    document.activeElement.blur) {
    document.activeElement.blur()

    return true
  }

  return false
}
