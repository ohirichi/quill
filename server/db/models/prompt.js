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

