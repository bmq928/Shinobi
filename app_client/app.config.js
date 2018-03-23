(function () {
    angular
        .module('app')
        .config(config)

    
    config.$inject = ['$stateProvider', '$urlRouterProvider']
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
            .state('setting', {
                url: '/setting',
                templateUrl: './setting/setting.view.html',
                controller: 'settingCtrl',
                controllerAs: 'vm'
            })

        $urlRouterProvider.otherwise('/live');
    }
})()