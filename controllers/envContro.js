const con = require("../utils/sql");

function envContro() {
    function getLang(req, res) {
        console.log("lang");
          con.query(`select * from LANGUAGES`, (err, results) => {
              if(err){
                  return res.status(500).send()
              }
              res.status(200).send(results);
          })      
    }

    function getPartOfSpeech(req, res) {
        console.log("part");
        con.query(`select * from PART_OF_SPEECH`, (err, results) => {
            if(err){
                return res.status(500).send()
            }
            res.status(200).send(results);
        })      
  }

    return {
        getLang,
        getPartOfSpeech
    }
}

module.exports = envContro()