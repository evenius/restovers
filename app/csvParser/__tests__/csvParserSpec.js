const proxyquire = require('proxyquire')
const { assert, expect } = require('chai')

const {
  fs,
  FIND_CSV,
  FIND_SOMETHING_ELSE,
  BROKEN
} = require('./_fsStub')

describe('Csv parser', function () {
  it('can parse a correct csv, black-box style', function () {
    let _fs = fs(FIND_CSV)
    let csvParser = proxyquire('../', { 'fs': _fs })

    csvParser('/whatever.csv')
      .then((data) => {
        expect(data).to.be.an('array')
      })
      .catch((err) => assert.fail(err, null, 'Should not throw error'))
  })
  it('can reject an incorrect csv, black-box style', function () {
    let _fs = fs(BROKEN)
    let csvParser = proxyquire('../', { 'fs': _fs })

    csvParser('/corrupt_or_whatever.txt')
      .then((err) => assert.fail(err, null, 'FS failing should not resolve'))
      .catch((err) => {
        assert(err)
      })
  })
  it('can handle fs breaking down (by breaking down)', function () {
    let _fs = fs(FIND_SOMETHING_ELSE)
    let csvParser = proxyquire('../', { 'fs': _fs })

    csvParser('/not_an_csv_file.gif')
      .then((err) => assert.fail(err, null, 'Trying to parse not CSV-files should not resolve'))
      .catch((err) => {
        assert(err instanceof Error)
      })
  })
})
