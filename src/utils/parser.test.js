var { parseNumber } = require('./parser')

describe('parser.js', () => {
  describe('#parse', () => {
    describe('Correct types', () => {
      it('Should parse numbers', () => {
        let object = parseNumber(10)

        expect(object.value).to.be.a('number')
        expect(object.type).to.be.a('string')

        expect(object.value).to.equal(10)
        expect(object.type).to.equal('px')
      })

      it('Should parse strings', () => {
        let object = parseNumber('10')

        expect(object.value).to.be.a('number')
        expect(object.type).to.be.a('string')

        expect(object.value).to.equal(10)
        expect(object.type).to.equal('px')
      })

      it ('Should parse "auto" string, auto => {type: "auto", value: 0}', () => {
        let object = parseNumber('auto')

        expect(object.value).to.equal(0)
        expect(object.type).to.equal('auto')
      })

      it ('Should parse wrong types', () => {
        let nullValue = parseNumber(null)
        let booleanValue = parseNumber(false)

        expect(nullValue.value).to.equal(null)
        expect(nullValue.type).to.equal('')

        expect(booleanValue.value).to.equal(false)
        expect(booleanValue.type).to.equal('')
      })
    })

    describe('Parsing suffixed string', () => {
      it ('Should parse "px"', () => {
        let object = parseNumber('10px')

        expect(object.value).to.equal(10)
        expect(object.type).to.equal('px')
      })

      it ('Should parse "%"', () => {
        let object = parseNumber('10%')

        expect(object.value).to.equal(10)
        expect(object.type).to.equal('%')
      })

      it ('Should not parse "%px"', () => {
        let object = parseNumber('10%px')

        expect(object.value).to.be.a('string')
        expect(object.type).to.equal('')
      })
    })
  })
})
