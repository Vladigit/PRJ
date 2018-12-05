var DBConnector = require('./dbcon'),
    mysql = require('mysql')

class DB extends DBConnector {
    constructor (connectionConfig) {
        super()
        this.conection = mysql.createConnection(connectionConfig)
        this.conection.connect(function (err) {
            if(err) throw err;
            console.log('Database was connected.')
        })
    }
}
module.exports = {
    DB
}