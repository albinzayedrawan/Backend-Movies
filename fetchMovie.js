const axios = require('axios');

// Replace with the actual movie ID you want to fetch
const movieId = '671a8124e911b085560f9c91';
getMovieById(movieId);

// Function to fetch a movie by ID
// Add a parameter (argument) to this function such that it processes movieId
async function getMovieById(movieId) {
  try {
    const response = await axios.get(`http://localhost:3000/api/movies/${movieId}`);

    if (response.status === 200) {
      const movie = response.data;
      console.log(`Movie Details:`);
      console.log(`Title: ${movie.title}`);
      console.log(`Year: ${movie.year}`);
      console.log(`Full Plot: ${movie.fullplot}`);
      console.log(`Poster: ${movie.poster}`);
    } else {
      console.error(`Failed to fetch movie. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching movie:', error.message);
  }
}