const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')

const data = require('./fetchdata')
app.use(cors())
app.get('/getcoins', (req, res) => {
    data().then((response) => res.send(response))
})

app.listen(port, () => {
    console.log(`App is listening on the port:${port}`)
})