const fs = require('fs')
const path = require('path')

const models = {}

fs.readdirSync(__dirname)
  .filter(db => db !== 'index.js')
  .forEach(db => {
    fs.readdirSync(path.join(__dirname, db)).forEach(table => {
      const modelFile = require(path.join(__dirname, db, table))
      const modelName = modelFile.modelName
      models[modelName] = modelFile
    })
  })

module.exports = models
