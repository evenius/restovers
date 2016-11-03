const { expect } = require('chai')
const CreateErrorResponse = require('../ErrorResponse')

describe('ErrorResponse', function () {
  it('returns an standard error response with given data', function () {
    let errorMessage = 'You goofed it. Ya goof'
    let error = CreateErrorResponse(errorMessage)
    expect(error.result).to.equal('error')
    expect(error.error).to.equal(errorMessage)
    expect(error.data).to.be.empty
  })
})
