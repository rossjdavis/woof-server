const express = require('express')
const http = require('http')
const sock_io = require('socket.io')

// const parser = require('body-parser')
// const cors = require('cors')

const router = require('./router')

const { Canine } = require('./db/schema.js')

const app = express()
app.use(router)
app.set('port', process.env.PORT || 3001)
// app.use(parser.json())
// app.use(cors())

const server = http.createServer(app)

const io = sock_io(server)

io.on('connection', socket => {})

// app.get('/api', (req, res) => {
//   res.json('Up & Running!')
// })
//
// app.get('/api/canines', (req, res) => {
//   Canine.find({})
//     .then(canines => {
//       res.json(canines)
//     })
//     .catch(e => {
//       res.status(500).json({ error: e })
//     })
// })

// app.listen(app.get('port'), () => {
//   console.log('Lisening on port ' + app.get('port'))
// })

server.listen(app.get('port'), () => {
  console.log('Listening on port ' + app.get('port'))
})
