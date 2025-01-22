import { useState, useEffect } from 'react'
import './App.css'
import OscarStatistics from './components/OscarStatistics'
import TopPerformers from './components/TopPerformers'
import SearchFilter from './components/SearchFilter'
import MovieDetails from './components/MovieDetails'
import FilteredMoviesChart from './components/FilteredMoviesChart'
import CountryLanguageInsights from './components/CountryLanguageInsights'
import { moviesData } from './data/movies'

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use local data instead of API
    setMovies(moviesData);
    setFilteredMovies(moviesData);
    setLoading(false);
  }, []);

  const handleFilterChange = (filtered) => {
    setFilteredMovies(filtered);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-2xl font-semibold">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-2xl font-semibold text-red-600">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50 p-2 sm:p-4">
      <header className="bg-white shadow rounded-lg mb-4 sm:mb-6 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h18M3 16h18" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Movies Dashboard</h1>
            <p className="text-xs sm:text-sm text-gray-600">Explore and analyze your favorite films</p>
          </div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="sm:col-span-2">
          <OscarStatistics movies={movies} />
        </div>
        <div className="w-full">
          <SearchFilter movies={movies} onFilterChange={handleFilterChange} />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <FilteredMoviesChart movies={filteredMovies} />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <CountryLanguageInsights movies={filteredMovies} />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <TopPerformers movies={filteredMovies} />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <MovieDetails movies={filteredMovies} />
        </div>
      </div>
    </div>
  );
}

export default App
