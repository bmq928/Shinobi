(function () {
    angular
        .module('app')
        .config(config)
        .run(run)

    
    config.$inject = ['$stateProvider', '$urlRouterProvider']
    function config($stateProvider, $urlRouterProvider) {

        var views = window.constants.VIEWS;

        $stateProvider
            .state(views.live, {
                url: '/live',
                templateUrl: './live/live.view.html',
                controller: 'liveCtrl',
                controllerAs: 'vm'
            })
            .state(views.playback, {
                url: '/playback',
                templateUrl: './playback/playback.view.html',
                controller: 'playbackCtrl',
                controllerAs: 'vm'
            })
            .state(views.setting, {
                url: '/setting',
                templateUrl: './setting/setting.view.html',
                controller: 'settingCtrl',
                controllerAs: 'vm'
            })

        $urlRouterProvider.otherwise('/live');
    }

    run.$inject = ['$rootScope', '$location']
    function run($rootScope, $location){

        //set current rootScope.view
        //decide view via url
        $rootScope.CUR_VIEW = decideView();

        function decideView(){
            var makePath = function(view) {return '/' + view};
            var curUrl = $location.$$path;
            var views = window.constants.VIEWS;

            if($location.$$path === makePath(views.playback)) return views.playback;
            if($location.$$path === makePath(views.setting)) return views.setting;
            
            return views.live;
        }
    }
})()