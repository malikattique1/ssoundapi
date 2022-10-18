const router8 = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");
const {
  createuser,
  login,
} = require("./users.controller");

router8.post("/",createuser);
// router8.post("/", checkToken,createuser);
router8.post("/login", login);
module.exports = router8;





