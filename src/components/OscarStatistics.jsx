import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export default function OscarStatistics({ movies }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const containerRef = useRef(null);
  const [chartHeight, setChartHeight] = useState(400);

  // Function to update chart height based on container width
  const updateDimensions = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      // Adjust height based on screen width breakpoints
      if (width < 640) { // mobile
        setChartHeight(300);
      } else if (width < 1024) { // tablet
        setChartHeight(350);
      } else { // desktop
        setChartHeight(400);
      }
    }
  };

  useEffect(() => {
    // Initial dimension update
    updateDimensions();

    // Add resize listener
    const handleResize = () => {
      updateDimensions();
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!movies.length) return;

    // Count Oscar nominations and wins by year
    const oscarStats = movies.reduce((acc, movie) => {
      if (movie.year) {
        if (!acc[movie.year]) {
          acc[movie.year] = { nominations: 0, wins: 0 };
        }
        acc[movie.year].nominations += movie.oscar_nominations || 0;
        acc[movie.year].wins += movie.oscar_winning || 0;
      }
      return acc;
    }, {});

    const years = Object.keys(oscarStats).sort();
    const nominations = years.map(year => oscarStats[year].nominations);
    const wins = years.map(year => oscarStats[year].wins);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Nominations',
            data: nominations,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Wins',
            data: wins,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Oscar Nominations and Wins by Year',
            font: {
              size: window.innerWidth < 640 ? 14 : 16
            }
          },
          legend: {
            position: 'top',
            labels: {
              boxWidth: window.innerWidth < 640 ? 30 : 40,
              padding: window.innerWidth < 640 ? 10 : 15,
              font: {
                size: window.innerWidth < 640 ? 12 : 14
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: window.innerWidth < 640 ? 10 : 12
              },
              maxRotation: 45,
              minRotation: 45
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: window.innerWidth < 640 ? 10 : 12
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [movies]);

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow" ref={containerRef}>
      <div style={{ height: chartHeight }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
