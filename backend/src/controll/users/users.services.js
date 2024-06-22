const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserProfilePic,
  deleteUserById,
  updateUserDetails,
} = require("./users.repository");
const cloudinary = require("../../config/cloudinary");

const generateToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
  };

  const secret = process.env.JWT_SECRET;
  const expiresIn = 60 * 60 * 1; // 1 hour

  return jwt.sign(payload, secret, { expiresIn });
};

const registerUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await createUser({ ...userData, password: hashedPassword });

  const token = generateToken(user);

  return {
    data: {
      id: user.id,
      name: user.name,
    },
    token,
  };
};

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.password) {
    throw new Error("Password not set");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Wrong password");
  }

  const token = generateToken(user);

  return {
    data: {
      id: user.id,
      name: user.name,
    },
    token,
  };
};

const logoutUser = async (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
};

const uploadProfilePic = async (token, file) => {
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  // Upload new profile picture to Cloudinary
  const result = await cloudinary.uploader.upload(file.path, {
    folder: "profile-pics",
  });

  // Update user's profile picture in the database
  return await updateUserProfilePic(userId, result.secure_url);
};

const updateUser = async (token, userDetails) => {
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  if (userDetails.file) {
    // Remove old profile picture from Cloudinary
    const user = await findUserById(userId);
    if (user.profilePic) {
      const publicId = user.profilePic.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`profile-pics/${publicId}`);
    }

    // Upload new profile picture to Cloudinary
    const result = await cloudinary.uploader.upload(userDetails.file.path, {
      folder: "profile-pics",
    });
    userDetails.profilePic = result.secure_url;
    delete userDetails.file; // Hapus properti file sebelum mengirim ke Prisma
  }

  return await updateUserDetails(userId, userDetails);
};



const deleteUser = async (id) => {
  await deleteUserById(id);
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  uploadProfilePic,
  updateUser,
  deleteUser,
};
