const {
  getAllWisata,
  getWisataById,
  createWisata,
  deleteWisata,
  updateWisata,
} = require("./wisata.services.js");
const upload = require("../../config/multer");

const express = require("express");
const {
  adminValidation,
  accessValidation,
} = require("../middleware/accesValidation.js");
const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const wisata = await getAllWisata();
    res.send(wisata);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch wisata" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const wisataId = parseInt(req.params.id);
    const wisata = await getWisataById(wisataId);
    res.send(wisata);
  } catch (error) {
    res.status(400).send({ error: "Wisata Not found" });
  }
});

router.post(
  "/",
  accessValidation,
  adminValidation,
  upload.fields([
    { name: "coverimg", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const { name, description, provinsi, kabupaten, kecematan, maps } =
        req.body;
      const coverimg = req.files.coverimg[0].path;
      const images = req.files.images.map((file) => ({ url: file.path }));

      const newWisataData = {
        name,
        description,
        provinsi,
        kabupaten,
        kecematan,
        maps,
        coverimg,
        images,
      };

      const wisata = await createWisata(newWisataData);
      res.status(201).send(wisata);
    } catch (error) {
      res.status(400).send({ error: `Failed: ${error.message}` });
    }
  }
);

router.delete("/:id", accessValidation,adminValidation, async (req, res) => {
  try {
    const wisataId = req.params.id;
    await deleteWisata(parseInt(wisataId));
    res.send({ message: "Wisata deleted" });
  } catch (error) {
    console.error("Error deleting wisata:", error);
    res.status(400).send({ error: error.message });
  }
});

router.patch(
  "/:id",
  accessValidation,
  adminValidation,
  upload.fields([
    { name: "coverimg", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  async (req, res, next) => {
    try {
      const wisataId = req.params.id;
      const wisataData = req.body;
      if (req.files.coverimg) {
        wisataData.coverimg = req.files.coverimg[0].path;
      }
      if (req.files.images) {
        wisataData.images = req.files.images.map((file) => file.path);
      }
      const wisata = await updateWisata(parseInt(wisataId), wisataData);
      res.send({ wisata, message: "Wisata updated successfully" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
