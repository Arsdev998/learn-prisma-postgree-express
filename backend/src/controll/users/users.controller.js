const bcrypt = require("bcrypt");
const express = require("express");
const prisma = require("../../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const accessValidation = require("../middleware/accesValidation");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  res.json({
    message: "user Created",
    result,
  });
});

// Login route
// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.password) {
      return res.status(403).json({ message: "Password not set" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const payload = {
        id: user.id,
        name: user.name,
        address: user.address,
      };

      const secret = process.env.JWT_SECRET;
      const expiresIn = 60 * 60 * 1; // 1 hour

      const token = jwt.sign(payload, secret, { expiresIn: expiresIn });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: expiresIn * 1000, // Expiry time dalam milidetik
      });

      return res.json({
        data: {
          id: user.id,
          name: user.name,
          address: user.address,
        },
        token: token,
      });
    } else {
      return res.status(403).json({ message: "Wrong password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Successfully logged out" });
});

router.post("/create", accessValidation, async (req, res) => {
  const { name, email, address } = req.body;

  const result = await prisma.user.create({
    data: {
      name: name,
      email: email,
      address: address,
    },
  });
  res.json({
    data: result,
    message: "user created",
  });
});

router.delete("/delete/:id", accessValidation, async (req, res) => {
  const { id } = req.params;

  const result = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json({
    message: `user ${id}, delete`,
  });
});

module.exports = router;
