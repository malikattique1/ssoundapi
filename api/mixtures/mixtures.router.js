const router6 = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  uploadFile,
  create,
  getallmixtures,
  deletemixture
} = require("./mixtures.controller");



router6.post("/deletemixture", checkToken, deletemixture);
router6.post("/createmixture", checkToken,uploadFile,create);
router6.get("/getallmixtures", checkToken, getallmixtures);
// router6.get("/getallmixtures", getallmixtures);

module.exports = router6;

