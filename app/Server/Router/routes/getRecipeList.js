const pick = require('lodash.pick')

const generateURL = require('../helpers/urlGenerator')

const ErrorResponse = require('../responses/ErrorResponse')
const FoundResponse = require('../responses/FoundResponse')

function getRecipeList (req, res) {
  let { recipes } = req.app.locals
  let filterableProperties = Object.keys(recipes.schema)

  let from = +req.query.from || 0
  let limit = +req.query.limit || 2

  // Filters whitelisted, but ultimately kinda stupid
  let query = pick(req.query, filterableProperties)
  recipes.find(query, { _id: 0 }).sort({id: 1}).skip(from).limit(limit).exec((err, list) => {
    if (err) { return res.status(500).send(ErrorResponse(err)) }
    let response = {data: {recipes: list}}

    response.nextPage = generateURL(req, {from: from + limit})
    if (from - limit >= 0) {
      response.prevPage = generateURL(req, {from: from - limit})
    }

    res.json(FoundResponse(response))
  }

  )
}

module.exports = getRecipeList
