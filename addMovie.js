const axios = require('axios');

// Function to add a new movie
async function addNewMovie(newMovie) {
  try {
    // Add the port number
    const response = await axios.post('http://localhost:3000/api/movies', newMovie);

    // Check if the response is successful
    if (response.status === 201) {
      console.log('New Movie Added:');
      console.log(`Title: ${response.data.title}`);
      console.log(`Year: ${response.data.year}`);
      console.log(`Full Plot: ${response.data.fullplot}`);
      console.log(`Poster: ${response.data.poster}`);
    } else {
      console.error(`Failed to add movie. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error adding movie:', error.message);
  }
}

// Fill this with details of new movie
const newMovie = {
  title: 'Inception',
  year: 2010,
  fullplot: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
  poster: 'https://example.com/inception.jpg' // leave this as it is
};

addNewMovie(newMovie);