const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  uploadProfilePic,
  deleteUser,
  updateUser,
  getUserById,
} = require("./users.services");
const multer = require("multer");
const {
  adminValidation,
  accessValidation,
} = require("../middleware/accesValidation");

// Middleware untuk mengunggah file menggunakan multer
const upload = multer({ dest: "uploads/profile-pics/" });

// Daftar pengguna baru
router.post("/register", async (req, res) => {
  try {
    const userData = req.body;
    const result = await registerUser(userData);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour in milliseconds
    });

    res.json({
      message: "User created",
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login pengguna
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour in milliseconds
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout pengguna
router.post("/logout", async (req, res) => {
  try {
    await logoutUser(res);
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(
  "/upload-profile-pic",
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const { file } = req;
      const token = req.cookies.token;
      const user = await uploadProfilePic(token, file);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.put("/update", upload.single("profilePic"), async (req, res) => {
  try {
    const token = req.cookies.token;
    const userDetails = {
      name: req.body.name,
      file: req.file,
    };
    const user = await updateUser(token, userDetails);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hapus pengguna
router.delete("/delete/:id", adminValidation, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(parseInt(id));
    res.json({ message: `User ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/me", accessValidation, async (req, res) => {
  try {
    const user = await getUserById(req.userData.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
