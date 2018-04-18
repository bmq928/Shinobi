(function () {
    angular
        .module('app')
        .controller('playbackCtrl', playbackCtrl)

    playbackCtrl.$inject = ['video', 'authentication', 'setting']
    function playbackCtrl(video, authentication, setting) {

        var vm = this;
        var settingService = setting();


        preProcess();
        init();
        authentication.onLoginSuccess(function (data) {
            init();
        })
        authentication.onLogoutSuccess(function (data) {
            //make component to default value
            preProcess();
        })

        //make the size of the video
        // vm.videoClass = "col-sm-6 col-md-"
        //     + (12 / vm.setting.videoPerRow).toString()
        //     + " col-lg-"
        //     + (12 / vm.setting.videoPerRow).toString()
        //     + " media";


        vm.changePage = function (page) {
            vm.curPage = page;
        }

        vm.showInfo = function (video) {
            vm.targetVideo = video;
        }



        function preProcess() {
            vm.videos = [];
            vm.targetVideo = null; //just for showInfo method
            vm.numPage = 0;
            vm.curPage = 0;
            vm.setting = {};

            //default setting
            vm.setting.videoPerPage = 9;
            vm.setting.videoPerRow = 3;
        }

        function init() {
            //init
            video.getAllByMid('p404', function (videos) {
                initSetting();


                console.log(videos);
                vm.videos = videos;
                // vm.numPage = vm.videos.length / window.constants.VIDEO_PER_PAGE + 1;
                if (vm.setting.videoPerPage) vm.numPage = vm.videos.length / vm.setting.videoPerPage + 1;
                else vm.numPage = vm.videos.length / window.constants.VIDEO_PER_PAGE + 1;
                vm.curPage = 1;
            })



            function initSetting() {
                settingService.getSetting(function (err, initialSetting) {
                    if (err) return console.log(err);

                    console.log('from playback');
                    console.log(initialSetting);
                    console.log(vm.videoClass);
                    console.log(initialSetting.videoPerPage);
                    vm.setting.videoPerPage = initialSetting.videoPerPage;
                    vm.setting.videoPerRow = initialSetting.videoPerRow;
                    vm.videoClass = "col-sm-6 col-md-"
                        + (12 / vm.setting.videoPerRow).toString()
                        + " col-lg-"
                        + (12 / vm.setting.videoPerRow).toString()
                        + " media";
                });
            }
        }


    }
})()