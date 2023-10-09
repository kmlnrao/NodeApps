const express = require('express')
const exphbs = require('express-handlebars');

const path = require('path');
const port = 3000;
const app = express();

app.engine('hbs',  exphbs.engine({
    defaultLayout: 'main',
     layoutsDir: __dirname + '/views/layouts/',
    extname: '.hbs',
    defaultLayout: 'planB',
    partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname + '/views/layouts'))

app.use(express.static('public'))

fakeApi = () => {
return [
        {
            name: 'Katarina',
            lane: 'midlaner'
        },
        {
            name: 'Jayce',
            lane: 'toplaner'
        },
        {
            name: 'Heimerdinger',
            lane: 'toplaner'
        },
        {
            name: 'Zed',
            lane: 'midlaner'
        },
        {
            name: 'Azir',
            lane: 'midlaner'
        }
];
}

app.get('/', (req, res) => {
    res.render('main', {layout: 'index', suggestedChamps: fakeApi(), listExists: true});
   
});

app.listen(port, () => console.log(`App listening to port ${port}`));