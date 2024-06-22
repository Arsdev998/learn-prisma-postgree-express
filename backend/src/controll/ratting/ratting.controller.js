const express = require("express");
const router = express.Router();
const {
  createRating,
  getRatingsForWisata,
  removeRating,
  editRating,
} = require("./ratting.services");
const { accessValidation } = require("../middleware/accesValidation");

router.post("/", accessValidation, async (req, res) => {
  try {
    const { value, wisataId } = req.body;
    const userId = req.userData.id;
    const rating = await createRating(userId, wisataId, value);
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ error: `Failed: ${error.message}` });
  }
});

router.get("/wisata/:wisataId", async (req, res) => {
  try {
    const ratings = await getRatingsForWisata(parseInt(req.params.wisataId));
    res.json(ratings);
  } catch (error) {
    res.status(400).json({ error: `Failed: ${error.message}` });
  }
});

router.delete("/:id", accessValidation, async (req, res) => {
  try {
    const ratingId = parseInt(req.params.id);
    const userId = req.userData.id;
    const userRole = req.userData.role;
    await removeRating(ratingId, userId, userRole);
    res.json({ message: "Rating deleted" });
  } catch (error) {
    res.status(400).json({ error: `Failed: ${error.message}` });
  }
});

router.put("/:id", accessValidation, async (req, res) => {
  try {
    const ratingId = parseInt(req.params.id);
    const { value } = req.body;
    const userId = req.userData.id;
    const userRole = req.userData.role;
    const rating = await editRating(ratingId, value, userId, userRole);
    res.json(rating);
  } catch (error) {
    res.status(400).json({ error: `Failed: ${error.message}` });
  }
});

module.exports = router;
