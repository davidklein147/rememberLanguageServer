function querys() {

    function objToInsertQuery(tableName, obj, keyNumArr) {
        const keyArr = () => {
            var arr = [];
            var index = 0;
            for (const key in obj) {
                index++
                if(keyNumArr.find(num => num ===index)){
                    arr.push(key)
                }
            }
            return arr;
        }
        const valueArr = ()=>{
            var arr = [];
            for (const value of keys) {
                obj[value] ? arr.push(obj[value]):arr.push(null)  
            }
            return arr
        }
        var keys = !keyNumArr? Object.keys(obj): keyArr();
        var values =  valueArr() ; 
        var query = `insert into ${tableName} (`
        keys.forEach(key => {
            query += `${key},`
        });
        query = query.slice(0, query.length - 1);
        query += `) values (`;
        values.forEach(value => {
            query += `${!Number.isNaN(+value) ? value : "'" + value + "'"},`
        });
        query = query.slice(0, query.length - 1);
        query += `)`;
        console.log(query);
        return query;
    }

    return {
        objToInsertQuery
    }
}

module.exports = querys()