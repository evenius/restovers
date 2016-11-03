const { stub } = require('sinon')
const { apply } = require('fast.js')

const WORKING_DB = 'WORKING_DB'
const BROKEN_DB = 'BROKEN_DB'
const EMPTY_DB = 'EMPTY_DB'

module.exports = (state) => {
  let resultYields = []
  let countYields = []

  if (state === WORKING_DB) {
    resultYields = [null, [1, 2, 3, 4]]
    countYields = [null, 1]
  } else if (state === EMPTY_DB) {
    resultYields = [null, []]
    countYields = [null, 0]
  } else if (state === BROKEN_DB) {
    countYields = resultYields = [new Error('darn'), null]
  }

  function dbStub (data) {
    this.schema = {}
  }

  // This weirdness is just for invoking the callback with an array
  let insertSpy = apply(stub().yields, stub(), resultYields)
  dbStub.prototype.insert = insertSpy

  let updateSpy = apply(stub().yields, stub(), resultYields)
  dbStub.prototype.update = updateSpy

  dbStub.prototype.add = apply(stub().yields, stub(), resultYields)
  dbStub.prototype.count = apply(stub().yields, stub(), countYields)
  dbStub.prototype.patch = apply(stub().yields, stub(), resultYields)
  dbStub.prototype.findOne = apply(stub().yields, stub(), resultYields)

  // This here is the 'find-chain'
  dbStub.prototype.sort = stub().returnsThis()
  dbStub.prototype.limit = stub().returnsThis()
  dbStub.prototype.skip = stub().returnsThis()

  dbStub.prototype.exec = stub().yields(resultYields)

  // Alternative syntax for more advances stubbing
  dbStub.prototype.find = function () {}
  stub(dbStub.prototype, 'find', function (...args) {
    for (let arg of args) {
      if (typeof arg === 'function') { arg(countYields); break }
    }
    return this
  })
  // dbStub.prototype.find = stub().yields(resultYields).returns(dbStub)

  return {
    DB: dbStub,
    insert: insertSpy,
    update: updateSpy,
    EMPTY_DB,
    BROKEN_DB,
    WORKING_DB
  }
}
