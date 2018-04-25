(function () {
    // angular
    //     .module('app')
    //     .controller('liveCtrl', liveCtrl)

    angular
        .module('app')
        .component('liveView', {
            templateUrl: './user/components/views/live/live.template.html',
            bindings: {

            },
            controller: liveCtrl,
            controllerAs: 'vm'
        })


    liveCtrl.$inject = ['$sce', 'stream', 'monitor', 'authentication', 'setting', 'filterText']
    function liveCtrl($sce, stream, monitor, authentication, setting, filterText) {
        var vm = this;
        var settingService = setting();

        //init some component with default value
        preProcess();
        // get data from server
        init();
        authentication.onLoginSuccess(function (data) {
            console.log('login success');
            init();
            location.href = '/#';
        })
        authentication.onLogoutSuccess(function (data) {
            //make component to default value
            preProcess();
        });

        filterText.onTyping(function (text) {
            vm.filter = text;
        })


        vm.flashClick = function (id) {
            switch (vm.flashCur[id]) {
                case 'flash_on': vm.flashCur[id] = 'flash_off'; break;
                case 'flash_off': vm.flashCur[id] = 'flash_auto'; break;
                case 'flash_auto': vm.flashCur[id] = 'flash_on'; break;

                default: vm.flashCur[id] = 'flash_on';
            }

        }

        vm.showInfo = function (mid) {
            monitor.getInfo(mid, function (err, data) {
                if (err) return console.error(err);

                vm.targetMonitor = data;
                console.log(data);
            })
        }

        vm.endShowInfo = function () {
            vm.targetMonitor = null;
        }

        vm.changePage = function (page) {
            vm.curPage = page;
        }


        function preProcess() {
            filterText.resetFilter();

            vm.filter = '';
            vm.monitors = [];
            vm.flashCur = {};
            vm.targetMonitor = null;
            vm.setting = {};
            vm.numPage = 0;
            vm.curPage = 0;
        }

        function init() {

            initSetting();
            stream.getAll(function (monitors) {
                vm.monitors = monitors.map(function (m) {

                    vm.flashCur[m.mid] = 'flash_on';

                    return {
                        mid: m.mid,
                        link: $sce.trustAsResourceUrl(m.link) //make link valid for iframe tag
                    }
                })

                vm.numPage = vm.monitors.length / vm.setting.monitorPerPage + 1;
                vm.curPage = 1;
            })




            function initSetting() {
                settingService.getSetting(function (err, initialSetting) {
                    if (err) return console.log(err);

                    //init setting
                    vm.setting.monitorPerPage = initialSetting.monitorPerPage;
                    vm.setting.monitorPerRow = initialSetting.monitorPerRow;
                    vm.videoClass = "col-sm-6 col-md-"
                        + (12 / vm.setting.monitorPerRow).toString()
                        + " col-lg-"
                        + (12 / vm.setting.monitorPerRow).toString()
                        + " media";

                    console.log('setting from live');
                    console.log(vm.setting);
                });
            }


        }
    }
})()