const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('password missing')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://diana:${password}@cluster0.6ko6op9.mongodb.net/phonebookApp?appName=Cluster0`
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  // list mode
  console.log('phonebook:')

  Person
    .find({})
    .then(persons => {
      persons.forEach(person => console.log(`${person.name} ${person.number}`))
      mongoose.connection.close()
    })
} else {
  // add mode
  if (process.argv.length < 5) {
    console.log('name or number missing')
    process.exit(1)
  }

  const name = process.argv[3]
  const number = process.argv[4]

  new Person({ name, number })
    .save()
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })
}