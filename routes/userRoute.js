const upload = require("../config/multer");
const {
  getUserProfile,
  getEditProfileForm,
  updateUserProfile,
  deleteUserAccount,
} = require("../controllers/userController");
const { ensureAuthenticated } = require("../middlewares/auth");
ensureAuthenticated;
const profileRoute = express.Router();

profileRoute.get("/profile", ensureAuthenticated, getUserProfile);

//render edit profile
profileRoute.get("/edit", ensureAuthenticated, getEditProfileForm);
profileRoute.post(
  "/profile",
  ensureAuthenticated,
  upload.single("image"),
  updateUserProfile
);
profileRoute.post("/delete", ensureAuthenticated, deleteUserAccount);

module.exports = profileRoute;
