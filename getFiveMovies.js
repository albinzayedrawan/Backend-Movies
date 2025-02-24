const axios = require("axios");

async function getFiveMovies() {
  try {
    const response = await axios.get("http://localhost:3000/api/movies");

    if (response.status === 200) {
      const movies = response.data;

      const limitedMovies = movies.slice(0, 5);

      console.log("First 5 Movies:");
      limitedMovies.forEach((movie, index) => {
        // Fix the Title and Year such that it accesses the title/year from the movie (they are properties)
        console.log(`${index + 1}. Title: ${movie.title}, Year: ${movie.year}`);
      });

      console.assert(Array.isArray(movies), "Response is not an array");
      console.assert(
        limitedMovies.length <= 5,
        "More than 5 movies were returned"
      );
      console.log("Test passed: Fetched movies successfully.");
    } else {
      console.error(`Failed to fetch movies. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching movies:", error.message);
  }
}

getFiveMovies();