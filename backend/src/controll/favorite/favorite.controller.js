const express = require("express");
const { addFavoriteService, getFavoritesService, deleteFavoriteService } = require("./favorite.services");
const { accessValidation } = require("../middleware/accesValidation.js");
const router = express.Router();

router.post("/", accessValidation, async (req, res) => {
  try {
    const { userId, wisataId } = req.body;
    const favorite = await addFavoriteService(userId, wisataId);
    res.status(201).json({
      message: "Favorite berhasil ditambahkan",
      data: favorite,
    });
  } catch (error) {
    res.status(400).json({ error: `Gagal: ${error.message}` });
  }
});

router.get("/:userId", accessValidation, async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await getFavoritesService(parseInt(userId, 10));
    res.status(200).json(favorites);
  } catch (error) {
    res.status(400).json({ error: `Gagal: ${error.message}` });
  }
});

router.delete('/:wisataId', accessValidation, async (req, res) => {
  try {
    const userId = req.userData.id;
    const { wisataId } = req.params;
    await deleteFavoriteService(userId, wisataId);
    res.json({ message: 'Favorite berhasil dihapus' });
  } catch (error) {
    res.status(400).json({ error: `Gagal menghapus favorit: ${error.message}` });
  }
});

module.exports = router;
