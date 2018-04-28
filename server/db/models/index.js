const User = require('./user')
const Story = require('./story')
const Prompt = require('./prompt')
const Part = require('./part')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 User.hasMany(Story)
 Story.belongsTo(User)

 Story.belongsTo(Prompt)
 Prompt.hasMany(Story)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Story,
  Prompt,
  Part
}
