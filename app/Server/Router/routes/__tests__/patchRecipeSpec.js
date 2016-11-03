const { expect } = require('chai')
const { mockRouteArgs, db } = require('../../routes/__tests__/_mockReqRes')

const { WORKING_DB, BROKEN_DB } = db()

const patchRecipe = require('../patchRecipe')

describe('Get recipe', function () {
  it('sends success when all is right', function () {
    let {req, res, next} = mockRouteArgs(WORKING_DB)
    req.body = {recipe: {title: 'true'}}

    patchRecipe(req, res, next)

    expect(req.app.locals.recipes.patch.calledOnce).to.equal(true)
    expect(res.json.calledOnce).to.equal(true)
  })
  it('sends 400 when data is _wrong_', function () {
    let {req, res, next} = mockRouteArgs()
    patchRecipe(req, res, next)

    expect(req.app.locals.recipes.patch.called).to.equal(false)
    expect(res.status.calledWith(400)).to.equal(true)
  })
  it('sends 500 when db is bad', function () {
    let {req, res, next} = mockRouteArgs(BROKEN_DB)
    req.body = {recipe: {title: 'true'}}
    patchRecipe(req, res, next)

    expect(res.status.calledWith(500)).to.equal(true)
  })
})
