(function () {
    angular
        .module('app')
        .config(config)
        .run(run)

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

    run.$inject = ['$rootScope', '$location']
    function run($rootScope, $location) {
        $rootScope.actions = {
            CHANGE_VIEW: "CHANGE_VIEW"
        }
        $rootScope.views = {
            LIVE: "LIVE",
            PLAYBACK: "PLAYBACK",
            CONFIG: "CONFIG"
        }

        //state of app
        // current view of app
        $rootScope.curView = curView();
        console.log($rootScope.curView);
        $rootScope.$watch($rootScope.curView);

        function curView() {
            var views = $rootScope.views;
            var url = $location.$$url
            console.log(url)
            switch (url) {
                case "/playback": return views.PLAYBACK;
                case "/config": return views.CONFIG;
                default: return views.LIVE;
            }

            return views.LIVE;
        }
    }


})()