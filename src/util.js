export const inRange = (from, to, value) => {
  if (value > to) {
    return to
  }
  if (value < from) {
    return from
  }
  return value
}
