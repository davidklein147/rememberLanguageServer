const con = require("../utils/sql");
const revers = require("../utils/rtl_lang_reverse");
const utilities = require("../utils/utilities")();
const querys = require("../utils/querys");

function repetitionContro() {
  function dailyRepetitionList(req, res) {
    if (!req.params) {
      return res.status(400).send({ mas: "missing details" });
    } 
    con.query(
              `select
                a.SourceWord,
                b.TranslateWord, b.CreationDate, b.PartOfSpeech,
                c.TranslateWordId, c.Type, c.Lavel, c.RepetitionDate      
              from SOURCE_WORDS a 
                join TRANSLATE_WORDS b on b.SourceId = a.Id 
                join (select TranslateWordId, type, max(lavel) as lavel, max(repetitionDate) as repetitionDate from REPETITION_DATA group by TranslateWordId) as c 
                  on c.TranslateWordId = b.Id and c.repetitiondate <= 
                    ${utilities.setRepetitionDate(
                 //new Date(new Date().setDate(new Date().getDate() +1))
                    new Date()
               )}
               and a.UserId = ${req.params.id}`,

      (err, results) => {
        err ? utilities.errors(res, err) : res.status(200).send(results);
      }
    );
  }

  function addNextDate(req, res) {
    if (!req.body) {
      res.status(400).send({ mas: "missing details" });
    }
    con.query(
      querys.objToInsertQuery("REPETITION_DATA", req.body),
      (err, newDate) => {
        if (err) {
          utilities.errors(res, err);
        }
        res.status(201).send({newDate: newDate});
      }
    );
  }
  return {
    dailyRepetitionList,
    addNextDate,
  };
}

module.exports = repetitionContro();
