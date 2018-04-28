const Sequelize = require('sequelize');
const db = require('../db');

const Part = require('./part');

const Prompt = db.define("prompt", {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Prompt;

//class Method

Prompt.newPrompt = () =>{
  const subjects = Part.findAll({where:{position:"subject"}})
  const settings = Part.findAll({where:{position:"setting"}})
  const problems = Part.findAll({where:{position:"problem"}})
  const subject = subjects[Math.floor(Math.random() * subjects.length)]
  const setting = settings[Math.floor(Math.random()* settings.length)]
  const problem = problems[Math.floor(Math.random() * problems.length)]

  let response = `Write the story that incorporates the following: ${subject}, ${setting} and ${problem}. `
  const categories = [].concat(subject.category, setting.category, problem.category)

  return Prompt.findOrCreate({content: response, category: categories})
          .then(prompt => prompt)
}
