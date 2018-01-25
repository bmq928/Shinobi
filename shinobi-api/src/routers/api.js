var express = require('express');
var router = express.Router();
var ctrlImage = require('../controllers/video');

router.get('/', function(req, res) {
	res.send("This is api router for Shinobi");
	res.end();
});

router.get('/image', function(req, res) {
	let requestStreamFromShinobi = ctrlImage.image();
	requestStreamFromShinobi.pipe(res);
});

router.get('/video/list/:groupKey', function(req, res) {
	ctrlImage.videoOfGroupKey(function(listVideos) {
		console.log(listVideos.videos[0].href);
		res.send(listVideos.videos[0].href);
		res.end();
	});
	
	// ctrlImage.videoOfGroupKey(function(href) {
	// 	console.log(href);
	// 	res.send(href);
	// 	res.end();
	// });
})

router.get('/video/list/:monitorId', function(req, res) {
	ctrlImage.videoOfGroupKey(function(listVideos) {
		console.log(listVideos.videos);
		res.send(listVideos.videos);
		res.end();
	});
	
})

router.get('/video/:fileName', function(req, res) {
	let href = '/FcuQHjPyqXOQtVSDXuFH5kFzeSEydE/videos/uet/p404/2018-01-19T14-00-07.webm';
	let video = ctrlImage.getVideo(href);
	video.pipe(res);
})

router.delete('/video/:fileName/delete', function(req, res) {
	let href = '/FcuQHjPyqXOQtVSDXuFH5kFzeSEydE/videos/uet/p404/2018-01-19T14-00-07.webm';
	let video = ctrlImage.deleteVideo(href);
	video.pipe(res);
})
module.exports = router;