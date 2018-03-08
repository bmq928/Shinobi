const express = require('express');
const path = require('path');
const apiRouter = require('./shinobi-api/src/routers/api');
const appRouter = require('./server_app/router/router')
let app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client_app')));

app.set('views', path.join(__dirname,'server_app', 'views'));
app.set('view engine', 'ejs');

app.use('/api', apiRouter);
app.use('/', appRouter);
// app.use((req, res, next) => {
//     // res.sendFile(path.join(__dirname, 'index.html'));
//     res.render('index')
// })

app.listen(3000, () => console.log('server is starting on port 3000'));