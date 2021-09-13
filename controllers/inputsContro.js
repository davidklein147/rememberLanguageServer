const con = require("../utils/sql");
const revers = require("../utils/rtl_lang_reverse")
const errors = require("../utils/utilities");
const querys = require("../utils/querys");
const utilities = require("../utils/utilities");

function inputsContro() {
    function create(req, res) {
        let newSourctInsert;
        let newTranslated;
        let newRepetitionData;

        const selectSourceWord = () => {

        }

        const translatedWord = () => {
            con.query(`select * from TRANSLATE_WORDS where TranslateWord = "${req.body.translateWord.translateWord}"`,
                (err, result) => {
                    if (err) {
                        console.log("err");
                        con.rollback();
                        utilities.errors(res, err)
                    }
                    if (result.length != 0) {
                        console.log(result);
                        return res.status(400).send({ mes: "this word with this translate already exsist" })
                    }
                    con.query(querys.objToInsertQuery("TRANSLATE_WORDS", req.body.translateWord, [1, 2, 3, 4, 5]),
                        (err3, newTrans) => {
                            console.log("trans");
                            if (err3) {
                                con.rollback();
                                errors(res, err3);
                            }
                            console.log(newTrans);
                            req.body.repetitionData.translateWordId = newTrans.insertId;
                            newTranslated = newTrans
                            console.log(req.body.repetitionData.translateWordId);
                            console.log(req.body.repetitionData);
                            repetitionData();
                        })
                })
        }

        const repetitionData = () => {
            con.query(querys.objToInsertQuery("REPETITION_DATA", req.body.repetitionData, [1, 2, 3, 4, 5]),
                (err4, newData) => {
                    if (err4) {
                        con.rollback()
                        errors(res, err4)
                    }
                    newRepetitionData = newData
                    con.commit()
                    res.status(201).send({ newSourctInsert, newTranslated, newRepetitionData })
                })
        }

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
                    if (result.length !== 0) {
                        console.log(result[0]);

                        req.body.translateWord.sourceId = JSON.parse(JSON.stringify(result[0])).Id;
                        newSourctInsert = result
                        translatedWord()
                    } else {
                        console.log(result);
                        con.query(querys.objToInsertQuery("SOURCE_WORDS", req.body.sourceWord),
                            (err2, newInsert) => {
                                if (err2) {
                                    con.rollback(() => { });
                                    errors(res, err2);
                                }
                                req.body.translateWord.sourceId = newInsert.insertId;
                                newSourctInsert = newInsert
                                translatedWord()
                            }
                        )
                    }
                })
        });

        console.log(req.body);
    }

    return {
        create
    }
}

module.exports = inputsContro()
