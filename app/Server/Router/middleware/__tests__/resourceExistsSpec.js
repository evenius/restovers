const { expect } = require('chai')

const { mockRouteArgs, db } = require('../../routes/__tests__/_mockReqRes')
let { WORKING_DB, EMPTY_DB } = db()

const resourceExists = require('../resourceExists')

describe('Resource exists middleware', function () {
  it('calls next if the store finds a recipe in store', function () {
    let {req, res, next} = mockRouteArgs(WORKING_DB)
    resourceExists(req, res, next)
    expect(next.calledOnce).to.equal(true)
  })
  it('sends out a 404 if there\'s no recipe to find', function () {
    let {req, res, next} = mockRouteArgs(EMPTY_DB)
    resourceExists(req, res, next)
    expect(next.called).to.equal(false)
    expect(res.status.calledWith(404)).to.equal(true)
    expect(res.json.calledOnce).to.equal(true)
  })
})
