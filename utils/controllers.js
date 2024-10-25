const mongoose = require('mongoose');
require('dotenv').config(); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String], default: [] }, 
});

const Person = mongoose.model('Person', personSchema);

const createPerson = (personData) => {
  const person = new Person(personData); 
  person.save((err, data) => {
    if (err) return console.error(err); 
    console.log('Person saved:', data); 
  });
};

createPerson({ name: 'Alice', age: 30, favoriteFoods: ['Pizza', 'Sushi'] });

const createMultiplePeople = (arrayOfPeople) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    console.log('Multiple people saved:', data);
  });
};

createMultiplePeople([
  { name: 'Bob', age: 25, favoriteFoods: ['Tacos'] },
  { name: 'Mary', age: 35, favoriteFoods: ['Pasta', 'Salad'] },
]);

const findPeopleByName = (name) => {
  Person.find({ name }, (err, data) => {
    if (err) return console.error(err);
    console.log('Found people:', data);
  });
};

findPeopleByName('Alice');

const findOneByFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    console.log('Found one person who likes:', food, data);
  });
};

findOneByFood('Pizza');

const findById = (personId) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    console.log('Found person by ID:', data);
  });
};

const somePersonId = '60d9c63c776d2202d8d4b35f';
findById(somePersonId);

const updateFavoriteFoodById = (personId, newFood) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push(newFood);
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      console.log('Updated person:', updatedPerson);
    });
  });
};

updateFavoriteFoodById(somePersonId, 'Hamburger');

const updateAgeByName = (personName, newAge) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: newAge },
    { new: true },
    (err, updatedPerson) => {
      if (err) return console.error(err);
      console.log('Updated person:', updatedPerson);
    }
  );
};

updateAgeByName('Alice', 20);

const deletePersonById = (personId) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    console.log('Removed person:', removedPerson);
  });
};

deletePersonById(somePersonId);

const deleteManyByName = (name) => { Person.remove({ name }, (err, result) => {
    if (err) return console.error(err);
    console.log('Removed people count:', result.deletedCount);
  });
};

deleteManyByName('Mary');

const findAndSortPeople = (food) => {
  Person.find({ favoriteFoods: food }).sort({ name: 1 }).limit(2) .select({ age: 0 }) .exec((err, data) => {
      if (err) return console.error(err);
      console.log('Found and sorted people:', data);
    });
};

findAndSortPeople('Tacos');
