var {App} = require('./utils/App'),
    {DB} = require('./utils/db')

let dbConf = {
    host: 'localhost',
    user: process.env.MYSQL_user || 'rooter',
    password: process.env.MYSQL_password || 'hellow',
    database: 'mydb'
}

const app = new App(),
      db = new DB(dbConf)

app.cookiePresets({})
app.setStatic('public')
app.setReqCallback(function(req, res, next) {
    console.log(`'${req.url}' => ${req.method}`)
    next()
})

app.WS(null, function(io) {
    io.on('connect', function (socket) {
        console.log('a User connected!')
        socket.on('disconnect', () => console.log('a User Disconnected.'))
    })
})

app.Rest({
    '/': {
        get: (req, res) => {
            res.sendFile(__dirname + '/views/index.html')
        }
    },
    '/usersRating': (req, res) => {
        db.Query(function () {
            let sql = 'SELECT id, name, score FROM users ORDER BY score LIMIT 10'
            this.query(sql, (err, result) => {
                if (err) throw err;
                res.send(JSON.stringify(result))
                console.log(result)
            })
        })
    },
    '/reg': {
        get: (req, res) => res.sendFile(__dirname + '/views/reg.html'),
        post: (req, res) => {
            console.log(req.body)

            let {name, pass, age} = req.body
            let values = [name, age, pass]

            db.Query(function () {
                let sql = 'SELECT * FROM users WHERE name = ?'
                this.query(sql, [name], (err, result) => {
                    if (!result.length) {

                        db.Query(function () {
                            let sql = 'INSERT INTO users (name, age, pass) values (?, ?, ?)'
                            this.query(sql, values, (err, result) => {
                                if (err) throw err;
                                res.redirect('/account')
                            })
                        })

                    } else {
                        res.status(404).end();
                    }
                })
            })
        }
    },
    '/account': (req, res) => res.send('Hello'),
    '/*': (req, res) => res.status(404).send('404 Not found')
})

app.run()
