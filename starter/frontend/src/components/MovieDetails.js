import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieDetail({ movie }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_MOVIE_API_URL}/movies/${movie.id}`);
        setDetails(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();

    // Clean-up function to prevent setting state if the component is unmounted
    return () => {
      setDetails(null);
      setLoading(false);
    };
  }, [movie]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching movie details: {error.message}</p>;

  return (
    <div>
      <h2>{details?.movie.title || 'No title available'}</h2>
      <p>{details?.movie.description || 'No description available'}</p>
    </div>
  );
}

export default MovieDetail;
