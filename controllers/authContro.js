const con = require("../utils/sql");

function authcolle() {
    function logup(req, res) {
        console.log("logup");
        if (!req.body) {
            return res.status(400).send();
        }
        let query = require("../queries/createQuery")
        con.query(query.createTable,
            (err, result) => {
                if (err) {
                    return res.status(400).send(err);
                }
                console.log(req.body);
                console.log(result);
                let query1 = 'insert into Users set ?';
                con.query(query1, req.body,
                    //`insert into Users (name, Email, password)
                    //values('${req.body.name}', '${req.body.email}', '${req.body.password}')`,
                    (err, newInsert) => {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.status(200).send(newInsert)
                        }
                    })
            }
        );
    }

    return {
        logup
    }
}

module.exports = authcolle()