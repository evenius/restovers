const { expect } = require('chai')

const { mockRouteArgs, db } = require('../../routes/__tests__/_mockReqRes')
const { WORKING_DB, BROKEN_DB } = db()

const getRecipe = require('../getRecipe')

describe('Get recipe', function () {
  it('calls the db and sends success response', function () {
    let {req, res, next} = mockRouteArgs(WORKING_DB)
    getRecipe(req, res, next)
    expect(req.app.locals.recipes.findOne.calledOnce).to.equal(true)
    expect(res.json.calledOnce).to.equal(true)
  })
  it('calls the db and sends error response', function () {
    let {req, res, next} = mockRouteArgs(BROKEN_DB)
    getRecipe(req, res, next)

    expect(res.status.calledOnce).to.equal(true)
  })
})
