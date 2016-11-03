const { bootServer } = require('./app/app')
const csvParse = require('./app/csvParser')
const config = require('./config')

csvParse(config.dataUri).then((recipeData) => {
  // Just start it up
  let server = bootServer(config, recipeData)

  server.listen((port) => { console.log(`Restovers can be found at http://localhost:${port}`) })
}).catch((err) => { throw err })
