const router = require('express').Router()
const {Prompt} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Prompt.newPrompt()
    .then(prompt => res.json(prompt))
    .catch(next)
})
