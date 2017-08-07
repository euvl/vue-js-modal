var util = require('../../src/util')
var { expect } = require('chai')

describe('util.js', () => {
  describe('#inRange', () => {
    it('Should return the source value (in the range)', () => {
      let value = util.inRange(-10, 10, 0)
      expect(value).to.equal(0)
    })

    it('Should not be equal to the source value (outside the range)', () => {
      let value = util.inRange(-10, 10, -100)
      expect(value).not.to.equal(-100)
    })

    it('Should replace source value with upper limit', () => {
      let value = util.inRange(0, 10, 30)
      expect(value).to.equal(10)
    })

    it('Should replace source value with lower limit', () => {
      let value = util.inRange(1, 10, -1)
      expect(value).to.equal(1)
    })
  })
})
