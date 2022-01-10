const express = require("express");
const app = express();
const con = require('./utils/sql');
const port = 8090// process.env.PORT || `AIzaSyB5B1qXnahdx4NC9mNB52TRrxjK-WnBgB0`


app.listen(port, function () {
    console.log('server is up', port);
});

app.use(require("cors")());
app.use(express.json());


require('./queries/createQuery')();
app.use('/auth', require("./routers/authRouter"));
app.use('/api/', require("./controllers/tokenController"))
app.use('/api/env/', require("./routers/envRouter"))
app.use('/api/inputs/', require("./routers/inputRouter"))
app.use('/api/repetition/', require("./routers/repetiRouter"))
const tra = require("./controllers/googleContro").translate
console.log(tra);

app.post('/api/google/translate', require("./controllers/googleContro").translate)

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
