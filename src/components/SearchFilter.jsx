import { useState, useEffect, useMemo } from 'react';

export default function SearchFilter({ movies, onFilterChange }) {
  const [filters, setFilters] = useState({
    year: '',
    genre: '',
    rating: '',
    country: '',
    language: ''
  });

  // Use useMemo to calculate unique values only when movies change
  const uniqueValues = useMemo(() => ({
    years: [...new Set(movies.map(movie => movie.year))].sort((a, b) => b - a),
    genres: [...new Set(movies.flatMap(movie => movie.genre))].sort(),
    countries: [...new Set(movies.flatMap(movie => movie.country))].sort(),
    languages: [...new Set(movies.flatMap(movie => movie.language))].sort()
  }), [movies]);

  const ratingRanges = [
    { label: 'All Ratings', value: '' },
    { label: '9.0+', value: '9' },
    { label: '8.0-8.9', value: '8' },
    { label: '7.0-7.9', value: '7' },
    { label: '< 7.0', value: '6' }
  ];

  // Memoize the filter function to prevent unnecessary recalculations
  const getFilteredMovies = useMemo(() => {
    return movies.filter(movie => {
      // Convert year to string for comparison since select values are strings
      if (filters.year && movie.year.toString() !== filters.year) return false;
      if (filters.genre && !movie.genre.includes(filters.genre)) return false;
      if (filters.country && !movie.country.includes(filters.country)) return false;
      if (filters.language && !movie.language.includes(filters.language)) return false;
      
      if (filters.rating) {
        const rating = parseFloat(movie.imdb_rating);
        switch (filters.rating) {
          case '9': return rating >= 9.0;
          case '8': return rating >= 8.0 && rating < 9.0;
          case '7': return rating >= 7.0 && rating < 8.0;
          case '6': return rating < 7.0;
          default: return true;
        }
      }
      
      return true;
    });
  }, [movies, filters]);

  useEffect(() => {
    onFilterChange(getFilteredMovies);
  }, [getFilteredMovies, onFilterChange]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFilters({
      year: '',
      genre: '',
      rating: '',
      country: '',
      language: ''
    });
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Filter Movies</h2>
        <button
          onClick={handleReset}
          className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition-colors"
        >
          Reset Filters
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <select
            id="year"
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          >
            <option value="">All Years</option>
            {uniqueValues.years.map(year => (
              <option key={year} value={year.toString()}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={filters.genre}
            onChange={handleFilterChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          >
            <option value="">All Genres</option>
            {uniqueValues.genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
            IMDb Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          >
            {ratingRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          >
            <option value="">All Countries</option>
            {uniqueValues.countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            id="language"
            name="language"
            value={filters.language}
            onChange={handleFilterChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          >
            <option value="">All Languages</option>
            {uniqueValues.languages.map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
