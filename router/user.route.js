const router = require("express").Router();

const { userRegister, userLogin } = require("../controller/user.controller");

router.post("/register", userRegister);
router.post("/login", userLogin);

module.exports = router;
