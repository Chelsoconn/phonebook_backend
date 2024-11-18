const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://chelseaaoconnor1:${password}@notes-app.tjoj8.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Notes-App`

mongoose.set('strictQuery',false)

mongoose.connect(url)

  
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
  
const Person = mongoose.model('person', personSchema)


if (process.argv.length === 3) {
  Person.find({})
    .then(result => {
      console.log('Phonebook:');
      result.forEach(per => {
        console.log(`${per.name} ${per.number}`);
      })
      mongoose.connection.close()
    })
    .catch(error => {
        console.error('Error fetching persons:', error.message);
        mongoose.connection.close();
      });
} else if (process.argv.length === 5) {
    // Add a new person
    const person1 = new Person({
      name: process.argv[3],
      number: process.argv[4],
    });
  
    person1
      .save()
      .then(() => {
        console.log(`Added ${person1.name} number ${person1.number} to phonebook`);
        mongoose.connection.close(); // Close connection after saving
      })
      .catch(error => {
        console.error('Error saving person:', error.message);
        mongoose.connection.close();
      });
  } else {
    console.log('Invalid number of arguments');
    mongoose.connection.close();
  }

