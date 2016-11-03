const bodyParser = require('body-parser')
const { partial } = require('fast.js')
const express = require('express')

const { bindRoutes } = require('./Router')

class Server {
  constructor (config) {
    let app = express()

    // Insert the recipe object
    app.locals.recipes = config.recipes

    // Support JSON-body
    app.use(bodyParser.json()) // Express is... very mutable

    // Bind all the routes
    app.use(bindRoutes())
    this.config = config
    this.app = app
  }

  listen (callback) {
    let { port } = this.config
    this.app.listen(port, partial(callback, port))
  }
}

module.exports = Server
