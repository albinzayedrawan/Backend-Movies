const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Movie = require("./movieModel"); // Keep this as it is

const app = express();
const PORT = 3000;

app.use(express.json());

// Connect to MongoDB using your own url
const mongoURI = "INSERT_YOUR_MONGODB_URL_HERE";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Movie List</title>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                padding: 20px;
            }
            h1 {
                color: #2E7D32; /* Green color for the title */
            }
            .movie {
                background-color: white;
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 10px;
                margin: 10px 0;
            }
        </style>
    </head>
    <body>
        <h1>Movie List</h1>
        <div id="movieContainer"></div>

        <script>
            // Function to fetch and display movies
            async function fetchMovies() {
                try {
                    const response = await axios.get('http://localhost:3000/api/movies');
                    const movies = response.data;

                    const movieContainer = document.getElementById('movieContainer');
                    movieContainer.innerHTML = ''; // Clear the container

                    movies.forEach(movie => {
                        const movieDiv = document.createElement('div');
                        movieDiv.classList.add('movie');
                        movieDiv.innerHTML = \`
                            <h3>\${movie.title} (\${movie.year})</h3>
                            <p>\${movie.fullplot}</p>
                            <img src="\${movie.poster}" alt="\${movie.title}" style="width: 100px;">
                        \`;
                        movieContainer.appendChild(movieDiv);
                    });
                } catch (error) {
                    console.error('Error fetching movies:', error.message);
                }
            }

            // Fetch movies when the page loads
            window.onload = fetchMovies;
        </script>
    </body>
    </html>
  `);
});

app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find().limit(5); // Limit to 5 movies
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/movies", async (req, res) => {
  const { title, year, fullplot, poster } = req.body;

  const newMovie = new Movie({
    title,
    year,
    fullplot,
    poster,
  });

  try {
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/movies/:id", async (req, res) => {
  const { title, year, fullplot, poster } = req.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, year, fullplot, poster },
      { new: true } // Return the updated movie
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/movies/:id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});