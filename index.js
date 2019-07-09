// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db');

server.use(express.json());

const getUser = (id, res) => {
    return new Promise((resolve, reject) => {
        db.findById(id)
        .then(user => {
            if(!user){
                throw new Error("User doesn't exist");
            } else {
                resolve(user);
            }
        })
        .catch(error => {
            if (res) {
                res.status(404).json({ error: "The user with the specified ID does not exist." });
            }
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

server.post('/api/users', (req, res) => {
    if(!req.body.name || !req.body.bio) {
        res.status(400).json({ error: "Please provide name and bio for the user." });
        return;
    }
    db.insert(req.body)
    .then(data => {
        getUser(data.id)
        .then(user => {
            res.status(201).json(user);
        })
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the user to the database" });
    })
})

server.get('/api/users/:id', (req,res) => {
    getUser(req.params.id, res)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        return;
    })
})

server.delete('/api/users/:id', (req, res) => {
    getUser(req.params.id, res)
    .then(user => {
        db.remove(user.id)
        .then(() => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({ error: "The user could not be removed" });
        })
    })
    .catch(error => {
        return;
    })
})

server.put('/api/users/:id', (req, res) => {
    if(!req.body.name || !req.body.bio) {
        res.status(400).json({ error: "Please provide name and bio for the user." });
        return;
    }
    getUser(req.params.id, res)
    .then(user => {
        db.update(user.id, req.body)
        .then(() => {
            getUser(user.id)
            .then((newUser) => {
                res.status(200).json(newUser);
            })
        })
        .catch(error => {
            res.status(500).json({ error: "The user information could not be modified." });
        })
    })
    .catch(error => {
        return;
    })
})

server.listen(3000, (req, res) => {
    console.log('Listening on port 3000');
})