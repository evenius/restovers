const { Router } = require('express')

const isIntegerExpression = '\\d+'
const isSlugExpression = '[a-z0-9-]+'

function bindRoutes () {
  let routes = Router()

  routes.use('/v1/recipes/', generateRecipeRoutes())
  routes.use('/recipes/', generateRecipeRoutes())

  return routes
}

function generateRecipeRoutes () {
  let recipeRouter = Router()
  // Recipe listing
  recipeRouter.get('/', require('./routes/getRecipeList'))
  recipeRouter.post('/', require('./routes/postRecipe'))

  // Manipulating and displaying one recipe

  recipeRouter.use(`/:recipeId(${isIntegerExpression})`, generateIdRoutes())
  recipeRouter.use(`/:recipeSlug(${isSlugExpression})`, generateIdRoutes())
  recipeRouter.get

  return recipeRouter
}

function generateIdRoutes () {
  let idRouter = Router({ mergeParams: true })
  // 404 middleware
  idRouter.use('/', require('./middleWare/resourceExists'))

  // Routes
  idRouter.get('/', require('./routes/getRecipe'))
  idRouter.patch('/', require('./routes/patchRecipe'))

  // Recipe-ratings
  idRouter.post('/ratings', require('./routes/postRecipeRating'))

  return idRouter
}

module.exports = { bindRoutes }
