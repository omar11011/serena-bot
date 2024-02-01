require('dotenv').config()

const app = require('./app')
const dbConnect = require('./dbConnect')
const saveSpawn = require('./data/functions/saveSpawn')

const port = 3000

try {
    app.listen(port, async () => {
        console.log(`Server on port ${port}.`)
        dbConnect()
        await saveSpawn()
    })
} catch (err) {
    console.error(err)
    process.exit(0)
}