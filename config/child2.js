const mysql = require('mysql2');
const connection = mysql.createConnection({
  host    : 'localhost',
  user    : 'root',
  database: 'redoqchild2',
  password: ''
});
connection.connect(function(err) {
  if (err) {
      console.error('Error connecting to Child2 Database: ' + err.stack);
      return;
  }
  console.log('Connected as Child2 db id ' + connection.threadId);
});
module.exports = connection.promise()