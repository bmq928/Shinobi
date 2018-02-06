(function () {
    angular
        .module('app')
        .config(config)


    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('live', {
                url: '/live',
                templateUrl: './live/live.view.html',
                controller: 'liveCtrl',
                controllerAs: 'vm'
            })
            .state('playback', {
                url: '/playback',
                templateUrl: './playback/playback.view.html',
                controller: 'playbackCtrl',
                controllerAs: 'vm'
            })
            .state('config', {
                url: '/config',
                templateUrl: './config/config.view.html',
                controller: 'configCtrl',
                controllerAs: 'vm'
            })

        $urlRouterProvider.otherwise('/live');
    }


})()