const con = require("../utils/sql");

function authcolle() {
    function logup(req, res) {
        console.log("logup " + req.body);
        if (!req.body) {
            return res.status(400).send();
        }

        //let query1 = 'insert into USERS set';
        con.query(
            //query1, req.body,
            `insert into USERS (name, Email, password)
            values('${req.body.name}', '${req.body.email}', '${req.body.password}')`,
            (err, newInsert) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    res.status(201).send(newInsert)
                }
            })
    }



    return {
        logup
    }
}

module.exports = authcolle()