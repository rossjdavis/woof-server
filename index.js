const express = require('express')
const http = require('http')
const SocketIo = require('socket.io')
const jwt = require('socket-io-jwt')

const { Canine } = require('./db/schema')
const { Human } = requie('./db/schema')

const app = express()
app.set('port', process.env.PORT || 3001)

app.get('/', (req, res) => {
  res.status(200).send({ response: 'Welcome Human' })
})

const REFRESH = 'REFRESH'
const REMOVE_CANINE = 'REMOVE_CANINE'
const CREATE_CANINE = 'CREATE_CANINE'

const server = http.createServer(app)

const io = SocketIo(server)

io.use(
  jwt.authenticate(
    {
      secret: 'kobe-face'
    },
    (payload, cb) => {
      if (payload && payload.sub) {
        Human.findOne({ _id: payload.sub })
          .then(human => {
            return !human ? cb(null, false, 'Invalid Human') : cb(null, human)
          })
          .catch(e => {
            return cb(e)
          })
      } else {
        return cb()
      }
    }
  )
)

io.on('connection', socket => {
  socket.on(REFRESH, payload => {
    Canine.find({})
      .then(canines => {
        console.log('show doggies')
        socket.emit(REFRESH, canines)
      })
      .catch(e => {
        socket.emit('error', e)
      })
  })

  socket.on(CREATE_CANINE, payload => {
    Canine.create(payload)
      .then(canine => {
        console.log('create ' + payload)
        socket.emit(CREATE_CANINE, canine)
        socket.broadcast.emit(CREATE_CANINE, canine)
      })
      .catch(e => {
        socket.emit('error', e)
      })
  })

  socket.on(REMOVE_CANINE, payload => {
    Canine.findOneAndRemove({ _id: payload })
      .then(canine => {
        console.log('remove ' + payload)
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
