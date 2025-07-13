const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
export async function fetchMovieGenres() {
	try {
	  const response = await fetch(
		`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
	  );
  
	  if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	  }
  
	  const data = await response.json();
	  return data.genres; // Array of genres
	} catch (error) {
	  console.error("Failed to fetch genres:", error);
	  return [];
	}
}