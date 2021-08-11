const con = require("../utils/sql");
const revers = require("../utils/rtl_lang_reverse")
const errors = require("../utils/utilities");
const { beginTransaction } = require("../utils/sql");
const querys = require("../utils/querys")

function inputsContro() {
    function create(req, res) {
        console.log("create");
        if(!req.body){
            res.status(401).send();
        }
        req.body.translateWord.translateWord = revers(req.body.translateWord.translateWord)
        beginTransaction(err =>{
            console.log(err);
        
            con.query(`select Id from SOURCE_WORDS where UserId = ${req.body.sourceWord.userId} and SourceWord = "${req.body.sourceWord.sourceWord}"`,
        (err, result) => {
            if(err){
                con.rollback(()=> {
                    console.log(con.release())
                });
                errors(res ,err);
            }
            let sourceId;
            if(result){
                console.log(result);
                sourceId = JSON.parse(JSON.stringify(result)).Id;
            }
            con.query(querys.objToInsertQuery("SOURCE_WORD", req.body.sourceWord, [1,2,3]),
            (err, newInsert) =>{
                if(err){
                    con.rollback();
                    errors(res, err);
                }
                
            })
        })
    });
        console.log(req.body);       
    }
    
    return {
        create
    }
}

module.exports = inputsContro()