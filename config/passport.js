const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("Fullstack-Blog-Project/models/User.js");

module.exports = function (passport) {
  passport.use(
    new localStrategy({ usernameField: "email" }, async (email, pass, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, {
            message: "User not found",
          });
        }
        //Compare the provided password with hasher password
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
          return done(null, false, {
            message: "Incorrect password",
          });
        }
        //Authentication Successful
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
  //serializeUser
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  //deserialize user
  passport.deserializeUser(async function (id, done) {
    try {
      const user = User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
