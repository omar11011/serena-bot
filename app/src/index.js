require("dotenv").config()

const Client = require('./class/Client')
const Commands = require('./commands')
const Events = require('./events')
const Data = require('./data')

Events(Client)
Commands(Client)
Data()

Client.login(process.env.BOT_TOKEN)