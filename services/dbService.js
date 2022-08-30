const  mysql = require('mysql2');
const dotenv = require('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host     : process.env.HOST_DATABASE,
    user     : process.env.USER_DATABASE,
    password : process.env.PASSWORD_USER_DATABASE,
    database : process.env.NAME_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit:0
})

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

module.exports = query;
