import { vi } from 'vitest'

// Mock for react-chartjs-2 components
export const chartMock = {
  Pie: vi.fn().mockImplementation(({ data, options }) => (
    <div data-testid="mock-pie-chart">
      <span>Mock Pie Chart</span>
      <pre>{JSON.stringify({ data, options })}</pre>
    </div>
  )),
  Line: vi.fn().mockImplementation(({ data, options }) => (
    <div data-testid="mock-line-chart">
      <span>Mock Line Chart</span>
      <pre>{JSON.stringify({ data, options })}</pre>
    </div>
  )),
  Bar: vi.fn().mockImplementation(({ data, options }) => (
    <div data-testid="mock-bar-chart">
      <span>Mock Bar Chart</span>
      <pre>{JSON.stringify({ data, options })}</pre>
    </div>
  ))
}
