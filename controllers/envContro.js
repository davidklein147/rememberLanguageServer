const con = require("../utils/sql");

function envContro() {
    function getLang(req, res) {
          con.query(`select * from LANGUAGES`, (err, results) => {
              if(err){
                  return res.status(500).send()
              }
              res.status(200).send(results);
          })      
    }

    return {
        getLang
    }
}

module.exports = envContro()