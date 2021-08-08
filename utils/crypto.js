const bcrypt = require('bcrypt');


function enCoding() {
    function cipher(password) {
        return bcrypt.hashSync(password, 10)

    }
    function compareCipher(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
    return {
        cipher,
        compareCipher
    }
}

module.exports = enCoding();