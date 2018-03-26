(function () {
    angular
        .module('app')
        .controller('liveCtrl', liveCtrl)


    function liveCtrl($sce) {
        var vm = this;

        vm.links = ['http://10.0.9.252:252/FcuQHjPyqXOQtVSDXuFH5kFzeSEydE/embed/uet/p404/jquery%7Cfullscreen',
            'http://10.0.9.252:252/FcuQHjPyqXOQtVSDXuFH5kFzeSEydE/embed/uet/p404/jquery%7Cfullscreen',
            'http://10.0.9.252:252/FcuQHjPyqXOQtVSDXuFH5kFzeSEydE/embed/uet/p404/jquery%7Cfullscreen',
            'http://10.0.9.252:252/FcuQHjPyqXOQtVSDXuFH5kFzeSEydE/embed/uet/p404/jquery%7Cfullscreen',
            'http://10.0.9.252:252/FcuQHjPyqXOQtVSDXuFH5kFzeSEydE/embed/uet/p404/jquery%7Cfullscreen',
            'http://10.0.9.252:252/FcuQHjPyqXOQtVSDXuFH5kFzeSEydE/embed/uet/p404/jquery%7Cfullscreen'
        ].map(function (link) { return $sce.trustAsResourceUrl(link) })
    }
})()