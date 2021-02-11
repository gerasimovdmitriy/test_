const express = require('express');
const http = require('http');

const app = express()
const server = http.createServer(app);

var port = 8000;
app.set('port', port);

server.on('error', async (error) => {
    console.error(`Server error:  ${error}`)
});
server.on('listening', async () => {
    console.log(`server listening at http://localhost:${port} | ${process.env.NODE_ENV}`)
});


server.listen(port);