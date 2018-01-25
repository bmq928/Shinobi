const express = require('express');
const path = require('path');
const api = require('./shinobi-api/src/routers/api');
let app = express();

app.use(express.static(__dirname));
app.use('/api', api);
app.use(function(req, res, next){
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(3000, function(){
    console.log("server starting at port 3000");
})