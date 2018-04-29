const router = require('express').Router()
const {User, Story} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id/stories', (req, res, next) => {
  console.log("REQ.PARAMS", req.params)
  Story.findAll({where: {userId: 1}, include : [{all:true}]})
    .then(stories => res.json(stories))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findOne({where:{ id: req.params.id},
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(user => res.json(user))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.update({lastSubmit: new Date(), streak: user.streak + 1 }))
    .then(user => {
      console.log("User streak:", user.streak)
      res.json(user)}
    )
    .catch(next)
})

