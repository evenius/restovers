const Server = require('./Server')
const DataStore = require('./DataStore')
const RecipeSchema = require('./DataStore/models/Recipe')

const bootServer = function (config, recipeData) {
  let { port } = config // There is no _need_ to destructure, except legibility

  const recipes = new DataStore(recipeData, RecipeSchema)
  return new Server({port, recipes})
}

module.exports = { bootServer }
