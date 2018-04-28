/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Story, Prompt, Part} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({name: "cody", email: 'cody@email.com', password: '123'}),
    User.create({name: "murphy", email: 'murphy@email.com', password: '123'}),
    User.create({name: "amy", email: 'amy@email.com', password: '123'})
  ])

  const parts = await Promise.all([
    Part.create({content: "a 40 year old woman", position: "subject"}),
    Part.create({content: "a cheerful elf", position: "subject"}),
    Part.create({content: "an elephant that can shrink at will", position: "subject"}),
    Part.create({content: "the 1820s", position: "setting"}),
    Part.create({content: "a planet with no natural gravity", position: "setting"}),
    Part.create({content: "a bright blue sea", position: "setting"}),
    Part.create({content: "finding a secret letter", position: "problem"}),
    Part.create({content: "the desire to find inner peace", position: "problem"}),
    Part.create({content: "a spy chase", position: "problem"})
  ])

  const prompts = await Promise.all([
    Prompt.create({content: "Write a story that incorporates the following: a 40 year old woman, the 1820s and finding a secret letter"}),
    Prompt.create({content: "Write a story that incorporates the following: a cheerful elf, a planet with no natural gravity and the desire to find inner peace"}),
    Prompt.create({content: "Write a story that incorporates the following: an elephant that can shrink at will, a bright blue sea and a spy chase"})
  ])

  const stories = await Promise.all([
    Story.create({content:"A story that is short and sweet", public: true, userId: 1, promptId: 1}),
    Story.create({content: "Another story that hits every aspect of the wonderful prompt", public: true, userId: 1, promptId: 2 }),
    Story.create({content: "Lorem ipsum", public: true, userId: 3, promptId: 3}),
    Story.create({content: "Lorem ipsum", userId: 2, promptId: 3}),
    Story.create({content: "Lorem ipsum another time", public: true, userId: 1, promptId: 3})

  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${stories.length} stories`)
  console.log(`seeded ${prompts.length} prompts`)
  console.log(`seeded ${parts.length} parts`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
