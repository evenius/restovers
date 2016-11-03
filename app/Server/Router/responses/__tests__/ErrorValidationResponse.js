const { expect } = require('chai')
const CreateErrorResponse = require('../ErrorResponse')

describe('ErrorValidationResponse', function () {
  it('returns an validation error', function () {
    let errorMessage = '[key: "is broken"]'
    let error = CreateErrorResponse(errorMessage)
    expect(error.result).to.equal('error')
    expect(error.error).to.equal(errorMessage)
    expect(error.data).to.be.empty
  })
})
