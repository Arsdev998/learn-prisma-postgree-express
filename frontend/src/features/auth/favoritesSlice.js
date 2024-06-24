import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, remove } from "../../hooks/api";
import { toast } from "sonner";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId) => {
    const response = await get(`/wisata/favorites/${userId}`);
    return response;
  }
);

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async ({ userId, wisataId }) => {
    try {
      const response = await post("/wisata/favorites", { userId, wisataId });
      toast.success("succes");
      return response.data;
    } catch (error) {
      toast.error("GAGALLLLLLLLL", error);
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "favorites/deleteFavorite",
  async (wisataId) => {
    try {
      await remove(`/wisata/favorites/${wisataId}`);
      toast.success("Dihapus dari Favorite");
      return { wisataId };
    } catch (error) {
      toast.error("GAGAAALLLLLLLLLL", error);
      console.log(error);
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.wisataId !== action.payload.wisataId
        );
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default favoritesSlice.reducer;
