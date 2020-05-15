// Import the ORM to create functions that will interact with the database
const orm = require('../config/orm.js');

const burger = {
    // Show all burgers
    sellectAll: (cb) => {
        orm.selectAll('burgers', res => cb(res));
    },
    
    // Add a new burger to be eaten
    insertOne: (cols, vals, cb) => {
        orm.insertOne('burgers', cols, vals, (res => cb(res)));
    },

    // Update the burger to show it has ben devoured
    updateOne: (ojbColVals, condition, cb) => {
        orm.updateOne('burgers', ojbColVals, condition, (res => cb(res)));
    }
};

// Export the database functions for the controller (burgers_controller.js)
module.exports = burger;