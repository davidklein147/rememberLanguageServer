const con = require("../utils/sql");
const revers = require("../utils/rtl_lang_reverse")
const errors = require("../utils/utilities");
const querys = require("../utils/querys");

function inputsContro() {
    function create(req, res) {
        console.log("create");
        if (!req.body) {
            res.status(401).send();
        }
        console.log("test");
        //req.body.translateWord.translateWord = revers(req.body.translateWord.translateWord)
        con.beginTransaction(err => {
            console.log(err);
            con.query(`select Id from SOURCE_WORDS where UserId = ${req.body.sourceWord.userId} 
                    and SourceWord = "${req.body.sourceWord.sourceWord}"
                    and SourceLang = ${req.body.sourceWord.sourceLang}`,
                (err1, result) => {
                    if (err1) {
                        con.rollback(() => { });
                        errors(res, err);
                    }
                    if (result) {
                        console.log(result);
                        req.body.translateWord.sourceId = result.Id;// JSON.parse(JSON.stringify(result)).Id;
                    }
                    con.query(querys.objToInsertQuery("SOURCE_WORDS", req.body.sourceWord, [1, 2, 3]),
                        (err2, newSourctInsert) => {
                            if (err2) {
                                con.rollback(() => { });
                                errors(res, err2);
                            }
                            req.body.translateWord.sourceId = newSourctInsert.insertId;
                            con.query(querys.objToInsertQuery("TRANSLATE_WORDS", req.body.translateWord, [1, 2, 3, 4, 5]),
                                (err3, newTrans) => {
                                    if (err3) {
                                        con.rollback();
                                        errors(res, err3);
                                    }
                                    console.log(newTrans);
                                    req.body.repetitionData.translateWordId = newTrans.insertId;
                                    console.log(req.body.repetitionData.translateWordId);
                                    console.log(req.body.repetitionData);
                                    con.query(querys.objToInsertQuery("REPETITION_DATA", req.body.repetitionData, [1, 2, 3, 4, 5]),
                                        (err4, newData) => {
                                            if (err4) {
                                                con.rollback()
                                                errors(res, err4)
                                            }

                                            con.commit()
                                            res.status(201).send( {newSourctInsert, newTrans , newData})

                                        })
                                })
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