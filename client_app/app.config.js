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
                                selectOption: ['record', 'disable', 'watch-only', 'idle'],
                                curVal: 'record'
                            }, {
                                name: "Monitor ID",
                                description: "This is a non-changeable identifier for the monitor. You can duplicate a monitor by double clicking the Monitor ID and changing it.",
                                selectOption: [],
                                curVal: 'p404'
                            }, {
                                name: "Name",
                                description: "This is the human-readable display name for the monitor.",
                                selectOption: [],
                                curVal: 'p404'
                            }, {
                                name: "Retry Connection",
                                description: "The number of times to retry for network connection between the server and camera before setting the monitor to Disabled. No decimals. Set to 0 to retry forever.",
                                selectOption: [],
                                curVal: ''
                            }, {
                                name: "Notes",
                                description: "Comments you want to leave for this camera.",
                                selectOption: [],
                                curVal: ''
                            }, {
                                name: "Storage Location",
                                description: "",
                                selectOption: ['main', 'second'],
                                curVal: 'main'
                            }
                        ]
                    }, {
                        title: "Input",
                        description: "This section tells Shinobi how to consume a stream. For optimal performance try tuning your camera's internal settings. Find the following options and set them as shown. To find your camera you can use the built in ONVIF Scanner of Shinobi. Some ONVIF cameras require the use of a management tool to modify their internal settings. If you can't find your cameras you can try ONVIF Device Manager for Windows",
                        options: [
                            {
                                name: "Input Type",
                                description: "The method that will used to consume the video stream.",
                                selectOption: ['jpeg', 'mjpeg', 'h.264/h.265/h.265+', 'hls(.m3u8)', 'mpeg-4(.mp4, .ts)', 'shinobi streamer', 'dashcam(streamer v2)', 'local'],
                                curVal: 'h.264/h.265/h.265+'
                            }, {
                                name: "Connection Type ",
                                description: "The protocol that will used to consume the video stream.",
                                selectOption: ['http', 'https', 'rtsp', 'udp'],
                                curVal: 'rtsp'
                            }, {
                                name: "RTSP Transport",
                                description: "The transport protocol your camera will use. TCP is usually the best choice.",
                                selectOption: ['auto', 'tcp', 'udp', 'http'],
                                curVal: 'tcp'
                            }, {
                                name: "Username",
                                description: "The user login for your camera.",
                                selectOption: [],
                                curVal: 'admin'
                            }, {
                                name: "Password",
                                description: "The password for your camera.",
                                selectOption: [],
                                curVal: '123456'
                            }, {
                                name: "Host",
                                description: "Connection address",
                                selectOption: [],
                                curVal: '10.0.9.253'
                            }, {
                                name: "Port",
                                description: "Port number that your camera is streaming out on.",
                                selectOption: [],
                                curVal: '10.0.9.253'
                            }, {
                                name: "Force Port",
                                description: "Using the default web port can allow automatic switch to other ports for streams like RTSP.",
                                selectOption: [true, false],
                                curVal: false
                            }, {
                                name: "Path",
                                description: "The path to your camera",
                                selectOption: [],
                                curVal: '/Streaming/Channels/101'
                            }, {
                                name: "Analyzation Duration",
                                description: "Specify how many microseconds are analyzed to probe the input. Set to 100000 if you are using RTSP and having stream issues.",
                                selectOption: [],
                                curVal: 100000
                            }, {
                                name: "Probe Size",
                                description: "Specify how big to make the analyzation probe for the input. Set to 100000 if you are using RTSP and having stream issues",
                                selectOption: [],
                                curVal: ''
                            }, {
                                name: "Accelerator",
                                description: "",
                                selectOption: [true, false],
                                curVal: ''
                            }
                        ]
                    }, {
                        title: "Stream",
                        description: "This section will designate the primary stream out method and it's settings. This stream will be displayed in the dashboard. If you choose to use HLS, JPEG, or MJPEG then you can consume the stream through other programs.",
                        options: [
                            {
                                name: "Stream Type",
                                description: "The method that will used to consume the video stream.",
                                selectOption: ['record', 'disable', 'watch-only', 'idle'],
                                curVal: 'record'
                            }, {
                                name: "Monitor ID",
                                description: "This is a non-changeable identifier for the monitor. You can duplicate a monitor by double clicking the Monitor ID and changing it.",
                                selectOption: [],
                                curVal: 'p404'
                            }, {
                                name: "Name",
                                description: "This is the human-readable display name for the monitor.",
                                selectOption: [],
                                curVal: 'p404'
                            }, {
                                name: "Retry Connection",
                                description: "The number of times to retry for network connection between the server and camera before setting the monitor to Disabled. No decimals. Set to 0 to retry forever.",
                                selectOption: [],
                                curVal: ''
                            }, {
                                name: "Notes",
                                description: "Comments you want to leave for this camera.",
                                selectOption: [],
                                curVal: ''
                            }, {
                                name: "Storage Location",
                                description: "",
                                selectOption: ['main', 'second'],
                                curVal: 'main'
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