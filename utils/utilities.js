
function arrayToTable(tName, arr, addObj) {
    if(addObj) {
        arr = arr.map(item => { return {...item, ...addObj}});
    }
    var allKeys = {};
    for (const item of arr) {
        const keys = Object.keys(item);
        for (const key of keys) {
            allKeys[key] = 0;
        }
    }
    allKeys = Object.keys(allKeys);

    let allValues = '';
    for (const item of arr) {
        let values = ''
        for (const key of allKeys) {
            values += (item[key] || 'NULL') + ','
        }
        values = values.slice(0, -1);
        values = '(' + makeField(values);
        values += '),\n';
        allValues += values;
    }
    allValues = allValues.slice(0, -2);
    let qString = 'INSERT INTO ' + tName + `(${allKeys}) VALUES${allValues}`;
    qString =  qString.split('\'NULL\'').join("DEFAULT");
    console.log(qString);
    return qString;
}

function removeEmpty(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v));
}

function makeField(str) {
    str = "'" + replaceAll(str, ",", "', '") + "'";
    return str;
}

function replaceAll(originalString, find, replace) {
    ret = originalString.replace(new RegExp(find, 'g'), replace);
    return ret;
};

