const express = require("express");
const authMiddleware = require("../middleware/auth.middleware.js");
const accountController = require("../controllers/account.controller.js");

const router = express.Router();

/**
 * - POST /api/accounts/
 * - Create a new account
 * - Protected Routes
 */
router.post("/", authMiddleware.authMiddleware, accountController.createAccountController);

/**
 * - GET /api/accounts/
 * - Get all accounts for the logged-in user
 * - Protected Route
 */
router.get("/", authMiddleware.authMiddleware, accountController.getUserAccountController);

/**
 * - GET /api/accounts/balance/:accountId
 */

router.get("/balance/:accountId", authMiddleware.authMiddleware, accountController.getAccountBalanceController)

module.exports = router;