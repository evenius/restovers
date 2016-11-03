const { expect } = require('chai')

const { mockRouteArgs, db } = require('../../routes/__tests__/_mockReqRes')
const { WORKING_DB, BROKEN_DB } = db()

const getRecipeList = require('../getRecipeList')

describe('GetRecipeList', function () {
  it('calls the db and sends success response', function () {
    let {req, res, next} = mockRouteArgs(WORKING_DB)
    getRecipeList(req, res, next)

    // And it does the _whole_ chain
    expect(req.app.locals.recipes.find.calledOnce).to.equal(true)
    expect(req.app.locals.recipes.skip.calledOnce).to.equal(true)
    expect(req.app.locals.recipes.sort.calledOnce).to.equal(true)
    expect(req.app.locals.recipes.limit.calledOnce).to.equal(true)
    expect(res.send.calledOnce).to.equal(true)
  })
  it('calls the db and sends error response', function () {
    let {req, res, next} = mockRouteArgs(BROKEN_DB)
    getRecipeList(req, res, next)

    expect(res.status.calledOnce).to.equal(true)
  })
})
