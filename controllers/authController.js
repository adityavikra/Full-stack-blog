const express = require("express");
const bcrypt = require("bcrypt");
const User = require("/Users/adityavikram/Desktop/Projects WD/Fullstack-Blog-Project/models/User.js");
const passport = require("passport");

//Login
exports.getLogin = (req, res) => {
  res.render("login", {
    title: "Login",
    error: "",
    user: req.user,
  });
};

//Login Logic
exports.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("login", {
        title: "Login",
        user: req.username,
        error: info.message,
      });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

//Register
exports.getRegister = (req, res) => {
  res.render("register", {
    title: "Register",
    username: req.username,
    error: "",
  });
};

//Register Logic
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("register", {
        title: "Register",
        user: req.username,
        error: "User Already Exist",
      });
    }
    //hash Password
    const hashPassword = await bcrypt.hash(password, 10);
    //save user
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    res.redirect("/auth/login");
  } catch (error) {
    res.render("register", {
      title: "Register",
      user: req.username,
      error: error.message,
    });
  }
};

//Logout
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/login");
  });
};
