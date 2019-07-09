// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db');

server.use(express.json());

const getUser = (id, res) => {
    return new Promise((resolve, reject) => {
        db.findById(id)
        .then(users => {
            if(!user || user.length === 0){
                reject("User doesn't exist");
            } else {
                resolve(users[0]);
            }
        })
        .catch(error => {
            res.status(404).json({ error: "The user with the specified ID does not exist." });
            reject(error);
        })
    })
}

server.get('/api/users', (req,res) => {
    db.find()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." });
    })
})

server.get('/api/users/:id', (req,res) => {
    getUser(req.params.id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        return;
    });
})

server.listen(3000, (req, res) => {
    console.log('Listening on port 3000');
})