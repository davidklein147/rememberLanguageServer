const mysql = require("mysql");
require('dotenv').config()

// const con = mysql.createConnection({
//     host:process.env.HOST,
//     port: process.env.PORT,
//     user:process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
// })

const con = mysql.createConnection({
    host: "sql-database-1.cdeshejf2wbv.us-east-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "z0533170147",
    database: "rememberlanguage",
})

// const con = mysql.createConnection({
//     host:"localhost", 
//     port: 3306,
//     user: "root",
//     password: "z0533170147",
//     database: "rememberlanguage",
// })

con.connect(err => {
    console.log("con " + err);
})

module.exports = con;