const floatRegexp = '[-+]?[0-9]*.?[0-9]+'

const types = [
  {
    name: 'px',
    regexp: new RegExp(`^${floatRegexp}px$`)
  },
  {
    name: '%',
    regexp: new RegExp(`^${floatRegexp}%$`)
  },
  /**
   * Fallback option
   * If no suffix specified, assigning "px"
   */
  {
    name: 'px',
    regexp: new RegExp(`^${floatRegexp}$`)
  }
]

const getType = value => {
  if (value === 'auto') {
    return {
      type: value,
      value: 0
    }
  }

  const type = types.find(type => type.regexp.test(value))

  if (type) {
    return {
      type: type.name,
      value: parseFloat(value)
    }
  }

  return {
    type: '',
    value: value
  }
}

export const parseNumber = value => {
  switch (typeof value) {
    case 'number':
      return { type: 'px', value }
    case 'string':
      return getType(value)
    default:
      return { type: '', value }
  }
}

export const validateNumber = value => {
  if (typeof value === 'string') {
    let num = parseNumber(value)

    return (num.type === '%' || num.type === 'px') && num.value > 0
  }

  return value >= 0
}
