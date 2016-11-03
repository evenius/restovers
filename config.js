const path = require('path')

module.exports = {
  port: process.env.PORT || 3322,
  dataUri: path.resolve(__dirname, 'GoustoData.csv')
}
