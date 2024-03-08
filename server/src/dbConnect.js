const mongoose = require('mongoose')
const insertData = require('./data/functions/insertData')

module.exports = () => {

  mongoose.set('strictQuery', true)
  mongoose.connect('mongodb://127.0.0.1:27017/serena', {})
    .then(async () => {
      console.log('Conexión exitosa a MongoDB')
      await insertData()
    })
    .catch((error) => {
      console.error('Error al conectar a MongoDB:', error.message)
    })

}