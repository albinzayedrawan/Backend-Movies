// Added seed.js to easily seed the database with sample data for testing purposes

const mongoose = require('mongoose');
const Movie = require('./movieModel');

const mongoURI = "mongodb+srv://Rawan:123@lab01.eqyao.mongodb.net/?retryWrites=true&w=majority&appName=Lab01";

const seedData = [
  {
    title: 'The Matrix',
    year: 1999,
    fullplot: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    poster: 'https://example.com/matrix.jpg'
  },
  {
    title: 'The Shawshank Redemption',
    year: 1994,
    fullplot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    poster: 'https://example.com/shawshank.jpg'
  },
  {
    title: 'The Godfather',
    year: 1972,
    fullplot: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    poster: 'https://example.com/godfather.jpg'
  },
  {
    title: 'The Dark Knight',
    year: 2008,
    fullplot: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
    poster: 'https://example.com/darkknight.jpg'
  },
  {
    title: 'Pulp Fiction',
    year: 1994,
    fullplot: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    poster: 'https://example.com/pulpfiction.jpg'
  },
  {
    title: 'Forrest Gump',
    year: 1994,
    fullplot: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
    poster: 'https://example.com/forrestgump.jpg'
  },
  {
    title: 'Fight Club',
    year: 1999,
    fullplot: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
    poster: 'https://example.com/fightclub.jpg'
  },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
    fullplot: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
    poster: 'https://example.com/lotr.jpg'
  },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
    fullplot: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee, and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
    poster: 'https://example.com/starwars.jpg'
  },
  {
    title: 'The Lion King',
    year: 1994,
    fullplot: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    poster: 'https://example.com/lionking.jpg'
  }
];

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('MongoDB connected');
    await Movie.deleteMany({}); // Clear existing data
    await Movie.insertMany(seedData); // Insert seed data
    console.log('Database seeded successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });