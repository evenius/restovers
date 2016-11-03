const { expect } = require('chai')
const generateURL = require('../urlGenerator')

describe('URL generator', function () {
  it('generates an url from req', function () {
    let fakeReq = {
      query: { ant: 'hilt', mole: 'hill' },
      protocol: 'http',
      get: () => { return 'local' },
      baseUrl: '/one'
    }
    let nextQuery = {ant: 'hill'}

    let url = generateURL(fakeReq, nextQuery)
    // Expect FUNCTION NOT TO CHANGE ITS BEHAVIOUR
    expect(url).to.equal('http://local/one?ant=hill&mole=hill')
  })
})
