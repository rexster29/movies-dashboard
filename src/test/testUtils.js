import { render } from '@testing-library/react'

// Mock data for testing
export const mockMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
    genre: ["Drama"],
    country: ["United States"],
    language: ["English"],
    imdb_rating: 9.3,
    oscar_winning: 0,
    cast: ["Tim Robbins", "Morgan Freeman"],
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    director: "Francis Ford Coppola",
    genre: ["Crime", "Drama"],
    country: ["United States"],
    language: ["English", "Italian"],
    imdb_rating: 9.2,
    oscar_winning: 3,
    cast: ["Marlon Brando", "Al Pacino"],
  }
]

// Custom render function with default options
const customRender = (ui, options = {}) => {
  return render(ui, {
    // Add any global context providers here if needed
    wrapper: ({ children }) => children,
    ...options,
  })
}

// Re-export everything
export * from '@testing-library/react'

// Override render method
export { customRender as render }
