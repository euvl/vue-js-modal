export * from './numbers'

const INPUT_NODE_NAMES = ['INPUT', 'TEXTAREA', 'SELECT']

export const generateId = ((index = 0) => () => (index++).toString())()
/**
 * @param {Number} from  Lower limit
 * @param {Number} to    Upper limit
 * @param {Number} value Checked number value
 *
 * @return {Number} Either source value itself or limit value if range limits
 * are exceeded
 */

export const createDivInBody = () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  return div
}

export const blurActiveElement = () => {
  if (
    typeof document !== 'undefined' &&
    document.activeElement &&
    document.activeElement.tagName !== 'BODY' &&
    document.activeElement.blur
  ) {
    document.activeElement.blur()
  }
}
// Different browsers handle innerWidth/clientWidth differently,
// this function tries to return the smallest width (assuming that it excludes
// scrollbar width)
export const windowWidthWithoutScrollbar = () => {
  const { innerWidth } = window
  const { clientWidth } = document.documentElement

  if (innerWidth && clientWidth) {
    return Math.min(innerWidth, clientWidth)
  }

  return clientWidth || innerWidth
}

export const stringStylesToObject = styles => {
  const lines = styles
    .split(';')
    .map(line => line.trim())
    .filter(Boolean)

  const entries = lines.map(line => line.split(':'))

  return entries.reduce((styles, [key, value]) => {
    return {
      ...styles,
      [key]: value
    }
  }, {})
}

export const isInput = element => {
  return element && INPUT_NODE_NAMES.indexOf(element.nodeName) !== -1
}

export const getTouchEvent = event => {
  return event.touches && event.touches.length > 0 ? event.touches[0] : event
}
