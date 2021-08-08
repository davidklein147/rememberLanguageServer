const enCoding = require('../utils/token')
var split = '=!='
var liveTime = 2 * 60 * 60 * 1000

function token(isNew, token, id, name, email) {
    if (isNew) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.date = Date.now() + liveTime;
        this.arrDe = [this.id, this.name, this.email, this.date]
        this.token = enCoding.getEncrypto(this.arrDe.join(split));
        console.log(this.token);
    }
    else {
        this.token = enCoding.getDecrypto(token).split(split);
        console.log(this.token);
        this.id = this.token[0];
        this.name = this.token[1];
        this.email = this.token[2];
        this.date = this.token[3];
    }

    this.isExpired = () => {
        console.log(this.date);
        //return ! this.date || Date.now() > this.date;
        return Date.now() > this.date;
    }

}

module.exports = token;