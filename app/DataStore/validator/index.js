const ValidationError = require('./ValidationError')

const validator = require('validate.js')
validator.validators.iterator = (val) => (!val || Array.isArray(val) ? null : 'Is not an iterator')

const { clone } = require('fast.js')
const objFilter = require('fast.js/object/filter')

function validate (data, schema, store) {
  let _data = clone(data)
  let _schema = clone(schema)
  for (let dataKey in _schema) {
    if (_schema.hasOwnProperty(dataKey)) {
      let val = _schema[dataKey]
      if (val.defaultVal) {
        _data = setDefaultData(_data, dataKey, val.defaultVal)
      }
      if (val.unique) {
        _data = setUniqueKey(_data, dataKey, store)
      }
      _schema[dataKey] = removeNonValidators(val)
    }
  }
  let errors = validator(_data, _schema)
  return {
    adjustedData: _data,
    errors: (errors ? new ValidationError(errors) : null)
  }
}

function setDefaultData (data, key, defaultVal) {
  if (data[key]) { return data }
  let _data = clone(data)
  _data[key] = (typeof defaultVal === 'function' ? defaultVal(data) : defaultVal)
  return _data
}

function setUniqueKey (data, key, store) {
  // Only incrementing index implemented here
  let _data = clone(data)

  let currentMax = (store.length ? store.reduce((prev, cur) => {
    return (prev < cur.id ? cur.id : prev)
  }, 0) : 0)

  _data[key] = ++currentMax
  return _data
}

function removeNonValidators (partialSchema) {
  // A blacklist will make sure that I won't accidentally swallow errors
  let nonValidators = ['unique', 'defaultVal']
  return objFilter(partialSchema, (obj, key) => nonValidators.indexOf(key) === -1)
}

module.exports = {
  setDefaultData,
  setUniqueKey,
  removeNonValidators,
  validate
}
