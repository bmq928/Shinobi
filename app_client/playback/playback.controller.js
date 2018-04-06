(function () {
    angular
        .module('app')
        .controller('playbackCtrl', playbackCtrl)

    playbackCtrl.$inject = ['video']
    function playbackCtrl(video) {

        var vm = this;

        vm.videos = [];
        vm.targetVideo = null; //just for showInfo method
        vm.numPage = 0;
        vm.curPage = 0;

        //init
        video.getAllByMid('p404', function (videos) {
            console.log(videos);
            vm.videos = videos;
            vm.numPage = vm.videos.length / window.constants.VIDEO_PER_PAGE + 1;
            vm.curPage = 1;
        })
        

        vm.changePage = function(page){
            vm.curPage = page;
        }

        vm.showInfo = function(video){
            vm.targetVideo = video;
        }
    }
})()