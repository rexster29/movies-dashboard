import { describe, it, expect } from 'vitest'
import { screen, fireEvent, render } from '../../test/testUtils'
import MovieDetails from '../MovieDetails'
import { mockMovies } from '../../test/testUtils'

describe('MovieDetails', () => {
  it('renders the movie selector dropdown', () => {
    render(<MovieDetails movies={mockMovies} />)
    
    const selector = screen.getByRole('combobox')
    expect(selector).toBeInTheDocument()
  })

  it('displays movie details when a movie is selected', () => {
    render(<MovieDetails movies={mockMovies} />)
    
    const selector = screen.getByRole('combobox')
    fireEvent.change(selector, { target: { value: '1' } })
    
    expect(screen.getByText('The Shawshank Redemption')).toBeInTheDocument()
    expect(screen.getByText('Frank Darabont')).toBeInTheDocument()
    expect(screen.getByText('9.3')).toBeInTheDocument()
  })

  it('displays cast members', () => {
    render(<MovieDetails movies={mockMovies} />)
    
    const selector = screen.getByRole('combobox')
    fireEvent.change(selector, { target: { value: '1' } })
    
    expect(screen.getByText('Tim Robbins')).toBeInTheDocument()
    expect(screen.getByText('Morgan Freeman')).toBeInTheDocument()
  })

  it('resets selected movie when movies prop changes', () => {
    const { rerender } = render(<MovieDetails movies={mockMovies} />)
    
    const selector = screen.getByRole('combobox')
    fireEvent.change(selector, { target: { value: '1' } })
    
    // Rerender with new movies prop
    rerender(<MovieDetails movies={[]} />)
    
    expect(selector.value).toBe('')
  })
})
