const querystring = require('querystring')
function generateURL (req, nextQuery) {
  nextQuery = Object.assign(req.query, nextQuery)
  return `${req.protocol}://${req.get('host')}${req.baseUrl}?${querystring.stringify(nextQuery)}`
}

module.exports = generateURL
