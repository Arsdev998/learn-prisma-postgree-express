const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

const wisata = require("./controll/wisata/wisata.controller.js");
const auth = require("./controll/users/users.controller.js");
const google = require("./controll/google/google.js");

app.use("/", google);
app.use("/wisata", wisata);
app.use("/auth", auth);

// Middleware untuk penanganan kesalahan
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something broke!', details: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Express API running on port:", PORT);
});
