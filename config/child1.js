const mysql = require('mysql2');
const connection = mysql.createConnection({
  host    : 'localhost',
  user    : 'root',
  database: 'redoqchild1',
  password: ''
});
connection.connect(function(err) {
  if (err) {
      console.error('Error connecting to Child1 Database: ' + err.stack);
      return;
  }
  console.log('Connected as Child1 db id ' + connection.threadId);
});
module.exports = connection.promise()