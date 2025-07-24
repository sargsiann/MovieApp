const FAVORITES_KEY = 'favorites';

const getFavorites = () => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveFavorites = (favorites : number[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export { getFavorites, saveFavorites };