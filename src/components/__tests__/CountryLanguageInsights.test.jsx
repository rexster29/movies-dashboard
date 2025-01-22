import { describe, it, expect, vi } from 'vitest'
import { screen, render } from '../../test/testUtils'
import CountryLanguageInsights from '../CountryLanguageInsights'
import { mockMovies } from '../../test/testUtils'

// Mock Chart.js components
vi.mock('react-chartjs-2', () => ({
  Pie: () => <div data-testid="pie-chart">Mock Pie Chart</div>
}))

// Mock Chart.js registration
vi.mock('chart.js', () => ({
  Chart: { register: vi.fn() },
  ArcElement: vi.fn(),
  Tooltip: vi.fn(),
  Legend: vi.fn()
}))

describe('CountryLanguageInsights', () => {
  it('renders the component title', () => {
    render(<CountryLanguageInsights movies={mockMovies} />)
    expect(screen.getByText('Country & Language Distribution')).toBeInTheDocument()
  })

  it('displays both chart sections', () => {
    render(<CountryLanguageInsights movies={mockMovies} />)
    expect(screen.getByText('Top Countries')).toBeInTheDocument()
    expect(screen.getByText('Top Languages')).toBeInTheDocument()
    expect(screen.getAllByTestId('pie-chart')).toHaveLength(2)
  })

  it('shows country data from mock movies', () => {
    render(<CountryLanguageInsights movies={mockMovies} />)
    expect(screen.getByText('United States')).toBeInTheDocument()
  })

  it('shows language data from mock movies', () => {
    render(<CountryLanguageInsights movies={mockMovies} />)
    expect(screen.getByText('English')).toBeInTheDocument()
    expect(screen.getByText('Italian')).toBeInTheDocument()
  })
})
