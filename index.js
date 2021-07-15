const express = require("express");
const app = express();
const con = require('./utils/sql');

app.listen(8090, function () {
    console.log('server is up');
});

app.use(require("cors")());
app.use(express.json());

app.use('/auth', require("./routers/router"));

app.get('/get', (req, res) => {
    con.query('select * from users', (err, result) => {
        if (err) {
            throw res.status(400).send(err);
        }
        res.status(200).send(result);
    })
})

// app.use('/auth', require("./routers/router"));

//Alter user 'root'@'localhost' identified with mysql_native_password by 'z0533170147'
