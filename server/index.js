const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const server = createServer(app)
const { createClient } = require('redis')
const client = createClient({
    password: 'Q0iF0VLHoKVtj6G5pr9VVpucz8oHYy2B',
    socket: {
        host: 'redis-19211.c322.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 19211
    }
})
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
})

const data = require('./fetchdata')

app.use(cors())
app.get('/getcoins', (req, res) => {
    data().then((response) => res.send(response))
})

io.on('connection', async (socket) => {
    data().then((res) => {
        socket.emitWithAck('ack', res)
        // res.forEach(element => {
        //     if(element.price_change_percentage_24h!=)
        // });
    })
    await socket.emitWithAck('message', "Please set your prices to receive the alerts")
})
server.listen(port, () => {
    console.log(`App is listening on the port:${port}`)
})
client.on('error', err => console.log('redis client error', err))
client.connect()