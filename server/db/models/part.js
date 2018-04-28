const Sequelize = require('sequelize');
const db = require('../db');

const Part = db.define("part", {
  content: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  position: {
    type: Sequelize.ENUM("subject", "setting", "problem"),
    allowNull: false
  },
  category: Sequelize.ARRAY(Sequelize.STRING)
})

module.exports = Part;
