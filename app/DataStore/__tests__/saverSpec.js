const proxyquire = require('proxyquire')
const { spy } = require('sinon')
const { expect } = require('chai')
const store = require('./_dbStub')

const {
  validator,
  VALID,
  INVALID
} = require('./../validator/__tests__/_validatorStub')

describe('Saver', function () {
  describe('inserting new data', function () {
    beforeEach(function () {
      const Store = store()
      const Saver = proxyquire('../saver', { './validator/': validator })
      this.saver = (validatorValidity) => new Saver(new Store.DB(), {})
      this.store = Store
    })

    it('calls the db when validation is ok', function () {
      // Setup)
      let callbackSpy = spy()
      let saver = this.saver(VALID)
      saver.insert({}, callbackSpy)
      expect(this.store.insert.calledOnce).to.equal(true)
      expect(callbackSpy.calledOnce).to.equal(true)
    })

    it('can update the db', function () {
      let callbackSpy = spy()
      let saver = this.saver(INVALID)
      saver.update({}, callbackSpy)
      expect(this.store.update.calledOnce).to.equal(true)
      expect(callbackSpy.calledOnce).to.equal(true)
    })
  })
})
