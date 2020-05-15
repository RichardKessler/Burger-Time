// Import express
// Import model (burger.js) to use its database functions
const express = require('express');
const router = express.Router();
const burger = require('../models/burger.js');

// Create all the routes and set up logic withing those routes where required
// Route to display all burgers using handlebars
router.get('/', (res, res) => {
    burger.sellectAll((data) => {
        let hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

// Route to add burgers that have not been devoured yet
router.post('/api/burgers', (req, res) => {
    burger.insertOne(['burger_name', 'devoured'], [req.body.name, false], (result) => {
        res.json({ id: result.insertId });
    });
});

// Route to update a burger to be devoured when the user click the button
router.put('/api/burgers/:id', (req, res) => {
    let condition = 'id = ' + req.params.id;
    burger.updateOne({
        devoured: req.body.devoured
    }, condition, (result) => {
        if (result.changedRows === 0){
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

// Export routes for server.js to use
module.exports = router;