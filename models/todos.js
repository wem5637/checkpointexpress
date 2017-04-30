'use strict';

var tasks = {}; // a place to store tasks by person


module.exports = {
    reset: function() {
        tasks = {}; // (this function is completed for you.)
    },
    // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
    listPeople: function() {
        // returns an array of all people for whom tasks exist
        var arr = [];
        for (var key in tasks) {
            arr.push(key);
        }
        return arr;
    },
    add: function(name, task) {
        // saves a task for a given person
        if (!task.complete) {
            task.complete = false;
        }
        if (tasks[name]) {
            tasks[name].push(task);
        } else {
            tasks[name] = [task];

        }
        // etc.
    },
    list: function(name) {

        return tasks[name];
    },
    complete: function(name, index) {

        tasks[name][index].complete = true;
    },
    remove: function(name, index) {
        tasks[name].splice(index, 1);

    }

};
