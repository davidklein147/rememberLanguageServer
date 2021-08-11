function querys() {

    function objToInsertQuery(tableName, obj, keysNum) {
        var keys = Object.keys(obj);
        var values = Object.values(obj);
        var query = `'insert into ${tableName} (`
        keysNum.forEach(num => {
            query += `${keys[num - 1]},`
        });
        query = query.slice(0, query.length - 1);
        query += `) values (`;
        keysNum.forEach(num => {
            query += `${typeof (values[num - 1]) === "number" ? values[num - 1] : "'" + values[num - 1] + "'"},`
        });
        query = query.slice(0, query.length - 1);
        query += `)'`;
        return query;
    }

    return {
        objToInsertQuery
    }
}

module.exports = querys()