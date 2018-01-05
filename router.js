const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res
    .send({ response: 'Welcome Human' })
    .status(200)
    // Canine.find({})
    //   .then(canines => {
    //     res.status(200).send({ response: 'Welcome Human' })
    //   })
    .catch(e => {
      res.status(500).send({ error: e })
    })
})

module.exports = router
