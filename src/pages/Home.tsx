import { use, useEffect, useState } from "react";
import { fetchMovieData, fetchMovieGenres } from "../api/getData";
import { Banner } from "../components/Banner";
import { HeartFilled, HeartOutlined } from '@ant-design/icons'; // for favorite icon
import './Home.css'
import { Rate } from "antd";
import { getFavorites, saveFavorites } from "../utils/localstorage";

interface Genres {
	id: number;
	name: string;
}

function HomePage() 
{
	// Genres state
	const [favorites, setFavorites] = useState<any>([]);
	const [genres, setGenres] = useState<Genres[]>([]);
	const [randomMovies, setRandomMovies] = useState<any[]>([]);
	const [movies, setMovies] = useState<any>({ results: [] });

	useEffect(() => {
		async function x() {
			const moviesData = await fetchMovieData("movie/popular");
			const genresData = await fetchMovieGenres();
			setMovies(moviesData);
			setGenres(genresData);
			console.log("Fetched movies:", movies.results);
		}
		setFavorites(getFavorites());
		x();
	}, []);

	useEffect(() => {
		if (movies.results?.length > 0 && randomMovies.length === 0) {
			const shuffled = [...movies.results].sort(() => 0.5 - Math.random());
			setRandomMovies(shuffled.slice(0, 5));
		}
	}, [movies]);

	const toggleFavorite = (movie : any) => {
		const isFav = favorites.some((fav : any) => fav.id === movie.id);
		const updated = isFav
			? favorites.filter((fav : any) => fav.id !== movie.id)
			: [...favorites, movie];
		setFavorites(updated);
		saveFavorites(updated);
	};

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
				<div className="popular-section">
         		 <h2 className="popular-title">Popular Picks 🎥</h2>
				<div className="popular-movies">
					{randomMovies
					.sort(() => 0.5 - Math.random())
					.slice(0, 5)
					.map((movie : any) => (
						<div key={movie.id} className="popular-movie-card">
							<div className="favorite-icon" onClick={() => toggleFavorite(movie)}>
								{favorites.some((fav : any) => fav.id === movie.id) ? (
								<HeartFilled style={{ color: 'hotpink', fontSize: '20px' }} />
								) : (
								<HeartOutlined style={{ color: '#888', fontSize: '20px' }} />
								)}
							</div>
						<img
							src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
							alt={movie.title}
							className="popular-movie-image"
						/>
						<h3 className="popular-movie-title">
							{movie.title}
						</h3>
						  <Rate
							disabled
							allowHalf
							defaultValue={movie.vote_average / 2} // TMDB is out of 10, Rate uses 5
							className="popular-movie-rating"
  						/>
						</div>
					))}
				</div>		
			</div>
		</div>
		</>
	)
}

export default HomePage;