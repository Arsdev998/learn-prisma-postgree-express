import {
  addFavorite,
  deleteFavorite,
  fetchFavorites,
} from "@/features/auth/favoritesSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "@/features/auth/authSlice";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { toast } from "sonner";

const FavButton = ({ className, wisataId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: favorites } = useSelector((state) => state.favorites);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user.id));
    } else {
      dispatch(getMe());
    }
  }, [user, dispatch]);

  const isFavorite = favorites.some((fav) => fav.wisataId == wisataId);

  const handleFav = () => {
    if (user) {
      if (isFavorite) {
        dispatch(deleteFavorite(wisataId));
      } else {
        dispatch(addFavorite({ userId: user.id, wisataId }));
      }
    } else {
      toast.warning("Kamu harus login Dahulu");
    }
  };
  console.log(isFavorite);
  return (
    <div onClick={handleFav} className={`cursor-pointer ${className}`}>
      {isFavorite ? (
        <MdOutlineFavorite className="text-okegas" />
      ) : (
        <MdOutlineFavoriteBorder className="text-okegas" />
      )}
    </div>
  );
};

export default FavButton;
