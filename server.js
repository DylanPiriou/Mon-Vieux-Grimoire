const http = require('http');
const port = 3000

const server = http.createServer((req, res) => {
    res.end('Bienvenue sur le serveur !');
});

server.listen(process.env.PORT || port);