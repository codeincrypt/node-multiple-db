const mysql = require('mysql2');
const connection = mysql.createConnection({
  host    : 'localhost',
  user    : 'root',
  database: 'redoqmaster',
  password: ''
});
connection.connect(function(err) {
  if (err) {
      console.error('Error connecting to Master Database: ' + err.stack);
      return;
  }
  console.log('Connected as Master db id ' + connection.threadId);
});
module.exports = connection.promise()