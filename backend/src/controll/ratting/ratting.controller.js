// src/controll/rating/rating.controller.js
const express = require("express");
const {
  getAllRatingsByWisataId,
  createNewRating,
  updateExistingRating,
  removeRating,
  getRatingById,
} = require("./ratting.services.js");
const { accessValidation } = require("../middleware/accesValidation.js");
const router = express.Router();

router.use(express.json());

router.get("/wisata/:wisataId", async (req, res) => {
  try {
    const ratings = await getAllRatingsByWisataId(parseInt(req.params.wisataId));
    res.send(ratings);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch ratings" });
  }
});

router.post("/", accessValidation, async (req, res) => {
  try {
    const ratingData = req.body;
    ratingData.userId = req.userData.id; // Menggunakan ID pengguna dari token
    const rating = await createNewRating(ratingData);
    res.status(201).send(rating);
  } catch (error) {
    res.status(400).send({ error: `Failed: ${error.message}` });
  }
});

router.patch("/:id", accessValidation, async (req, res) => {
  try {
    const ratingId = parseInt(req.params.id);
    const ratingData = req.body;
    const rating = await updateExistingRating(ratingId, ratingData);
    res.send({ rating, message: "Rating updated successfully" });
  } catch (error) {
    res.status(400).send({ error: "Failed to update rating" });
  }
});

router.delete("/:id", accessValidation, async (req, res) => {
  try {
    const ratingId = parseInt(req.params.id);
    await removeRating(ratingId);
    res.send({ message: "Rating deleted" });
  } catch (error) {
    res.status(400).send({ error: "Failed to delete rating" });
  }
});

module.exports = router;
