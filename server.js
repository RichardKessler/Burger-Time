const express = require('express');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3160;

const app = express();

app.use(express.static('app/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const routes = require('./apps/controllers/burgers_controller.js');

app.use(routes);

app.listen(PORT, () => {
    console.log('App now listening at http://localhost:' + PORT);
})