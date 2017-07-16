// Parses string with float number and suffix:
// "0.001" => { type: "px", value: 0.001 }
// "0.001px" => { type: "px", value: 0.001 }
// "0.1%" => { type: "px", value: 0.1 }
// "foo"  => { type: "", value: "foo" }

var floatRegexp = '[-+]?[0-9]*\.?[0-9]+'

var types = [
//  {
//    name: 'rem',
//    regexp: new RegExp(`^${floatRegexp}rem\$`)
//  },
  {
    name: 'px',
    regexp: new RegExp(`^${floatRegexp}px\$`)
  }, 
  {
    name: '%',
    regexp: new RegExp(`^${floatRegexp}%\$`)
  },
  // Fallback option:
  // If no suffix specified, assign to px
  {
    name: 'px',
    regexp: new RegExp(`^${floatRegexp}\$`)
  }
]

var getType = (value) => {
  for (var i = 0; i < types.length; i++) {
    let type = types[i]
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

var parse = (value) => {
  switch (typeof value) {
    case 'number':
      return { type: 'px', value }
    case 'string':
      return getType(value)
    default: 
      return { type: '', value }
  }
}

export default parse

/// tests
/*
console.log(parse(10))
console.log(parse(10.10))
console.log(parse(-10))

console.log(parse('5%'))
console.log(parse('-5%'))
console.log(parse('5.123%'))

console.log(parse('5px'))
console.log(parse('-5px'))
console.log(parse('5.123px'))

console.log(parse("adasd%"))
console.log(parse(""))
console.log(parse("+2-3px")) // fails
*/