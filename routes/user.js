const express = require("express");
const router = express.Router();
// load controller
const { handleUserSignup, handleUserLogin } = require("../controllers/user");


router.post("/", handleUserLogin);
router.post("/signup", handleUserSignup);

// group router
// router.route("/").get(handleUserSignup).post(handleUserSignup);

module.exports = router;
