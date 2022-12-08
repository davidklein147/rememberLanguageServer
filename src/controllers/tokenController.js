
const enCoding = require('../utils/crypto');
const token = require('../utils/token');
const tokenModel = require('../models/token-model')

function chackAuth(req, res, next){
    console.log('chack');
    console.log(req.body);
    if(!req.headers["x-access-token"]){
        return res.status(401).send();
    }
    var tokenCh = new tokenModel(false, req.headers["x-access-token"]);
    if(tokenCh.isExpired()){
        return res.status(401).send();
    }
    req.user = tokenCh;
    return  next();

}

module.exports = chackAuth;