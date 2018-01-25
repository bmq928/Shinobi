var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('../linhtinh'));
app.use(bodyParser.json());


var apiRouter = require('./src/routers/api');
app.use('/api', apiRouter);

// app.use(function(req, res){
// 	res.sendfile('./Client/index.html')
// })

// require('./API/models/db')

app.listen(3000, function() {
	console.log('listening on port 3000');
})