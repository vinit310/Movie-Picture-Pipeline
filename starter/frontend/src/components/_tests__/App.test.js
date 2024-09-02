import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../../App';

describe('App Component', () => {
  const defaultHeading = 'Movie List';
  const incorrectHeading = 'WRONG_HEADING';
  const headingText = process.env.FAIL_TEST ? incorrectHeading : defaultHeading;

  test(`renders ${headingText} heading`, () => {
    render(<App />);
    const headingElement = screen.getByText(headingText);

    // Assert that the heading element is present in the document
    expect(headingElement).toBeInTheDocument();
  });
});
