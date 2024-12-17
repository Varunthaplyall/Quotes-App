const router = require("express").Router();
const { Login, Register } = require("../controller/authController");
const { tokenValidation } = require("../middleware/tokenCheck");

router.post("/register", Register);
router.post("/login", Login);

module.exports = router;
