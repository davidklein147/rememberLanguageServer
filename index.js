const express = require("express");
const app = express();
const con = require('./utils/sql');

app.listen(8090, function () {
    console.log('server is up');
});

app.use(require("cors")());
app.use(express.json());

require('./queries/createQuery')();
app.use('/auth', require("./routers/router"));

app.get('/get', (req, res) => {
    if(!req.body){
        return res.status(400).send({mas: "bed rqueste"})
    }
    console.log("get");
    con.query('select * from USERS', (err, result) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    })
})


//Alter user 'root'@'localhost' identified with mysql_native_password by 'z0533170147'
