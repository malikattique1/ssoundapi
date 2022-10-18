
var bcrypt = require('bcrypt');
var config = require('../../config.js'); 

const {
  createuser,
  loginuserbyemail,
} = require("./users.service");
const { hashSync, genSaltSync} = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
  login: (req, res) => {
    const body = req.body;
    loginuserbyemail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
      // console.log(results);
      const result = bcrypt.compareSync(body.password, results.password);
      // console.log(result);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, config.secret, {
          // expiresIn: "1h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  },
  createuser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createuser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: err.code,
          message: err.sqlMessage
        });
      }
      return res.status(200).json({
        success: 1,
        message: results,
      });
    });
  },
};
