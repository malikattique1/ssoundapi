const pool = require("../../config/database");
const  search  = require("./users.router");

module.exports = {
  createuser: (data, callBack) => {
    pool.query("SELECT username FROM users WHERE Username= ?", [data.Username], function (err, rows,fields){
      if (err) throw err;
      if (rows.length) {
        console.log(rows[0].username+" already exists");
        //username starts with small letter auto in db 
        return callBack(null, rows[0].username+" already exists");
      }
      else{
        console.log('Success...');
        pool.query(
          `insert into users(FirstName,LastName,Username,email,password ) 
          values(?,?,?,?,?)`,
          [
            data.FirstName,
            data.LastName,
            data.Username,
            data.email,
            data.password,
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, "Signup Successfully");
          }
          );
      }
    });
   
    },
    loginuserbyemail: (email, callBack) => {
      pool.query(
        `select FirstName,LastName,Username,email,password from users where email = ?`,
        [
          email
        ],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        }
        );
      },
              };
              