const ErrorResponse = require('../responses/ErrorResponse')
const ErrorBadRequest = require('../responses/ErrorBadRequest')
const WroteResponse = require('../responses/WroteResponse')

function patchRecipe (req, res) {
  let { recipes } = req.app.locals
  let { recipeId } = req.params
  let { recipe: patch } = req.body

  if (!patch) { return res.status(400).send(ErrorBadRequest()) }

  recipes.patch(recipeId, patch, (err, done) => {
    if (err) { return res.status(500).send(ErrorResponse(err)) }
    res.json(WroteResponse())
  })
}

module.exports = patchRecipe
