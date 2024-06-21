const { google } = require("googleapis");
const express = require("express");
const prisma = require("../../db/index.js");
const router = express.Router();
const jwt = require("jsonwebtoken");

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/auth/google/callback"
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const authorizationUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

router.get("/auth/google", (req, res) => {
  res.redirect(authorizationUrl);
});

router.get("/auth/google/callback", async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oAuth2Client,
      version: "v2",
    });
    const { data } = await oauth2.userinfo.get();
    if (!data.email || !data.name) {
      return res.json({
        data: data,
      });
    }
    let user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          profilePic: data.picture, // Jika ingin menyimpan gambar profil dari Google
        },
      });
    }

    const payload = {
      id: user.id,
      name: user.name,
      profilePic: user.profilePic,
    };

    const secret = process.env.JWT_SECRET;
    const expiresIn = 60 * 60 * 1; // 1 hour

    const token = jwt.sign(payload, secret, { expiresIn: expiresIn });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  } catch (error) {
    console.error("Error during Google OAuth callback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
