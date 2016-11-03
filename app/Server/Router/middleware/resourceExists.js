const errorNotFoundResponse = require('../responses/ErrorNotFoundResponse')

module.exports = function (req, res, next) {
  let { recipes } = req.app.locals
  let { recipeId, recipeSlug } = req.params
  let query = (recipeId ? { id: +recipeId } : { slug: recipeSlug })

  recipes.count(query, function (err, count) {
    if (!err && count) { return next() }
    res.status(404).json(errorNotFoundResponse())
  })
}
