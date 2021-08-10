const express = require("express");
const app = express();
const con = require('./utils/sql');

app.listen(8090, function () {
    console.log('server is up');
});

app.use(require("cors")());
app.use(express.json());

require('./queries/createQuery')();
app.use('/auth', require("./routers/authRouter"));
app.use('/api/', require("./controllers/tokenController"))
app.use('/api/env/', require("./routers/envRouter"))
app.use('/api/inputs/', require("./routers/inputRouter"))

app.get('/get', (req, res) => {
    
    console.log("get");
    con.query('select * from TRANSLATE_WORDS', (err, result) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    })
})

app.get('/gett', (req, res) => {
    console.log("gett");
    
    con.query(`select SOURCE_WORDS.SourceWord, TranslateWord , CreationDate from TRANSLATE_WORDS 
    inner JOIN SOURCE_WORDS ON TRANSLATE_WORDS.SourceId = SOURCE_WORDS.Id and UserId = 1`,
     (err, result) => {
        if (err) {
            return res.status(400).send(err);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.status(200).send(result);
    })
})


//Alter user 'root'@'localhost' identified with mysql_native_password by 'z0533170147'
