const figlet = require('figlet')

module.exports = msg => {

    figlet(msg, (err, data) => {
        if(err) return console.error('Ocurrió el siguiente error: ' + err)
        
        console.log(data)
    })

}