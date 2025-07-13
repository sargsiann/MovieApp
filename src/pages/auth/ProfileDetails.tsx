import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import Lottie from "lottie-react";
import loadingIcon from "../../assets/animations/loading.json"; // Assuming you have this path
import { fetchMovieGenres } from "../../api/getData"; // Adjust path as needed
import Movie from "../../assets/animations/movie.json"; // Assuming you have this path
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/main";
import { useNavigate } from "react-router-dom";


interface FavoriteCategoriesProps {
  userId: string; // To associate categories with the user
}

const ProfileDetails: React.FC<FavoriteCategoriesProps> = ({ userId}) => {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<{id : number, name : string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false); // For when the user submits their choices

  const navigate = useNavigate();
  useEffect(() => {
    const getGenres = async () => {
      setLoading(true);
      const fetchedGenres = await fetchMovieGenres();
      setGenres(fetchedGenres);
      setLoading(false);
    };

    getGenres();
  }, []);

  const handleSubmit = async () => {

	setLoading(true);
    if (selectedGenres.length === 0) {
      message.warning("Please select at least one favorite category.");
      return;
    }


    setSubmitting(true);
    try {
	 const docRef = doc(db, "users", userId);

	await updateDoc(docRef,{
	  favoriteCategories: selectedGenres.map((genre) => genre.name), // Save only the names of the selected genres
	  updatedAt: serverTimestamp(), // Optional: to track when the categories were updated
	});
      message.success("Favorite categories saved successfully!");
    } catch (error) {
      console.error("Failed to save favorite categories:", error);
      message.error("Failed to save categories. Please try again.");
    } finally {
		navigate("/login"); // Redirect to home after saving
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Lottie animationData={loadingIcon} loop={true} style={{ maxWidth: "200px", maxHeight: "200px", margin: "0 auto" }} />
        <p>Loading movie genres...</p>
      </div>
    );
  }

  const toggleGenreSelection = (genreId: number) => {
    setSelectedGenres((prevSelected) => {
      if (prevSelected.some((genre) => genre.id === genreId)) {
        return prevSelected.filter((genre) => genre.id !== genreId);
      } else {
        const genreToAdd = genres.find((genre) => genre.id === genreId);
        return genreToAdd ? [...prevSelected, genreToAdd] : prevSelected;
      }
    });
  };

  return (
    <div className="favorite-categories-container">
      <h2 className="categories-title">Choose Your Favorite Movie Categories</h2>
	  <Lottie animationData={Movie} loop={true} style={{ maxWidth: "200px", maxHeight: "200px", margin: "0 auto" }} />
      <p className="categories-subtitle">Select all that apply.</p>
      <div className="genres-grid">
        {genres.map((genre) => (
          <div
            key={genre.id}
            className={`genre-square ${selectedGenres.some((selected) => selected.id === genre.id) ? "selected" : ""}`}
            onClick={() => toggleGenreSelection(genre.id)}
          >
            {genre.name}
          </div>
        ))}
      </div>
      <Button
        type="primary"
        onClick={handleSubmit}
        block
        loading={submitting}
        disabled={selectedGenres.length === 0}
        className="save-categories-button"
      >
        Save Favorites
      </Button>
    </div>
  );
};

export default ProfileDetails