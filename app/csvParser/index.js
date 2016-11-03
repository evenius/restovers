const fs = require('fs')
const parseCsv = require('csv-parse')

function parseFromFile (pathToFile) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathToFile, 'utf8', (err, data) => {
      if (err) { reject(err) }
      parseCsv(data, {columns: true, auto_parse: true}, (err, data) => {
        if (err) { reject(err) } else { resolve(data) }
      })
    })
  })
}

module.exports = parseFromFile
