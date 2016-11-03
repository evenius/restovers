const { stub } = require('sinon')

const INVALID = 'INVALID'
const VALID = 'VALID'

module.exports = {
  VALID,
  INVALID,
  validator: (isValid) => {
    return {
      validate: (
        isValid === VALID
          ? stub().yields({adjustedData: {}, errors: null})
          : stub().yields({adjustedData: {}, errors: {}})
      )
    }
  }
}
// stub().yields(null, new Buffer(fakeCsv))
