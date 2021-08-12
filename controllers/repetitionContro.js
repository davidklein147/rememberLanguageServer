const con = require("../utils/sql");
const revers = require("../utils/rtl_lang_reverse")
const utilities = require("../utils/utilities")();

function repetitionContro() {
    function dailyRepetitionList(req, res) {
        if(!req.params){
            return res.status(400).send( {mas: "missing details"})
        }
        con.query(
        `select
         a.SourceWord,
         b.TranslateWord, b.CreationDate, b.PartOfSpeech, 
         c.TranslateWordId, c.Type, c.Lavel, c.RepetitionDate
        from SOURCE_WORDS a, TRANSLATE_WORDS b, REPETITION_DATA c
        where 
         a.UserId = ${req.params.id} and
         b.SourceId = a.Id and c.TranslateWordId = b.Id and
         c.RepetitionDate <= ${utilities.setRepetitionDate(new Date(new Date().setDate(new Date().getDate() +1)))}`,
        (err, results) =>{
           err? utilities(res, err): 
           res.status(200).send(results)
        })

    }
    return {
        dailyRepetitionList
    }
}

module.exports = repetitionContro()