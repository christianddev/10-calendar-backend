const { Router } = require("express");
const { check } = require("express-validator");

const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/fields-validator");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.post(
  "/new",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 6 }),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 6 }),
    validateFields,
  ],
  loginUser
);
router.get("/renew", [validateJWT], renewToken);

module.exports = router;
