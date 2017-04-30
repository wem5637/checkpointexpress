'use strict';

var express = require('express');
var router = express.Router();
var todos = require('../models/todos');


module.exports = function() {


    // write your routes here. Feel free to split into multiple files if you like.


    router.get('/users', function(req, res) {
        res.send(todos.listPeople());
    });

    router.get('/users/:name/tasks', function(req, res) {
        if (todos.list(req.params.name) === undefined) {
            res.status(404);
            res.send("user does not exist");
        } else {

            if (req.query.status === 'complete') {

                var ok = todos.list(req.params.name).filter(function(obj) {
                    return obj.complete === true;
                });
                res.send(ok);

            } else if (req.query.status === 'active') {

                var ok = todos.list(req.params.name).filter(function(obj) {
                    return obj.complete === false;
                });
                res.send(ok);

            } else {
                res.send(todos.list(req.params.name));
            }
        }
    });

    router.post('/users/:name/tasks', function(req, res) {
        if (!Object.keys(req.body).every(function(key) {
                return key === 'content' || key === 'complete';
            })) {
            res.status(400);
            res.send("added todo with non standard field");
        } else {
            todos.add(req.params.name, req.body);
            res.status(201);
            res.send(todos.list(req.params.name)[todos.list(req.params.name).length - 1]);
        }
    });

    router.put('/users/:name/tasks/:num', function(req, res) {
        todos.complete(req.params.name, req.params.num);
        res.send(todos);
    });
    router.delete('/users/:name/tasks/:num', function(req, res) {
        todos.remove(req.params.name, req.params.num);
        res.status(204);
        res.send(todos);
    });



    return router;

}
