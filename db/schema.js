const mongoose = require('./connection.js')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const bcrypt = require('bcrypt')

const CanineSchema = new Schema({
  name: String,
  born: String,
  intro: String,
  image: String,
  user: { type: ObjectId, ref: 'User' }
})

const UserSchema = new Schema({
  name: String,
  email: String,
  pw: String,
  pwConf: String
})

// UserSchema.pre('save', next => {
//   let user = this
//   bcrypt.hash(user.pw, 10, (e, hash) => {
//     if (e) {
//       return next(e)
//     }
//     user.pw = hash
//     next()
//   })
// })

const SessionSchema = new Schema({
  user: String,
  token: String
})

// const VenueSchema = new Schema({
//   name: String,
//   address: String
// })

// const EventSchema = new Schema({
//   name: String,
//   date: String,
//   time: String
// })

// const ReviewSchema = new Schema({
//   rating: Number,
//   comment: String
// })

// const MsgSchema = new Schema({
//   author: { type: ObjectId, ref: 'Human' },
//   recipient: { type: ObjectId, ref: 'Human' },
//   text: String
// })

const Canine = mongoose.model('Canine', CanineSchema)
const User = mongoose.model('User', UserSchema)
// const Session = mongoose.model('Session', SessionSchema)
// const Venue = mongoose.model('Venue', VenueSchema)
// const Event = mongoose.model('Event', EventSchema)
// const Review = mongoose.model('Review', ReviewSchema)
// const Msg = mongoose.model('Msg', MsgSchema)

module.exports = {
  Canine,
  User
  // Session
  // Venue,
  // Event,
  // Review
  // Msg
}
