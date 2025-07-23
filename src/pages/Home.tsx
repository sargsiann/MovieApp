import { use, useEffect, useState } from "react";
import { fetchMovieData, fetchMovieGenres } from "../api/getData";
import { Banner } from "../components/Banner";
import './Home.css'

interface Genres {
	id: number;
	name: string;
}

function HomePage() 
{
	// Genres state
	const [genres, setGenres] = useState<Genres[]>([]);
	const [movies, setMovies] = useState<any>({ results: [] });

	useEffect(() => {
		async function x() {
			const moviesData = await fetchMovieData("movie/popular");
			const genresData = await fetchMovieGenres();
			setMovies(moviesData);
			setGenres(genresData);
			console.log("Fetched movies:", movies.results);
		}
		x();
	}, []);

	return (
		<>
			
			<div className="homepage-description">
				<h1>Watch Together, Wherever You Are 🎬</h1>
				<p>
					MovieVerse isn’t just about watching — it's about sharing the moment. Connect with friends or meet new movie lovers around the world. 
					Watch movies together in real time, chat while the story unfolds, and create unforgettable cinema nights — all from the comfort of home.
				</p>
			</div>
			<div>
				{movies.results?.length > 0 ? (<Banner data={movies.results} />) : (<h2>Loading movies...</h2>)}
			</div>
		</>
	)
}

export default HomePage;