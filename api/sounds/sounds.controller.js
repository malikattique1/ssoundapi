
const {
  deletesound,
  createsound,
  getallsounds,

  getallgenrenames,
  getallsoundsbygenre,
  getallsoundsbyid,
  getallidsbygenre

} = require("./sounds.service");


const multer = require("multer");
const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    if (file.fieldname === "icon") {
      cb(null, './upload/sounds/icons');
    }
    else if (file.fieldname === "backgroundImg") {
      cb(null, './upload/sounds/backgroundImg')
    }
    else if (file.fieldname === "filePath") {
      cb(null, './upload/sounds/filePath')
    }
  
  },
  filename: (req,file,cb)=>{
    if (file.fieldname === "icon") {
      return cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    }
    else if (file.fieldname === "backgroundImg") {
      return cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    }
    else if (file.fieldname === "filePath") {
      return cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    }
  }
});
const file_filter = (req, file, cb) => {
  if (file.mimetype =="image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg"|| file.mimetype == "image/webp" || file.mimetype == "audio/ogg" || file.mimetype == "audio/mpeg") {
    cb(null, true) } else { cb(null, false)}
  }
  
  
  
  module.exports = {
    uploadFile:function(req,res,next){
      const upload = multer({
        storage: storage,
        fileFilter: file_filter,
        limits: {
          // fileSize: 100
        }
      })
      .fields([{name:'icon',maxCount:10},{name:'backgroundImg',maxCount:10},{name:'filePath',maxCount:10}]);
      
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
      createsound(file,body, (err, results) => {
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




    getallgenrenames: (req, res) => {
      getallgenrenames((err, results) => {
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

    getallsoundsbygenre: (req, res) => {
      const genre = req.params.genre;
      getallsoundsbygenre(genre, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },


    getallsoundsbyid: (req, res) => {
      const id = req.params.id;
      getallsoundsbyid(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },

    getallidsbygenre: (req, res) => {
      const genre = req.params.genre;
      getallidsbygenre(genre, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },





    getallsounds: (req, res) => {
      getallsounds((err, results) => {
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

    
    deletesound: (req, res) => {
      const data = req.body;
      deletesound(data, (err, results) => {
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
  