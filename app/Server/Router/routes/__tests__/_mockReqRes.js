
const { spy, stub } = require('sinon')

const db = require('../../../../DataStore/__tests__/_dbStub')

// If dbState is not set, I'm not even going to bother setting it
const mockReq = (db) => ({
  app: { locals: {
    recipes: (db !== undefined ? new db.DB() : null),
    config: {}
  } },
  body: {},
  params: {note: 'slug'},
  query: {},
  get: stub()
})

const mockRes = () => {
  // Prevents it setting the stub every. Single. Time.
  let statusStub = stub()

  return {
    set: spy(),
    send: spy(),
    json: spy(),
    render: spy(),
    redirect: spy(),
    get status () {
      return statusStub.returns(this)
    }
  }
}

function mockRouteArgs (dbState) {
  let dbMock = db(dbState)
  return {
    req: mockReq(dbMock),
    res: mockRes(),
    next: spy()
  }
}

module.exports = {
  db,
  mockRouteArgs
}
