"use strict";
class App {
    constructor (port, hostname) {
        this._hostname = hostname
        this._port = port
        let modules = { 
            express: require('express'),
            http: require('http'),
            fs: require('fs'),
            socketIO: require('socket.io'),
            bodyParser: require('body-parser'),
            cookieParser: require('cookie-parser'),
            path: require('path')
        }

        this.app = modules.express()
        this.server = modules.http.createServer(this.app)

        this.app.use(modules.bodyParser.json())
        this.app.use(modules.bodyParser.text())
        
        this.io = require('socket.io')(this.server)
        this.modules = modules
    }

    cookiePresets(pre) {
        if (!pre) throw new Error('Cookie presets is not found.')

        this.app.use(this.modules.cookieParser(pre))
    }

    setStatic(staticDir, UrlPath) {
        if (!staticDir) {
            throw new Error('static dir is\'t selected')
        }

        let urlP = UrlPath || '/'
        let {express, path} = this.modules

        this.app.use(urlP, express.static(staticDir))
    }

    sayHi(text) {
        console.log(text)
    }

    setReqCallback(...callback) {
        if (callback.length) {
            for(let value of callback) {
                if (typeof value === 'function') {
                    this.app.use(value)
                } else if (typeof value === 'object') {
                    for (let path in value) {
                        this.app.use(path, value[path])
                    }
                }
            }
        } else {
            console.log('Undefind values.')
        }
    }

    Rest(Restful) {
        for(var path in Restful) {
            if (typeof Restful[path] === 'function') {
                this.app.get(path, Restful[path])
            } else {
                for(let method in Restful[path]) {
                    this.app[method](path, Restful[path][method])
                }
            }
        }
    }

    WS(path , callback) {
        if (typeof path === 'string') {
            let nsp = this.io.of(path)
            callback.call(nsp)
        } else {
            callback.call(this.io)
        }
    }
    
    run() {
        let host = process.env.HOST || this._hostname || '127.0.0.1',
            port = process.env.PORT || this._port || 3000
        this.server.listen(port, host, () => {
            console.log('Server is created!')
        })
    }
}

module.exports = {
    App
}