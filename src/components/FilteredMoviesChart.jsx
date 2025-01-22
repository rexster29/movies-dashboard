import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function FilteredMoviesChart({ movies }) {
  const [chartType, setChartType] = useState('ratings');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    updateChartData();
  }, [movies, chartType]);

  const prepareRatingsData = () => {
    const ratingRanges = {
      '9.0+': movies.filter(m => m.imdb_rating >= 9.0).length,
      '8.0-8.9': movies.filter(m => m.imdb_rating >= 8.0 && m.imdb_rating < 9.0).length,
      '7.0-7.9': movies.filter(m => m.imdb_rating >= 7.0 && m.imdb_rating < 8.0).length,
      '6.0-6.9': movies.filter(m => m.imdb_rating >= 6.0 && m.imdb_rating < 7.0).length,
      '< 6.0': movies.filter(m => m.imdb_rating < 6.0).length,
    };

    return {
      labels: Object.keys(ratingRanges),
      datasets: [{
        label: 'Number of Movies',
        data: Object.values(ratingRanges),
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
      }]
    };
  };

  const prepareGenreData = () => {
    const genreCounts = {};
    movies.forEach(movie => {
      movie.genre.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });

    // Sort genres by count
    const sortedGenres = Object.entries(genreCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10); // Top 10 genres

    return {
      labels: sortedGenres.map(([genre]) => genre),
      datasets: [{
        label: 'Number of Movies',
        data: sortedGenres.map(([, count]) => count),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      }]
    };
  };

  const prepareYearData = () => {
    const yearCounts = {};
    movies.forEach(movie => {
      yearCounts[movie.year] = (yearCounts[movie.year] || 0) + 1;
    });

    const sortedYears = Object.entries(yearCounts)
      .sort(([a], [b]) => a - b);

    return {
      labels: sortedYears.map(([year]) => year),
      datasets: [{
        label: 'Number of Movies',
        data: sortedYears.map(([, count]) => count),
        backgroundColor: 'rgba(255, 159, 64, 0.8)',
      }]
    };
  };

  const prepareOscarData = () => {
    const oscarData = {
      labels: ['No Nominations', '1-2 Nominations', '3-5 Nominations', '6+ Nominations'],
      datasets: [{
        label: 'Number of Movies',
        data: [
          movies.filter(m => m.oscar_nominations === 0).length,
          movies.filter(m => m.oscar_nominations >= 1 && m.oscar_nominations <= 2).length,
          movies.filter(m => m.oscar_nominations >= 3 && m.oscar_nominations <= 5).length,
          movies.filter(m => m.oscar_nominations >= 6).length,
        ],
        backgroundColor: 'rgba(153, 102, 255, 0.8)',
      }]
    };
    return oscarData;
  };

  const updateChartData = () => {
    let data;
    switch (chartType) {
      case 'ratings':
        data = prepareRatingsData();
        break;
      case 'genres':
        data = prepareGenreData();
        break;
      case 'years':
        data = prepareYearData();
        break;
      case 'oscars':
        data = prepareOscarData();
        break;
      default:
        data = prepareRatingsData();
    }
    setChartData(data);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Movie Distribution by ${chartType.charAt(0).toUpperCase() + chartType.slice(1)}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold">Filtered Movies Analysis</h2>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={() => setChartType('ratings')}
            className={`px-2 sm:px-3 py-1 rounded text-sm sm:text-base flex-1 sm:flex-none ${
              chartType === 'ratings'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Ratings
          </button>
          <button
            onClick={() => setChartType('genres')}
            className={`px-2 sm:px-3 py-1 rounded text-sm sm:text-base flex-1 sm:flex-none ${
              chartType === 'genres'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Genres
          </button>
          <button
            onClick={() => setChartType('years')}
            className={`px-2 sm:px-3 py-1 rounded text-sm sm:text-base flex-1 sm:flex-none ${
              chartType === 'years'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Years
          </button>
          <button
            onClick={() => setChartType('oscars')}
            className={`px-2 sm:px-3 py-1 rounded text-sm sm:text-base flex-1 sm:flex-none ${
              chartType === 'oscars'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Oscars
          </button>
        </div>
      </div>
      <div className="h-[300px] sm:h-[400px]">
        {chartData && <Bar data={chartData} options={options} />}
      </div>
    </div>
  );
}
