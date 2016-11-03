const { expect } = require('chai')

const proxyquire = require('proxyquire')
const dbStub = require('./_dbStub')()
const saverStub = require('./_saverStub')

describe('DataStorer', function () {
  before(function () {
    this.DataStore = proxyquire('../', { 'nedb': dbStub.DB, './saver': saverStub.Saver })
  })
  it('has a proper setup', function () {
    let DataStore = new this.DataStore({}, [])

    DataStore.data
    expect(dbStub.insert.calledOnce).to.equal(true)
  })
  it('can call the right things when patching', function () {
    let ds = new this.DataStore({}, [])
    ds.patch(1, {}, () => {})

    expect(saverStub.update.calledOnce).to.equal(true)
  })
  it('can call the right things when inserting', function () {
    let ds = new this.DataStore({}, [])
    ds.add({}, () => {})

    expect(saverStub.insert.calledOnce).to.equal(true)
  })
})
