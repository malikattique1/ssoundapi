const {
  deletemixture,
  createmixture,
  getallmixtures,
} = require("./mixtures.service");


const multer = require("multer");
const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    if (file.fieldname === "clipArt") {
      cb(null, './upload/mixtures/clipArts');
    }
    else if (file.fieldname === "mainImage") {
      cb(null, './upload/mixtures/mainImage');
    }
  },
  filename: (req,file,cb)=>{
    if (file.fieldname === "clipArt") {
      return cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    }
    else if (file.fieldname === "mainImage") {
      return cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    }
  }
});
const file_filter = (req, file, cb) => {
  if (file.mimetype =="image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg"|| file.mimetype == "image/webp") {
    cb(null, true) } else { cb(null, false)}
  }
  
  
  
  module.exports = {
    uploadFile:function(req,res,next){
      const upload = multer({
        storage: storage,
        fileFilter: file_filter,
        limits: {
          fileSize: '20mb'
        }
      })
      .fields([{name:'clipArt',maxCount:10},{name:'mainImage',maxCount:10}]);
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          res.send(err);
        } else if (err) {
          res.send(err);
        }else{
          next();
        }
      })
    },
    create: (req, res) => {
      const body = req.body;
      const file = req.files;
      createmixture(file,body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        res.json({
          success: 1,
          message: "created successfully",
        });
      });
    },
    
    
    getallmixtures: (req, res) => {
      getallmixtures((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },

    deletemixture: (req, res) => {
      const data = req.body;
      deletemixture(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (results) {
          return res.json({
            success: 0,
            message: "Record Not Found"
          });
        }
        return res.json({
          success: 1,
          message: "deleted successfully"
        });
      });
    },
    
  };
  