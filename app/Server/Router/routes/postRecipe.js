const ErrorResponse = require('../responses/ErrorResponse')
const ErrorValidationResponse = require('../responses/ErrorValidationResponse')
const ErrorBadRequest = require('../responses/ErrorBadRequest')
const WroteResponse = require('../responses/WroteResponse')
const ValidationError = require('../../../DataStore/validator/ValidationError')

function getRecipe (req, res) {
  let { recipes } = req.app.locals
  let { recipe } = req.body

  if (!recipe) { return res.status(400).send(ErrorBadRequest()) }

  recipes.add(recipe || {}, err => {
    if (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json(ErrorValidationResponse(err.message))
      }
      return res.status(500).json(ErrorResponse(err.message))
    }
    res.json(WroteResponse())
  })
}

module.exports = getRecipe
