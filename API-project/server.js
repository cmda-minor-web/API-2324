import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

// Create an Express application
const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static')); // Serve static files from the 'public' directory
app.set('view engine', 'ejs');

async function fetchMultipleUrls(api_token) {
  const url1 = `https://api.themoviedb.org/3/discover/movie?api_key=${api_token}&language=nl-NL&with_genres=28`;
  const url2 = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_token}&language=nl-NL`;

  // Fetch data from both URLs concurrently
  const [data1, data2] = await Promise.all([
    fetch(url1).then(response => response.json()),
    fetch(url2).then(response => response.json()),
  ]);
  
  return { movies: data1.results, trendingMovies: data2.results }; // Return an object containing both sets of data
}

async function fetchMovieDetails(movieId) {
  const apiKey = process.env.API_TOKEN;
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=nl-NL`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Routes
app.get("/", async (req, res) => {
  try {
    const { movies, trendingMovies } = await fetchMultipleUrls(process.env.API_TOKEN);
    console.log(movies)
    res.render('pages/index', {movies, trendingMovies});
  } catch (error) {
    console.error('Fetching movies failed:', error);
    res.status(500).send('Failed to fetch movies');
  }
});

// Detailpagina route
app.get("/movie/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieData = await fetchMovieDetails(movieId);
    res.render('pages/movie_detail', { movie: movieData });
  } catch (error) {
    console.error('Fetching movie details failed:', error);
    res.status(500).send('Failed to fetch movie details');
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});