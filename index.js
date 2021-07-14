const express = require("express");
const app = express();
//const con = require("./utils/sql")
const mysql = require("mysql");
const port = 3306;


// const con = mysql.createConnection({
//     host: "sql-database-1.cdeshejf2wbv.us-east-2.rds.amazonaws.com",
//     port: 3306,
//     user: "admin",
//     password: "z0533170147",
//     database: "rememberlanguage",

// })

const con = mysql.createConnection({
    host: "localhost",
    port: port,
    user: "root",
    password: "z0533170147",
    database: "rememberlanguage",

})

app.listen(3306, function () {
    console.log('server is up');
});

app.use(require("cors")());
app.use(express.json());

//app.use("", console.log("app"));
app.get('/auth/logup', (req, res) => {
    console.log("log");


    con.query(`create table if not exists USERS(
    Id int not null auto_increment,
    Name nvarchar(255) not null,
    Password nvarchar(255) not null,
    Email nvarchar(255) not null,
    primary key(Id))`,
        (err, result) => {
            console.log(err, "  ", result);
            res.status(400).send();
        });
    con.query(
        `insert into Users (name, Email, password)
                 values(${req.body.name}, ${req.body.email},${req.body.password})`,
        (err, newInsert) => {
            if (err) {
                res.status(400).send();
            } else {
                res.status(200).send(newInsert)
            }
        })
});

// app.use('/auth', require("./routers/router"));

//Alter user 'root'@'localhost' identified with mysql_native_password by 'z0533170147'
