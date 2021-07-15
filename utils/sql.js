const mysql = require("mysql");


const con = mysql.createConnection({
    host: "sql-database-1.cdeshejf2wbv.us-east-2.rds.amazonaws.com",
    port: 3306,
    user:"admin",
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

// con.connect(err => {
//     console.log("con " + err);
// })

module.exports = con;