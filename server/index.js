const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const server = createServer(app)
const { createClient } = require('redis')
require('dotenv').config()

// connect to redis
const client = createClient({
    password: process.env.PASSWORD,
    socket: {
        host: process.env.HOST,
        port: process.env.PORT
    }
})
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
})

const data = require('./fetchdata')

app.use(cors())
app.get('/getcoins', async (req, res) => {
    // check the redis store for data first
    try {
        const value = await client.get('data')
        if (value) {
            const response = await JSON.parse(value)
            res.send(response)
        }
        else {
            data().then((response) => {
                client.set('data', JSON.stringify(response), { EX: 300 })
                res.send(response)
            })

        }
    }
    catch (err) {
        console.log(err)
    }

})

// emits events
io.on('connection', async (socket) => {
    await socket.emitWithAck('message', "New updates")
})
server.listen(port, () => {
    console.log(`App is listening on the port:${port}`)
})
client.on('error', err => console.log('redis client error', err))
client.connect().then(() => {
    console.log('successfully connected to redis')
})