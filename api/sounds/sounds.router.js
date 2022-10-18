const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  deletesound,
  create,
  uploadFile,
  getallsounds,

  getallgenrenames,
  getallsoundsbygenre,
  getallsoundsbyid,
  getallidsbygenre
  
} = require("./sounds.controller");


router.get("/getallidsbygenre/:genre", checkToken, getallidsbygenre);

router.get("/getallsoundsbyid/:id", checkToken, getallsoundsbyid);

router.get("/getallsoundsbygenre/:genre", checkToken, getallsoundsbygenre);

router.get("/getallgenrenames", checkToken, getallgenrenames);

router.post("/deletesound", checkToken, deletesound);

router.get("/getallsounds", checkToken, getallsounds);
// router.get("/getallsounds", getallsounds);

router.post("/createsound", checkToken,uploadFile,create);
// router.post("/createsound",uploadFile,create);



module.exports = router;
