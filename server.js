const express = require('express');
const path = require('path');

let app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client_app')));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(3000, () => console.log('server is starting on port 3000'));