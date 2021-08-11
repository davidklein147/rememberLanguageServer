var smartReverse = function(str) {                     // Reverse a string considering english letters and and numbers.
    return str                                    // by taking it and
        .split(/\s+/)                           // splitting it into words
        .reverse()                               // and reversing the word order
        .map(function(word) {
            // and then changing each word
            return (/^[0-9\.]+$/.test(word) || /^[a-zA-Z0-9?><;,{}[\]\-_+=!@#$%\^&*|']+$/.test(word)) ?     // if it's a number or an english word
                word :                              // into itself
                word.split("").reverse().join("");                  // or otherwise into its reverse
        })
        .join(" ")                                  // put it back together
        ;
}
module.exports = smartReverse;

function objToInsertQuery(tableName, obj, keysNum) {
    var keys = Object.keys(obj);
    var values = Object.values(obj);
    var query = `insert into ${tableName} (`
    keysNum.forEach(num => {
        query += keys[num-1]
    });
    query += `) values (`;
    keysNum.forEach(num => {
        query += values[num-1]
    });
    query += `)`;
    return query;
}