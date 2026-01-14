// Favorites management using localStorage

export const getFavorites = () => {
  const favorites = localStorage.getItem('favoriteGarages');
  return favorites ? JSON.parse(favorites) : [];
};

export const addFavorite = (garageId) => {
  const favorites = getFavorites();
  if (!favorites.includes(garageId)) {
    favorites.push(garageId);
    localStorage.setItem('favoriteGarages', JSON.stringify(favorites));
  }
  return favorites;
};

export const removeFavorite = (garageId) => {
  const favorites = getFavorites();
  const updated = favorites.filter(id => id !== garageId);
  localStorage.setItem('favoriteGarages', JSON.stringify(updated));
  return updated;
};

export const isFavorite = (garageId) => {
  const favorites = getFavorites();
  return favorites.includes(garageId);
};

export const toggleFavorite = (garageId) => {
  if (isFavorite(garageId)) {
    return removeFavorite(garageId);
  } else {
    return addFavorite(garageId);
  }
};
