const { expect } = require('chai')
const CreateSuccessResponse = require('../FoundResponse')

describe('FoundResponse', function () {
  it('returns an standard success response with given data', function () {
    let successData = {data: {cat: 'pajamas'}}
    let success = CreateSuccessResponse(successData)

    expect(success.result).to.equal('success')
    expect(success.error).to.equal(undefined)
    expect(success.data).to.deep.equal(successData.data)
  })
  it('supports optional next and prev page', function () {
    // No paging
    let successData = {data: {bee: 'knees'}}
    let successWithoutPaging = CreateSuccessResponse(successData)

    // only next page
    successData.nextPage = '/recipes/1244'
    let successWithNextPage = CreateSuccessResponse(successData)

    // Both!
    successData.prevPage = '/recipes/1242'
    let successWithBothPages = CreateSuccessResponse(successData)

    expect(successWithoutPaging.paging).to.equal(undefined)
    expect(successWithNextPage.paging).to.deep.equal({next: successData.nextPage})
    expect(successWithBothPages.paging).to.deep.equal({next: successData.nextPage, prev: successData.prevPage})
  })
  // it('returns an standard error response with given data', function () {
  //   let errorMessage = 'You goofed it. Ya goof'
  //   let error = CreateErrorResponse(errorMessage)
  //   expect(error.result).to.equal('error')
  //   expect(error.error).to.equal(errorMessage)
  //   expect(error.data).to.be.empty
  // })
})
