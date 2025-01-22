import { describe, it, expect } from 'vitest'
import { screen, fireEvent, render } from '../../test/testUtils'
import TopPerformers from '../TopPerformers'
import { mockMovies } from '../../test/testUtils'

describe('TopPerformers', () => {
  it('renders all tab options', () => {
    render(<TopPerformers movies={mockMovies} />)
    
    expect(screen.getByText(/top rated/i)).toBeInTheDocument()
    expect(screen.getByText(/oscar wins/i)).toBeInTheDocument()
    expect(screen.getByText(/top actors/i)).toBeInTheDocument()
  })

  it('displays top rated movies by default', () => {
    render(<TopPerformers movies={mockMovies} />)
    
    expect(screen.getByText('The Shawshank Redemption')).toBeInTheDocument()
    expect(screen.getByText('★ 9.3')).toBeInTheDocument()
  })

  it('switches content when different tab is selected', () => {
    render(<TopPerformers movies={mockMovies} />)
    
    const oscarTab = screen.getByText(/oscar wins/i)
    fireEvent.click(oscarTab)
    
    expect(screen.getByText('The Godfather')).toBeInTheDocument()
    expect(screen.getByText('3 Oscars')).toBeInTheDocument()
  })

  it('displays actor appearances when actors tab is selected', () => {
    render(<TopPerformers movies={mockMovies} />)
    
    const actorsTab = screen.getByText(/top actors/i)
    fireEvent.click(actorsTab)
    
    expect(screen.getByText('Tim Robbins')).toBeInTheDocument()
    expect(screen.getByText('Morgan Freeman')).toBeInTheDocument()
  })
})
