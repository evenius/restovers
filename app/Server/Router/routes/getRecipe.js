const ErrorResponse = require('../responses/ErrorResponse')
const FoundResponse = require('../responses/FoundResponse')

function getRecipe (req, res) {
  let { recipes } = req.app.locals
  let { recipeId, recipeSlug } = req.params
  let query = (recipeId ? { id: +recipeId } : { slug: recipeSlug })
  recipes.findOne(query, { _id: 0 }, (err, recipe) => {
    if (err) { return res.status(500).send(ErrorResponse(err)) }
    let response = {
      data: { recipe }
    }
    res.json(FoundResponse(response))
  })
}

module.exports = getRecipe
