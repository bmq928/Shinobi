(function () {
    angular
        .module('app')
        .controller('playbackCtrl', playbackCtrl)

    playbackCtrl.$inject = ['video']
    function playbackCtrl(video) {

        var vm = this;

        vm.videos = [];
        vm.targetVideo = null; //just for showInfo method

        //init
        video.getAllByMid('p404', function (videos) {
            console.log(videos);
            vm.videos = videos;
        })
        
        vm.showInfo = function(video){
            vm.targetVideo = video;
        }
    }
})()