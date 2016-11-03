const { expect } = require('chai')
const CreateSuccessResponse = require('../WroteResponse')

describe('ErrorValidationResponse', function () {
  it('returns an standard success response with given data', function () {
    let successData = 'ok'
    let success = CreateSuccessResponse(successData)

    expect(success.result).to.equal('success')
    expect(success.error).to.equal(undefined)
    expect(success.data).to.equal(successData)
  })
})

describe('ErrorValidationResponse', function () {
  it('returns an standard success response with ok data', function () {

  })
})
