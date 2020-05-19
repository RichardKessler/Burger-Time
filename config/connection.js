const mysql = require('mysql');

let connection;

if (process.env.JASWDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'jidmenosta',
        database: 'burgers_db'
    });
};

connection.connect();
module.exports = connection;