// const Immutable = require('immutable')
const Store = require('nedb')
const Saver = require('./saver')

class DataStore extends Store {
  constructor (data, schema) {
    super({autoload: true})

    this.saver = new Saver(this, schema)
    this.schema = schema

    this.insert(data, () => {})
  }

  patch (id, patch, callback) {
    this.saver.update({id: +id}, {$set: patch}, callback)
  }

  add (data, callback) {
    this.saver.insert(data, (err, data) => {
      if (err) { return callback(err) }
      this.data = data
      callback()
    })
  }
}

module.exports = DataStore
