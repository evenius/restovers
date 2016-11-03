const { expect } = require('chai')
const CreateErrorResponse = require('../ErrorBadRequest')

describe('ErrorBadRequest', function () {
  it('returns an error object with message:`Bad data, check what you\'re sending`', function () {
    let error = CreateErrorResponse()
    expect(error.result).to.equal('error')
    expect(error.error).to.equal('Bad data, check what you\'re sending')
    expect(error.data).to.be.empty
  })
})
