const con = require("../utils/sql");
const enCoding = require("../utils/crypto");
const token = require("../models/token-model");
const querys = require("../utils/querys");


function authcolle() {
    function logup(req, res) {
        console.log( req.body);
        if (!req.body) {
            return res.status(400).send();
        }
        req.body.password = enCoding.cipher(req.body.password)
        con.query(querys.objToInsertQuery("USERS", req.body),
            (err, newInsert) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    res.status(201).send(newInsert)
                }
            })
    }

    function login(req, res) {
        console.log("login " + req.body.email);
        if (!req.body) {
            return res.status(400).send({ mas: "missig details" });
        }
        con.query(`select * from USERS where Email  = "${req.body.email}"`,
            (err, results) => {
                if(!results[0]){
                    return res.status(401).send({ mas: "email or passwors is incorrect" });
                }
                let result = (JSON.parse(JSON.stringify(results))[0]);
                console.log(result);
                if (!enCoding.compareCipher(req.body.password, result.Password)) {
                    console.log("err");
                    return res.status(401).send({ mas: "email or passwors is incorrect" });
                }
                if (err) {
                    return res.status(500).send();
                }
                let newToken = new token(true, null, result.Id, result.Name, result.Email);
                res.status(200).send({ token: newToken.token , userId: result.Id});
            })
    }
    return {
        logup,
        login
    }
}

module.exports = authcolle()