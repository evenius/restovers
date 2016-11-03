const proxyquire = require('proxyquire')
const { expect } = require('chai')
const { spy } = require('sinon')

let expressSpy = {
  listen: spy(),
  use: spy(),
  locals: {}
}

describe('Server', function () {
  before(function () {
    this.App = proxyquire('../', {
      'express': () => expressSpy,
      './Router': { bindRoutes: () => {} }
    })
  })
  it('Calls `use` and stuff', function () {
    let App = new this.App({})
    App.listen()
    expect(expressSpy.use.calledTwice).to.equal(true)
    expect(expressSpy.listen.calledOnce).to.equal(true)
  })
})
