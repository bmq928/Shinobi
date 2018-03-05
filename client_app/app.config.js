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

    run.$inject = ['$rootScope', '$location', '$anchorScroll']
    function run($rootScope, $location, $anchorScroll) {
        $anchorScroll.yOffset = 100; //make the action that go to id more beautiful

        $rootScope.actions = {
            CHANGE_VIEW: "CHANGE_VIEW"
        }
        $rootScope.views = {
            LIVE: "LIVE",
            PLAYBACK: "PLAYBACK",
            CONFIG: "CONFIG"
        }
        $rootScope.constant = {
            LIVE: {

            },
            PLAYBACK: {

            },
            CONFIG: {
                GO_TO_OPTION: 'GO_TO_OPTION',
                OPTION_TAB_DATA: [
                    //if selectOption is empty array => is a input tag
                    {
                        title: "Identity",
                        description: "You can duplicate a monitor by modifying the Monitor ID then pressing save. You cannot use the ID of a monitor that already exists or it will save over that monitor's database information.",
                        options: [
                            {
                                name: "Mode",
                                description: "This is the primary task of the monitor.",
                                selectOption: []
                            }, {
                                name: "Monitor ID",
                                description: "This is a non-changeable identifier for the monitor. You can duplicate a monitor by double clicking the Monitor ID and changing it.",
                                selectOption: []
                            }, {
                                name: "Name",
                                description: "This is the human-readable display name for the monitor.",
                                selectOption: []
                            }, {
                                name: "Retry Connection",
                                description: "The number of times to retry for network connection between the server and camera before setting the monitor to Disabled. No decimals. Set to 0 to retry forever.",
                                selectOption: []
                            }, {
                                name: "Notes",
                                description: "Comments you want to leave for this camera.",
                                selectOption: []
                            }, {
                                name: "Storage Location",
                                description: "",
                                selectOption: ['option1', 'option2', 'option3']
                            }
                        ]
                    }, {
                        title: "Input",
                        description: "This section tells Shinobi how to consume a stream. For optimal performance try tuning your camera's internal settings. Find the following options and set them as shown. To find your camera you can use the built in ONVIF Scanner of Shinobi. Some ONVIF cameras require the use of a management tool to modify their internal settings. If you can't find your cameras you can try ONVIF Device Manager for Windows",
                        options: [
                            {
                                name: "Input Type",
                                description: "The method that will used to consume the video stream.",
                                selectOption: ['option1', 'option2', 'option3']
                            }, {
                                name: "Monitor ID ",
                                description: "This is a non-changeable identifier for the monitor. You can duplicate a monitor by double clicking the Monitor ID and changing it.",
                                selectOption: []
                            }, {
                                name: "Name",
                                description: "This is the human-readable display name for the monitor.",
                                selectOption: []
                            }, {
                                name: "Retry Connection",
                                description: "The number of times to retry for network connection between the server and camera before setting the monitor to Disabled. No decimals. Set to 0 to retry forever.",
                                selectOption: []
                            }, {
                                name: "Notes",
                                description: "Comments you want to leave for this camera.",
                                selectOption: []
                            }, {
                                name: "Storage Location",
                                description: "",
                                selectOption: ['option1', 'option2', 'option3']
                            }
                        ]
                    }
                ]
            }
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