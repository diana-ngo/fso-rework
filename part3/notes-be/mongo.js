// Import Mongoose, an Object Document Mapper (ODM), which gives our Node application a convenient JavaScript-oriented interface for working with MongoDB
const mongoose = require('mongoose')

// Database user credentials let our application authenticate to the MongoDB database
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

// User enters the database user's password when running `node mongo.js [password]`
const password = process.argv[2]
const url = `mongodb+srv://diana:${password}@cluster0.6ko6op9.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
// Establishes a connection between our Node application, Mongoose, and MongoDB Atlas
mongoose.connect(url, { family: 4 })

// Application-level schema (Mongoose) - MongoDB is schemaless
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// Mongoose `Note` model maps to the MongoDB `notes` collection
const Note = mongoose.model('Note', noteSchema)

// Creates Mongoose document in Node memory
// const note = new Note({
//   content: 'HTML is Easy',
//   important: true,
// })

// Persists the Mongoose document to MongoDB `notes` collection
// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({ important: 'true' }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})