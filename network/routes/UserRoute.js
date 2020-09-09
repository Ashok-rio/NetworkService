const express = require("express");
const route = express.Router();
const Validation = require("../middleware/Validation");
const UserController = require("../controllers/UserController");

const passport = require("passport");
require("../middleware/Passport")(passport);

route.post("/register", Validation.registerValidation); //register route
route.post("/login", UserController.login); //login route
route.get("/", UserController.get_user); //getAll route

route.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  UserController.get_users
);

route.delete(
  "/deleteUser",
  passport.authenticate("jwt", { session: false }),
  UserController.deleteUser
); 

route.put(
  "/updateUser",
  passport.authenticate("jwt", { session: false }),
  UserController.updateUser
); 

module.exports = route;
