// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db');

server.use(express.json());

server.listen(3000, (req, res) => {
    console.log('Listening on port 3000');
})