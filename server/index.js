const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const server = createServer(app)
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
    })
    await socket.emitWithAck('message',"Please set your prices to receive the alerts")
})
server.listen(port, () => {
    console.log(`App is listening on the port:${port}`)
})