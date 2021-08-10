const con = require("../utils/sql");
const reverse = require("../utils/rtl_lang_reverse")

function inputsContro() {
    function create(req, res) {
        console.log("create");
        req.body.translateWord.translateWord = reverse(req.body.translateWord.translateWord)
        console.log(req.body);
        
    }
    
    return {
        create
    }
}

module.exports = inputsContro()