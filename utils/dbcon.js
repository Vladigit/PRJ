class DBConnector {
    constructor () {
        this._queF = null
    }

    conection(include) {
        setTimeout(function () {
            console.log('Connection is not exists')
            //include(null)
        },3000)
    }

    _lexEnv(connect) {
        if (connect) {
            this._queF.call(connect)
            this._queF = null
        } else {
            throw new Error('Nothing was included') 
        }
    }

    Query(queryFunc) {
        if (typeof this.conection === 'function') {
        this._queF = queryFunc
        this.conection(this._lexEnv.bind(this))
        } else {
            queryFunc.call(this.conection)
        }
    }
}

module.exports = DBConnector