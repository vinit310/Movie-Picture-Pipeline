import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MovieList from '../MovieList';

jest.mock('axios');

const mockMovies = [
  { id: 1, title: 'Movie 1' },
  { id: 2, title: 'Movie 2' },
];

test('renders movie titles', async () => {
  // Mock the axios GET request to return mockMovies
  axios.get.mockResolvedValueOnce({ data: { movies: mockMovies } });

  const onMovieClick = jest.fn(); // Mock the onMovieClick function
  render(<MovieList onMovieClick={onMovieClick} />); // Render the MovieList component

  // Wait for the movie titles to appear in the document
  const movie1 = await screen.findByText(/Movie 1/);
  const movie2 = await screen.findByText(/Movie 2/);

  // Assert that both movie titles are present in the document
  expect(movie1).toBeInTheDocument();
  expect(movie2).toBeInTheDocument();
});

test('calls onMovieClick when movie is clicked', async () => {
  // Mock the axios GET request to return mockMovies
  axios.get.mockResolvedValueOnce({ data: { movies: mockMovies } });

  const onMovieClick = jest.fn(); // Mock the onMovieClick function
  render(<MovieList onMovieClick={onMovieClick} />); // Render the MovieList component

  // Wait for the movie title element to appear
  const movie1 = await screen.findByText(/Movie 1/);

  // Simulate a click event on the movie title
  fireEvent.click(movie1);

  // Assert that onMovieClick was called with the correct movie object
  expect(onMovieClick).toHaveBeenCalledWith(mockMovies[0]);
});