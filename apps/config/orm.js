const connection = require('./connection.js');

// function for SQL syntax. Loops through and creates and array of question marks - ['?', '?', '?'] - and turns it into a string = '?, ?, ?';
printQuestionMarks = (num) => {
    const arr = [];

    for (let i = 0; i < num; i++){
        arr.push('?');
    }
    return arr.toString();
}

// function to convert object key/value pairs to SQL syntax
objToSql = (ob) => {
    const arr = [];

    // loop through the keys and push the key/value as a sting int array
    for (let key in ob){
        let value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Richard John Kessler => 'Richard John Kessler')
            if (typeof value === 'string' &&  value.indexOf(' ') >= 0){
                value = "'" + value + "'";
            }
            // e.g. {name: 'Richard John Kessler'} => ["name='Richard John Kessler'"]
            // e.g. {student: true} => ["studen=true"]
            arr.push(key + '=' + value);
        }
    }

    return arr.toString();
}

const orm = {
    selectAll: (table, cb) => {
        const query = 'SELECT * FROM ' + table + ';';
        connection.query(query, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    },

    insertOne: (table, cols, vals, cb) => {
        const query = 'INSERT INTO ' + table;

        query += ' (';
        query += cols.toString();
        query += ') ';
        query += 'VALUES (';
        query += printQuestionMarks(vals.length);
        query += ') ';

        console.log(query);

        connection.query(query, vals, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    },

    // An example of objColVals would be {name: Richard, student: true}
    updateOne: (table, objColVals, condition, cb) => {
        const query = 'UPDATE ' + table;

        query += ' SET ';
        query += objToSql(objColVals);
        query += ' WHERE ';
        query += condition;

        console.log(query);

        connection.query(query, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    }
};

module.exports = orm;