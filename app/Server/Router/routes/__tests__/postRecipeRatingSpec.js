const { expect } = require('chai')
const { mockRouteArgs, db } = require('../../routes/__tests__/_mockReqRes')

const { WORKING_DB, BROKEN_DB } = db()

const postRecipeRating = require('../postRecipeRating')

describe('Post recipe rating', function () {
  it('sends success when all is right', function () {
    let {req, res, next} = mockRouteArgs(WORKING_DB)
    req.body = {rating: 4}

    postRecipeRating(req, res, next)
    expect(req.app.locals.recipes.update.calledOnce).to.equal(true)
    expect(res.json.calledOnce).to.equal(true)
  })
  it('sends 400 when data is _wrong_', function () {
    let {req, res, next} = mockRouteArgs()
    postRecipeRating(req, res, next)

    expect(req.app.locals.recipes.update.called).to.equal(false)
    expect(res.status.calledWith(400)).to.equal(true)
  })
  it('sends 500 when db is bad', function () {
    let {req, res, next} = mockRouteArgs(BROKEN_DB)
    req.body = {rating: 4}
    postRecipeRating(req, res, next)

    expect(res.status.calledWith(500)).to.equal(true)
  })
})
