export const inRange = (from, to, value) => {
  return value < from ? from : value > to ? to : value
}
