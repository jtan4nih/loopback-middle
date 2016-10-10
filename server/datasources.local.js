//Note: Do not used localhost as it will give "getaddrinfo ENOENT localhost:3306" error without qn active network connection!
// var dburl = process.env.MYSQL_HOST || 'localhost';
var dburl = process.env.MYSQL_HOST || '127.0.0.1';
var dbname = process.env.MYSQL_DB || 'stem2dev_db';
var dbuser = process.env.MYSQL_USER || 'root';
var dbpass = process.env.MYSQL_PASSWORD || 'admin';


module.exports = {
  "db": {
    "name": "db",
    "connector": "memory"
  },
  stem2local: {
    host: dburl,
    port: 3306,
    connectionLimit: 10,
    database: dbname,
    debug: false,
    user: dbuser,
    password: dbpass
  }
};
