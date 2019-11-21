const mysql = require("mysql")

const pool = mysql.createPool({
  connectionLimit: 10,
  user: "root",
  password: "",
  database: "fremont",
  host: "localhost"
})

module.exports = pool
