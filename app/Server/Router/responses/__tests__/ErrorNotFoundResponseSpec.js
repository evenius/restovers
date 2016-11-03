const { expect } = require('chai')
const CreateErrorResponse = require('../ErrorNotFoundResponse')

describe('ErrorNotFound', function () {
  it('returns an error object with message:`Unable to find resource`', function () {
    let error = CreateErrorResponse()
    expect(error.result).to.equal('error')
    expect(error.error).to.equal('Unable to find resource')
    expect(error.data).to.be.empty
  })
})
