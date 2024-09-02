import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieList({ onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_MOVIE_API_URL}/movies`);
        setMovies(response.data.movies);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    // Cleanup function to avoid updating state if the component unmounts
    return () => {
      setMovies([]);
      setLoading(false);
      setError(null);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching movies: {error.message}</p>;

  return (
    <ul>
      {movies.map((movie) => (
        <li
          className="movieItem"
          key={movie.id}
          onClick={() => onMovieClick(movie)}
        >
          {movie.title}
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieList;
