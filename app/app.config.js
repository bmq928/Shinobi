(function () {
    angular
        .module('app')
        .config(config)


    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('live', {
                url: '/live',
                templateUrl: './app/live/live.view.html',
                controller: 'liveCtrl',
                controllerAs: 'vm'
            })
            .state('playback', {
                url: '/playback',
                templateUrl: './app/playback/playback.view.html',
                controller: 'playbackCtrl',
                controllerAs: 'vm'
            })

        $urlRouterProvider.otherwise('/live');
    }


})()