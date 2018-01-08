const express = require('express')
const http = require('http')
const SocketIo = require('socket.io')

const { Canine } = require('./db/schema.js')

const app = express()
app.set('port', process.env.PORT || 3001)

app.get('/', (req, res) => {
  res.status(200).send({ response: 'Welcome Human' })
})

const LOAD_ALL_DOGS = 'LOAD_ALL_DOGS'
const REMOVE_CANINE = 'REMOVE_CANINE'
const CREATE_CANINE = 'CREATE_CANINE'

const server = http.createServer(app)

const io = SocketIo(server)

io.on('connection', socket => {
  console.log('connection')

  socket.on(LOAD_ALL_DOGS, payload => {
    Canine.find({})
      .then(canines => {
        console.log('show doggies')
        socket.emit(LOAD_ALL_DOGS, canines)
      })
      .catch(e => {
        socket.emit('error', e)
      })
  })

  socket.on(CREATE_CANINE, payload => {
    Canine.create({ payload })
      .then(canine => {
        console.log('create doggy')
        socket.broadcast.emit(CREATE_CANINE, canine)
      })
      .catch(e => {
        socket.emit('error', e)
      })
  })

  socket.on(REMOVE_CANINE, payload => {
    Canine.findOneAndRmove({ _id: payload })
      .then(canine => {
        console.log('remove doggy')
        socket.broadcast.emit(REMOVE_CANINE, canine)
      })
      .catch(e => {
        socket.emit('error', e)
      })
  })
})

server.listen(app.get('port'), () => {
  console.log('Listening on port ' + app.get('port'))
})
