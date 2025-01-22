# Movies Dashboard

A modern, responsive dashboard built with React and Vite for visualizing and analyzing movie data. The dashboard provides insights into movie ratings, Oscar wins, and actor performances.

## Features

### 1. Interactive Filtering
- Filter movies by:
  - Year
  - Genre
  - IMDb Rating
  - Country
  - Language

### 2. Data Visualization
- **Oscar Statistics**: Track Oscar nominations and wins by year
- **Movie Details**: Comprehensive information about each movie including:
  - Title and Year
  - Director
  - Cast
  - IMDb Rating
  - Awards
  - Countries and Languages

### 3. Top Performers
- **Top Rated Movies**: Highest IMDb rated films
- **Oscar Winners**: Movies with most Oscar wins
- **Popular Actors**: Actors with most movie appearances

## Technology Stack

- **Frontend Framework**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **State Management**: React Hooks (useState, useEffect, useMemo)

## Prerequisites

Before running the application, ensure you have the following installed:
- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rexster29/movies-dashboard.git
   cd movies-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
movies-dashboard/
├── src/
│   ├── components/
│   │   ├── FilteredMoviesChart.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── OscarStatistics.jsx
│   │   ├── SearchFilter.jsx
│   │   └── TopPerformers.jsx
│   ├── data/
│   │   └── movies.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── README.md
```

## Component Documentation

### 1. SearchFilter
- Handles all movie filtering functionality
- Provides dropdown selectors for various filter criteria
- Updates parent component with filtered results

### 2. MovieDetails
- Displays detailed information about selected movies
- Shows cast, genres, countries, and languages as tags
- Provides Oscar-related information

### 3. OscarStatistics
- Visualizes Oscar nominations and wins over time
- Uses Chart.js for data visualization
- Responsive chart sizing based on screen width

### 4. TopPerformers
- Shows various leaderboards:
  - Highest rated movies
  - Most Oscar wins
  - Most frequent actor appearances
- Tabbed interface for easy navigation

### 5. FilteredMoviesChart
- Visualizes filtered movie data
- Updates dynamically based on applied filters
- Responsive design for different screen sizes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
