const express = require("express");
const authController = require("../controllers/auth.controller.js");
const { route } = require("./transaction.routes.js");


const router = express.Router();

/* POST /api/auth/register */
router.post("/register", authController.userRegisterController)

/* POST /api/auth/login */
router.post("/login", authController.userLoginController)

/**
 * -POST /api/auth/logout
 */

router.post("/logout", authController.userLogoutController);

module.exports = router;