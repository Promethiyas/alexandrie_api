import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: '51.178.182.146',
  user: 'promethiyas',
  password: 'MYSQLmysql@33',
  database: 'alexandrie',
  port: 3307
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

export default connection;