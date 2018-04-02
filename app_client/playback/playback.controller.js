(function () {
    angular
        .module('app')
        .controller('playbackCtrl', playbackCtrl)

    playbackCtrl.$inject = ['video']
    function playbackCtrl(video) {

        var vm = this;

        vm.videos = []

        init()

        function init() {
            video.getAllByMid('p404', function (videos) {
                console.log(videos);
                vm.videos = videos;
            })
        }
    }
})()