import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent, render } from '../../test/testUtils'
import SearchFilter from '../SearchFilter'
import { mockMovies } from '../../test/testUtils'

describe('SearchFilter', () => {
  it('renders all filter options', () => {
    render(<SearchFilter movies={mockMovies} onFilterChange={() => {}} />)
    
    expect(screen.getByLabelText(/year/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/rating/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/language/i)).toBeInTheDocument()
  })

  it('calls onFilterChange when filters are updated', () => {
    const mockOnFilterChange = vi.fn()
    render(<SearchFilter movies={mockMovies} onFilterChange={mockOnFilterChange} />)
    
    const yearSelect = screen.getByLabelText(/year/i)
    fireEvent.change(yearSelect, { target: { value: '1994' } })
    
    expect(mockOnFilterChange).toHaveBeenCalled()
  })

  it('resets all filters when reset button is clicked', () => {
    const mockOnFilterChange = vi.fn()
    render(<SearchFilter movies={mockMovies} onFilterChange={mockOnFilterChange} />)
    
    const resetButton = screen.getByText(/reset filters/i)
    fireEvent.click(resetButton)
    
    const yearSelect = screen.getByLabelText(/year/i)
    expect(yearSelect.value).toBe('')
  })
})
