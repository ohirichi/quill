const router = require('express').Router()
const {Prompt, Part} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  const subjects = Part.findAll({where:{position:"subject"}})
  const settings = Part.findAll({where:{position:"setting"}})
  const problems = Part.findAll({where:{position:"problem"}})
  Promise.all([subjects, settings, problems])
    .then((arr) => {
      const subject = arr[0][Math.floor(Math.random() * arr[0].length)].content
      const setting = arr[1][Math.floor(Math.random()* arr[1].length)].content
      const problem = arr[2][Math.floor(Math.random() * arr[2].length)].content
      let response = `Write the story that incorporates the following: ${subject}, ${setting} and ${problem}. `
      return response
    })
    .then(response => {
      return Prompt.findOrCreate({where: {content: response}})
    })
    .then(arr => {
      res.json(arr[0])
    })
    .catch(err => console.log("error making the prompt:", err))




})
