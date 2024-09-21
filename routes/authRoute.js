const express = require("express");
const userRoutes = express.Router();
const User = require("/Users/adityavikram/Desktop/Projects WD/Fullstack-Blog-Project/models/User.js");
const {
  getLogin,
  login,
  getRegister,
  register,
  logout,
} = require("/Users/adityavikram/Desktop/Projects WD/Fullstack-Blog-Project/controllers/authController.js");
const bcrypt = require("bcrypt");

//Login Page Route
userRoutes.get("/login", getLogin);

//Login Logic
userRoutes.post("/login", login);

//Register Page Route
userRoutes.get("/register", getRegister);
//Registration Logic
userRoutes.post("/register", register);

//Logout
userRoutes.get("/logout", logout);

module.exports = userRoutes;
