const mongoose = require('./connection.js')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const CanineSchema = new Schema({
  name: String,
  breed: {
    one: String,
    two: String
  },
  age: {
    yr: Number,
    mo: Number
  },
  intro: String,
  image: String,
  human: { type: ObjectId, ref: 'Human' }
})

const HumanSchema = new Schema({
  name: String,
  username: String,
  password: String
})

// const VenueSchema = new Schema({
//   name: String,
//   address: String
// })

const EventSchema = new Schema({
  name: String,
  date: String,
  time: String
})

const ReviewSchema = new Schema({
  rating: Number,
  comment: String
})

const Canine = mongoose.model('Canine', CanineSchema)
const Human = mongoose.model('Human', HumanSchema)
// const Venue = mongoose.model('Venue', VenueSchema)
const Event = mongoose.model('Event', EventSchema)
const Review = mongoose.model('Review', ReviewSchema)

module.exports = {
  Canine,
  Human,
  Venue,
  Event,
  Review
}
