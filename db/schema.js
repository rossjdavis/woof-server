const mongoose = require('./connection.js')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const CanineSchema = new Schema({
  name: String,
  born: String,
  intro: String,
  image: String,
  human: { type: ObjectId, ref: 'Human' }
})

const HumanSchema = new Schema({
  name: String,
  email: String,
  pword: String
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
const Human = mongoose.model('Human', HumanSchema)
// const Venue = mongoose.model('Venue', VenueSchema)
// const Event = mongoose.model('Event', EventSchema)
// const Review = mongoose.model('Review', ReviewSchema)
// const Msg = mongoose.model('Msg', MsgSchema)

module.exports = {
  Canine,
  Human
  // Venue,
  // Event,
  // Review
  // Msg
}
