require('dotenv').config()

const app = require('./app')
const dbConnect = require('./dbConnect')
const loadData = require("./data/functions/chargeData")

const port = 3000

try {
    app.listen(port, async () => {
        console.log(`Server on port ${port}.`)
        dbConnect()
        loadData("Movement")
    })
} catch (err) {
    console.error(err)
    process.exit(0)
}