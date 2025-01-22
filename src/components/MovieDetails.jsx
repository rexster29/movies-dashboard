import { useState, useEffect } from 'react';

export default function MovieDetails({ movies }) {
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  useEffect(() => {
    setSelectedMovieId('');
    setSelectedMovie(null);
  }, [movies]);

  const handleMovieSelect = (e) => {
    setSelectedMovieId(e.target.value);
    setSelectedMovie(movies.filter(movie => movie.id == e.target.value)[0]);
  };

  const renderTag = (text, index) => (
    <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">
      {text}
    </span>
  );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-4">
        <label htmlFor="movieSelect" className="block text-sm font-medium text-gray-700 mb-2">
          Select a Movie
        </label>
        <select
          id="movieSelect"
          value={selectedMovieId}
          onChange={handleMovieSelect}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Choose a movie...</option>
          {movies.map(movie => (
            <option key={movie.id} value={movie.id}>
              {movie.title} ({movie.year})
            </option>
          ))}
        </select>
      </div>

      {selectedMovie && (
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedMovie.title}</h2>
            <p className="text-sm text-gray-600">
              {selectedMovie.year} • {selectedMovie.runtime} minutes • IMDb Rating: {selectedMovie.imdb_rating}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Movie Info</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Director:</span>{' '}
                  {selectedMovie.director}
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Box Office:</span>{' '}
                  {selectedMovie.box_office ? `$${selectedMovie.box_office.toLocaleString()}` : 'N/A'}
                </p>
                <div>
                  <span className="font-medium text-gray-700 text-sm">Genres:</span>
                  <div className="mt-1">
                    {selectedMovie.genre.map((g, index) => renderTag(g, index))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Additional Details</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium text-gray-700 text-sm">Countries:</span>
                  <div className="mt-1">
                    {selectedMovie.country.map((c,index) => renderTag(c, index))}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700 text-sm">Languages:</span>
                  <div className="mt-1">
                    {selectedMovie.language.map((l, index) => renderTag(l, index))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Cast</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedMovie.cast.map((actor, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full text-center"
                >
                  {actor}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Awards</h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium text-gray-700">Oscar Nominations:</span>{' '}
                {selectedMovie.oscar_nominations || 0}
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Oscar Wins:</span>{' '}
                {selectedMovie.oscar_winning || 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
