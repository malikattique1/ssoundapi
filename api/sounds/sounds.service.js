const pool = require("../../config/database");
module.exports = {
  
  
  createsound: (file,body, cb) => {
    const file1 = file['icon'][0] // single img
    const file2 = file['backgroundImg'][0] // single img
    const file3 = file['filePath'][0] // single img
    
    
    // if (!file1.filename.toLowerCase().match(/\.(png)/g)) {
    //   throw new Error("Only supports png file format");
    // }
    // const path = require('path');
    
    hostpath="http://localhost:5001/"
    // hostpath="https://sleep.funsdevops.com/"

    const iconsdirectory = hostpath+'upload/sounds/icons';
    const backgroundimgdirectory = hostpath+'upload/sounds/backgroundImg';
    const soundsdirectory = hostpath+'upload/sounds/filePath';
    
    // const iconsdirectory = path.join(__dirname, '../../upload/sounds/icons');
    // const soundsdirectory = path.join(__dirname, '../../upload/sounds');
    
    pool.query(
      `insert into sounds(name, icon,backgroundImg,filePath,genre) 
      values(?,?,?,?,?)`,
      [
        body.name,
        // iconsdirectory+'\\'+file1.filename,
        iconsdirectory+'/'+file1.filename,
        backgroundimgdirectory+'/'+file2.filename,
        soundsdirectory+'/'+file3.filename,
        body.genre,
      ],
      (error, results, fields) => {
        if (error) {
          cb(error);
        }
        return cb(null, results);
      }
      );
    },
    






    getallgenrenames: callBack => {
      pool.query(
        `select distinct genre from sounds`,
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
        );
      },

      getallsoundsbygenre: (genre, callBack) => {
            pool.query(
              `select id,name,icon,backgroundImg,filePath,genre from sounds where genre = ?`,
              [genre],
              (error, results, fields) => {
                if (error) {
                  callBack(error);
                }
                return callBack(null, results);
              }
              );
          },


          getallsoundsbyid: (id, callBack) => {
            pool.query(
              `select id,name,icon,backgroundImg,filePath,genre from sounds where id = ?`,
              [id],
              (error, results, fields) => {
                if (error) {
                  callBack(error);
                }
                return callBack(null, results);
              }
              );
          },

          getallidsbygenre: (genre, callBack) => {
            pool.query(
              `select id from sounds where genre = ?`,
              [genre],
              (error, results, fields) => {
                if (error) {
                  callBack(error);
                }
                return callBack(null, results);
              }
              );
          },

















    
    
    getallsounds: callBack => {
      pool.query(
        `select id,name, icon,backgroundImg, filePath ,genre from sounds`,
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
        );
      },
      
      
      deletesound: (data, callBack) => {
        pool.query(
          `delete from sounds where id = ?`,
          [data.id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
          );
        },
        
        
        
        
        
      };
      