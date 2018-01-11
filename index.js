const express = require('express')
const http = require('http')
const ioServer = require('socket.io')
// const jwt = require('socketio-jwt')

const { Canine, User } = require('./db/schema.js')

const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REFRESH,
  CREATE_CANINE,
  REMOVE_CANINE
} = require('./src/constants.js')

const app = express()

app.set('port', process.env.PORT || 3001)

app.get('/', (req, res) => {
  res.status(200).send({ response: 'Welcome Human' })
})

const server = http.createServer(app)

const io = ioServer(server)

io.on('connection', socket => {
  Canine.find({})
    .then(canines => {
      console.log('show doggies')
      socket.emit(REFRESH, canines)
    })
    .catch(e => {
      socket.emit('error', e)
    })

  // socket.on(LOGIN_REQUEST, payload => {
  //   if (payload.name === 'ross') {
  //     jwt.authorize({
  //       secret: 'kobe-face',
  //       timeout: 15000
  //     })
  //   }
  // })

  // socket.on(LOGIN_REQUEST, payload => {
  //   console.log(payload)
  //   if (payload.name === 'ross')
  //     bcrypt.hash(payload.name, 5, (e, hash) => {
  //       if (e) {
  //         return e
  //       }
  //       Session.create({ user: payload.name, token: hash })
  //         .then(() => {
  //           socket.emit(SET_SESSION, hash)
  //         })
  //         .catch(e => {
  //           socket.emit('error', e)
  //         })
  //     })
  // })

  socket.on(LOGIN_REQUEST, payload => {
    console.log('login request from ' + { payload })
    socket.emit(LOGIN_SUCCESS, payload.name)
  })

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
