const router = require('express').Router()
const {Story} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Story.findAll({where: {public: true}})
    .then(stories => res.json(stories))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Story.create(req.body)
    .then(story => res.json(story))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Story.findById(req.params.id)
    .then(story => res.json(story))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Story.update(req.body, {where: {id: req.params.id}})
    .then(story => res.json(story))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Story.destroy({ where: {id: req.params.id}})
    .then(() => res.sendStatus(204))
    .catch(next)
})
