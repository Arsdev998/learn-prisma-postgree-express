const express = require("express");
const { getFavoritesByUserId, addFavorite, removeFavorite } = require("./favorite.services.js");
const router = express.Router();
const { accessValidation } = require("../middleware/accesValidation");

router.get("/:userId", accessValidation, async (req, res) => {
  try {
    const favorites = await getFavoritesByUserId(parseInt(req.params.userId));
    res.send(favorites);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch favorites" });
  }
});

router.post("/", accessValidation, async (req, res) => {
  try {
    const favoriteData = req.body;
    const favorite = await addFavorite(favoriteData);
    res.status(201).send(favorite);
  } catch (error) {
    res.status(400).send({ error: `Failed: ${error.message}` });
  }
});

router.delete("/:id", accessValidation, async (req, res) => {
  try {
    await removeFavorite(parseInt(req.params.id));
    res.send({ message: "Favorite deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
