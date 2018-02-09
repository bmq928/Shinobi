(function(){
    angular
        .module('app')
        .controller('playbackCtrl', playbackCtrl)

    playbackCtrl.$inject = ['videoSrc']
    function playbackCtrl(videoSrc){
        var vm = this;

    }
})()