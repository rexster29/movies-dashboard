import { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Color palette for the charts
const colors = [
  'rgba(255, 99, 132, 0.7)',
  'rgba(54, 162, 235, 0.7)',
  'rgba(255, 206, 86, 0.7)',
  'rgba(75, 192, 192, 0.7)',
  'rgba(153, 102, 255, 0.7)',
  'rgba(255, 159, 64, 0.7)',
  'rgba(199, 199, 199, 0.7)',
  'rgba(83, 102, 255, 0.7)',
  'rgba(40, 159, 64, 0.7)',
  'rgba(210, 199, 199, 0.7)',
];

const borderColors = colors.map(color => color.replace('0.7', '1'));

export default function CountryLanguageInsights({ movies }) {
  const insights = useMemo(() => {
    // Count occurrences of countries and languages
    const countryCount = {};
    const languageCount = {};

    movies.forEach(movie => {
      movie.country.forEach(country => {
        countryCount[country] = (countryCount[country] || 0) + 1;
      });
      movie.language.forEach(language => {
        languageCount[language] = (languageCount[language] || 0) + 1;
      });
    });

    // Sort and get top 10 countries and languages
    const topCountries = Object.entries(countryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const topLanguages = Object.entries(languageCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    // Calculate "Others" category
    const otherCountries = Object.values(countryCount)
      .reduce((sum, count) => sum + count, 0) -
      topCountries.reduce((sum, [, count]) => sum + count, 0);

    const otherLanguages = Object.values(languageCount)
      .reduce((sum, count) => sum + count, 0) -
      topLanguages.reduce((sum, [, count]) => sum + count, 0);

    // Prepare chart data
    const countryData = {
      labels: [...topCountries.map(([country]) => country), 'Others'],
      datasets: [{
        data: [...topCountries.map(([, count]) => count), otherCountries],
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      }],
    };

    const languageData = {
      labels: [...topLanguages.map(([language]) => language), 'Others'],
      datasets: [{
        data: [...topLanguages.map(([, count]) => count), otherLanguages],
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      }],
    };

    return { countryData, languageData };
  }, [movies]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Country & Language Distribution</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Top Countries</h3>
          <div className="relative" style={{ height: '300px' }}>
            <Pie data={insights.countryData} options={chartOptions} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Top Languages</h3>
          <div className="relative" style={{ height: '300px' }}>
            <Pie data={insights.languageData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
