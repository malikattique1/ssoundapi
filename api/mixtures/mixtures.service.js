const pool = require("../../config/database");

module.exports = {
  createmixture: (file,body, cb) => {
    const file1 = file['clipArt'][0] // single img
    if (!file1.filename.toLowerCase().match(/\.(png)/g)) {
      throw new Error("Only supports png file format");
    }

    const file2 = file['mainImage'][0] // single img
    if (!file1.filename.toLowerCase().match(/\.(png)/g)) {
      throw new Error("Only supports png file format");
    }
    // const path = require('path');
    // const mixturesdirectory = path.join(__dirname, '../../upload/mixtures/clipArts');
    
    
    hostpath="http://localhost:5001/"
    // hostpath="https://sleep.funsdevops.com/"
    const mixturesclipartdirectory = hostpath+'upload/mixtures/clipArts';
    const mixturesmainimagedirectory = hostpath+'upload/mixtures';
    
    
    pool.query(
      `insert into mixtures(name,clipArt,mainImage,genre) 
      values(?,?,?,?) ; insert into mixtureitem(mixtureId,soundId,volume) 
      values(?,?,?)`,
      [
        body.name,
        mixturesclipartdirectory+'/'+file1.filename,
        // mixturesdirectory+'\\'+file1.filename,
        mixturesmainimagedirectory+'/'+file2.filename,
        body.genre,
        body.mixtureId,
        body.soundId,
        body.volume,
      ],
      (error, results, fields) => {
        if (error) {
          cb(error);
        }
        return cb(null, results);
      }
      );

         
    // pool.query(
    //   `insert into mixtureitem(mixtureId,soundId,volume) 
    //   values(?,?,?)`,
    //   [
    //     body.mixtureId,
    //     body.soundId,
    //     body.volume,
    //   ],
    //   (error, results, fields) => {
    //     if (error) {
    //       cb(error);
    //     }
    //     return cb(null, results);
    //   }
    //   );





    },
    
    getallmixtures: callBack => {
      pool.query(
        `select id,name,clipArt,mainImage,genre from mixtures`,
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
        );
      },
      
      
      deletemixture: (data, callBack) => {
        pool.query(
          `delete from mixtures where id = ?`,
          [data.id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
          );
        }
        
        
      };
      