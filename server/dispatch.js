var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// hello world
app.get('/receive', function (req, res) {
    res.send("hello world");
});

var lastUrl = null;

// clients
io.on('connection', function (socket) {
    console.log(lastUrl)
    if (lastUrl) {
        socket.emit('url change', lastUrl);
    }

    socket.on('url change', function (url) {
        lastUrl = url;
        console.log('url change')
        io.emit('url change', url);
    })

    socket.on('clear last URL', function () {
        console.log('clear last url')
        lastUrl = null;
    })

    console.log('a user connected');
});

var port = process.env.PORT || 8083

http.listen(port, function () {
    console.log(`listening on *:${port}`);
});
