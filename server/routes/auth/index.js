const express = require("express");
const {
  userSignUp,
  userSignIn,
  userSignOut,
  userRefreshToken,
} = require("../../controller/auth");
const router = express.Router();

router.post("/sign-up", userSignUp);
router.post("/sign-in", userSignIn);
router.post("/sign-out", userSignOut);
router.post("/refresh", userRefreshToken);

module.exports = router;
