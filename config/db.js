const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Password123#@!',
    port:"3306",
    database:"BlogPost",
});

module.exports=db