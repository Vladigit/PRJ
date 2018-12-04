var {App} = require('./utils/App')
const app = new App()

app.cookiePresets({})
app.setStatic('public')
app.setReqCallback(function(req, res, next) {
    console.log('\'' + req.url + '\' => "' + req.method + '"')
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
    }
})

app.run()
