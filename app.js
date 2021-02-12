const express = require('express');
const http = require('http');
const session = require('express-session');

const app = express();
app.use(session({secret: 'ssshhhhh',saveUninitialized: false, resave: true}));
const server = http.createServer(app);

var port = 8000;
app.set('port', port);
app.use(express.json());

const auth = require('./routes/authRoute');

app.use('/', auth);

server.on('error', async (error) => {
    console.error(`Server error:  ${error}`)
});
server.on('listening', async () => {
    console.log(`server listening at http://localhost:${port}`)
});


server.listen(port);