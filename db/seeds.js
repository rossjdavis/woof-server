const { Canine, User, Session } = require('./schema.js')
const seedData = require('./seeds-data.json')

Canine.remove({}).then(() => {
  seedData.forEach(data => {
    Canine.create(data)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  })
})

User.remove({})
