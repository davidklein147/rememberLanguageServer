const crypto = require('crypto-js');
var key = "iWantToEncodOrDecodeThePassword"

function token(){
    function getEncrypto(input){
        return crypto.AES.encrypt(input,key).toString();
    }
    function getDecrypto(input){
        return crypto.AES.decrypt(input,key).toString(crypto.enc.Utf8);
    }
    return {
        getEncrypto,
        getDecrypto
    }
}

module.exports = token();