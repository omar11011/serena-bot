const fs = require('fs')
const path = require('path')

const models = {}

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const modelFile = require(path.join(__dirname, file))
    const modelName = modelFile.modelName
    models[modelName] = modelFile
  })

module.exports = models
