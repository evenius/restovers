const { expect } = require('chai')
const {
  setDefaultData,
  removeNonValidators,
  setUniqueKey,
  validate
} = require('../')

const validator = require('validate.js')
const ValidationError = require('../ValidationError')

describe('Validator', function () {
  describe('validation process', function () {
    it('returns an object with adjustedData and error:null if validation passes', function () {
      let validation = validate({}, {}, {})
      expect(validation.errors).to.equal(null)
      expect(validation.adjustedData).to.deep.equal({})
    })
    it('returns an object with an ValidationError if validation does not passes', function () {
      let validation = validate({}, {foo: {presence: true}}, {})
      expect(validation.errors).to.not.equal(null)
      expect(validation.adjustedData).to.deep.equal({})
      expect(validation.errors).to.be.an.instanceOf(ValidationError)
      expect(validation.errors.data).to.have.any.keys('foo')
    })
    it('removes keys from schema not associated with validator.js before validation', function () {
      // It is a bit dense, but it creates a partial schema with all the validator keys. they should not disappear
      let partialSchema = Object.keys(validator.validators).reduce((o, v, i) => { o[v] = true; return o }, {})
      // Then I add what it is supposed to remove
      partialSchema = Object.assign(partialSchema, {unique: true, defaultVal: true})

      let alteredSchema = removeNonValidators(partialSchema)
      expect(alteredSchema).to.not.deep.equal(partialSchema)
      expect(Object.keys(alteredSchema)).to.deep.equal(Object.keys(validator.validators))
    })
  })

  describe('default data setting', function () {
    it('calls setDefaultData on object before validating (Currently untestable, refactor needed)')

    // For the sake of time - I skipped what happens if there's already data there
    it('can set default data with defaultData-function', function () {
      let defaultDataFunction = () => { return 'Spronger' }
      let data = setDefaultData({}, 'name', defaultDataFunction)
      expect(data.name).to.equal(defaultDataFunction())
    })
    it('can set default data when defaultData is not a function', function () {
      let defaultDataString = 'Rewxurr'
      let data = setDefaultData({}, 'name', defaultDataString)
      expect(data.name).to.equal(defaultDataString)
    })
  })

  describe('Unique incrementing key', function () {
    before(function () {
      this.miniStore = [{id: 1}, {id: 2}, {id: 3}]
    })
    it('calls `setUniqueKey` on object before validating (Currently untestable, refactor needed)')
    it('can figure out the correct unique key', function () {
      let data = setUniqueKey({}, 'id', this.miniStore)
      expect(data.id).to.equal(4)
    })
    it('can figure out the correct first unique key (it\'s "1")', function () {
      let data = setUniqueKey({}, 'id', [])
      expect(data.id).to.equal(1)
    })
  })
})
