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
