const { google } = require("googleapis");
const express = require("express");
const prisma = require("../../db");
const router = express.Router();
const jwt = require("jsonwebtoken");

const oauthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/auth/google/callback"
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const authorizationUrl = oauthClient.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

//GOOGlE Login
router.get("/auth/google", (req, res) => {
  res.redirect(authorizationUrl);
});

// GOOGlE CALLBACK
router.get("auth/google/callback", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauthClient.getToken(code);
  oauthClient.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauthClient,
    version: "v2",
  });
  const { data } = await oauth2.userinfo.get();
  if (!data.email || !data.name) {
    return res.json({
      data: data,
    });
  }
  let user = await prisma.user.findUnique({
    where: data.email,
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        address: "-",
      },
    });
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
      secure: process.env.NODE_ENV === "production", // Hanya gunakan secure pada environment produksi
      maxAge: expiresIn * 1000, // Expiry time dalam milidetik
    });

    // return res.redirect(`http://localhost:3000/auth-success?token=${token}`)
    return res.json({
      data: {
        id: user.id,
        name: user.name,
        address: user.address,
      },
      token: token,
    });
  }
});

module.exports = router;
