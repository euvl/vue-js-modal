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
   * Fallback optopn
   * If no suffix specified, assigning "px"
   */
  {
    name: 'px',
    regexp: new RegExp(`^${floatRegexp}$`)
  }
]

var getType = value => {
  if (value === 'auto') {
    return {
      type: value,
      value: 0
    }
  }

  for (var i = 0; i < types.length; i++) {
    const type = types[i]

    if (type.regexp.test(value)) {
      return {
        type: type.name,
        value: parseFloat(value)
      }
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

export const validateNumber = (value) => {
  if (typeof value === 'string') {
    let _value = parseNumber(value)
    return (_value.type === '%' || _value.type === 'px') && _value.value > 0
  }

  return value >= 0
}
