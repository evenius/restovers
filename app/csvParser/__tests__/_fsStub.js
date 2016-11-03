const { stub } = require('sinon')

const FIND_CSV = 'FIND_CSV'
const FIND_SOMETHING_ELSE = 'FIND_SOMETHING_ELSE'

const fakeCsv = `head,heap,hear,num
hey,hex,hen,3
hay,hax,hun,4`

const BROKEN = 'BROKEN'

const fs = function (mode) {
  switch (mode) {
    case FIND_CSV:
      return {
        readFile: stub().yields(null, new Buffer(fakeCsv))
      }
    case FIND_SOMETHING_ELSE:
      return {
        readFile: stub().yields(null, new Buffer('goobagabba'))
      }
    case BROKEN:
      return {
        readFile: stub().yields(new Error('darn'))
      }
  }
}

module.exports = {
  fs,
  FIND_CSV,
  FIND_SOMETHING_ELSE,
  BROKEN
}
