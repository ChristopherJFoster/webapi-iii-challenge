const express = require('express');

const server = express();

const postDbRouter = require('./data/routers/postDb-router');
const userDbRouter = require('./data/routers/userDb-router');

server.use(express.json());

server.use('/api/posts', postDbRouter);
server.use('/api/users', userDbRouter);

server.get('/', (req, res) => {
  res.send('Server running...');
});

module.exports = server;
