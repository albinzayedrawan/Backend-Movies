
// don't change this file

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  fullplot: String,
  poster: String,
});

// Set the collection name to 'movies' explicitly
const Movie = mongoose.model('Movie', movieSchema, 'movies');

module.exports = Movie;
