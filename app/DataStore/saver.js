const { validate } = require('./validator')
const objFilter = require('fast.js/object/filter')

class Saver {
  constructor (store, schema) {
    this.store = store
    this.schema = schema
  }

  insert (data, callback) {
    let { adjustedData, errors } = validate(data, this.schema, this.store)
    if (errors) {
      return callback(errors)
    }
    this.store.insert(adjustedData, callback)
  }

  update (query, patch, callback) {
    let patchKeys = Object.keys(patch)
    let partialSchema = objFilter(this.schema, (obj, key) => (patchKeys.indexOf(key) !== -1))
    let { errors } = validate(patch, partialSchema, this.store)
    if (errors) {
      return callback(errors)
    }
    this.store.update(query, patch, callback)
  }
}

module.exports = Saver
