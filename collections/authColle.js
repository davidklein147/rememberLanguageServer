const con = require("../utils/sql");

function authcolle() {
    function logup(req, res) {
        console.log("logup");
        if (!req.body) {
            return res.status(400).send();
        }
        require("../queries/createQuery").createTable;
        con.query(
            `insert into Users (name, Email, password)
                 values(${req.body.name}, ${req.body.email},${req.body.password})`,
            (err, newInsert) => {
                if (err) {
                    res.status(400).send();
                } else {
                    res.status(200).send(newInsert)
                }
            }
        )
    }

    return {
        logup
    }
}

module.exports = authcolle()