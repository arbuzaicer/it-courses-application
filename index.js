/*imports section*/
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

/*Import routes*/

const homeRoute = require('./routes/Home');
const coursesRoute = require('./routes/Courses');
const addRoute = require('./routes/Add');
const cartRoute = require('./routes/Cart');

/*app initializing*/

const app = express();

const hbs = exphbs.create({ // создание движка handlebars
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine); // регистрация движка handlebars
app.set('view engine', 'hbs'); // использование движка
app.set('views', 'views'); // указание места, где будут находится шаблоны
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));// метод, декодирующий данные пользователя (обход Buffer)

app.use('/', homeRoute); // URL можно задавать как здесь, так и пользоваться настройкой внутри каждого роута, но в главном файле будет явный роут
app.use('/courses', coursesRoute);
app.use('/add', addRoute);
app.use('/cart', cartRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
