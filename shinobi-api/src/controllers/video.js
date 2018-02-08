var request = require('request');
var url = 'http://10.0.9.252:252';
var apiKey = 'FcuQHjPyqXOQtVSDXuFH5kFzeSEydE';
var groupKey = 'uet';
var monitorId = 'p404';

module.exports.image = function() {
	let urlImage = url + '/' + apiKey + '/jpeg/' + groupKey + '/' + monitorId + '/s.jpg';
	return request.get(urlImage);
}

module.exports.videoOfGroupKey = function(callback) {
	let url_List_Video_Of_GroupKey = url + '/' + apiKey + '/videos/' + groupKey ;
	let href = null;
	request.get(url_List_Video_Of_GroupKey, function(error, response, body) {
		 let RE = JSON.parse(body);
		 callback(RE);
	});
}

module.exports.videoOfMonitor = function(callback) {
		let url_List_Video_Of_Monitor= url + '/' + apiKey + '/videos/' + groupKey + '/' + monitorId;

		request.get(url_List_Video_Of_Monitor, function(error, response, body) {
		   let RE = JSON.parse(body);
		   callback(RE);	
	})
}

module.exports.getVideo = function(href) {
	let urlVideo = url + href;
	return request.get(urlVideo);
}

module.exports.deleteVideo = function(href) {
	let urlVideo = url + href + '/delete';
	return request.delete(urlVideo);
}