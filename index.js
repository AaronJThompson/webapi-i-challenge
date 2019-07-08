// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db');

server.use(express.json());

function handlePromiseResponse(res, prom, error) {
    prom
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        res.status(404)
        .json({errorMessage:error});
    });
}
server.get('/api/users', (req,res) => {
    handlePromiseResponse(res, db.find(), "The users information could not be retrieved." );
})

server.get('/api/users/:id', (req,res) => {
    handlePromiseResponse(res, db.findById(req.params.id), "The user information could not be retrieved." );
})

server.listen(3000, (req, res) => {
    console.log('Listening on port 3000');
})