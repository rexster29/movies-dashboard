import { useState, useMemo } from 'react';

export default function TopPerformers({ movies }) {
  const [activeTab, setActiveTab] = useState('ratings');

  const topPerformers = useMemo(() => {
    // Top movies by IMDb rating
    const topRatedMovies = [...movies]
      .sort((a, b) => b.imdb_rating - a.imdb_rating)
      .slice(0, 5);

    // Top movies by Oscar wins
    const topOscarWinners = [...movies]
      .sort((a, b) => (b.oscar_winning || 0) - (a.oscar_winning || 0))
      .slice(0, 5);

    // Most prolific actors
    const actorAppearances = movies.reduce((acc, movie) => {
      movie.cast.forEach(actor => {
        acc[actor] = (acc[actor] || 0) + 1;
      });
      return acc;
    }, {});

    const topActors = Object.entries(actorAppearances)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([actor, count]) => ({ actor, count }));

    return {
      topRatedMovies,
      topOscarWinners,
      topActors
    };
  }, [movies]);

  const renderMovieCard = (movie, index, metric) => {
    let metricValue = '';
    switch (metric) {
      case 'rating':
        metricValue = `★ ${movie.imdb_rating.toFixed(1)}`;
        break;
      case 'oscars':
        metricValue = `${movie.oscar_winning || 0} Oscar${movie.oscar_winning !== 1 ? 's' : ''}`;
        break;
    }

    return (
      <div key={movie.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-800 font-bold rounded-full">
          {index + 1}
        </div>
        <div className="flex-grow min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate">{movie.title}</h4>
          <p className="text-xs text-gray-500">{movie.year}</p>
        </div>
        <div className="flex-shrink-0">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {metricValue}
          </span>
        </div>
      </div>
    );
  };

  const renderActorCard = (actorData, index) => (
    <div key={actorData.actor} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-800 font-bold rounded-full">
        {index + 1}
      </div>
      <div className="flex-grow min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">{actorData.actor}</h4>
      </div>
      <div className="flex-shrink-0">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {actorData.count} movie{actorData.count !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );

  const tabs = [
    { id: 'ratings', label: 'Top Rated' },
    { id: 'oscars', label: 'Oscar Wins' },
    { id: 'actors', label: 'Top Actors' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Top Performers</h2>
      
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors
              ${activeTab === tab.id
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {activeTab === 'ratings' && (
          <>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Highest IMDb Rated Movies</h3>
            {topPerformers.topRatedMovies.map((movie, index) => 
              renderMovieCard(movie, index, 'rating')
            )}
          </>
        )}

        {activeTab === 'oscars' && (
          <>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Most Oscar Wins</h3>
            {topPerformers.topOscarWinners.map((movie, index) => 
              renderMovieCard(movie, index, 'oscars')
            )}
          </>
        )}

        {activeTab === 'actors' && (
          <>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Most Appearances</h3>
            {topPerformers.topActors.map((actorData, index) => 
              renderActorCard(actorData, index)
            )}
          </>
        )}
      </div>
    </div>
  );
}
