const ErrorResponse = require('../responses/ErrorResponse')
const WroteResponse = require('../responses/WroteResponse')
const ErrorBadRequest = require('../responses/ErrorBadRequest')
const ValidationError = require('../../../DataStore/validator/ValidationError')

function getRecipe (req, res) {
  let { recipes } = req.app.locals
  let { recipeId } = req.params
  let { rating } = req.body
  if (!rating) { return res.status(400).send(ErrorBadRequest()) }
  if (rating < 1) { return res.status(400).send(ValidationError('{rating: must not be smaller than 1}')) }
  if (rating > 5) { return res.status(400).send(ValidationError('{rating: must not be bigger than 5}')) }

  recipes.update({ id: +recipeId }, { $push: { rating } }, (err, result) => {
    if (err) { res.status(500).send(ErrorResponse(err)) }
    res.json(WroteResponse())
  })
}

module.exports = getRecipe
