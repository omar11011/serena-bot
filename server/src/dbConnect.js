const mongoose = require('mongoose')

module.exports = () => {

  mongoose.set('strictQuery', true)
  mongoose.connect('mongodb://127.0.0.1:27017/serena', {})
    .then(() => {
      console.log('Conexión exitosa a MongoDB')
    })
    .catch((error) => {
      console.error('Error al conectar a MongoDB:', error.message)
    })

}