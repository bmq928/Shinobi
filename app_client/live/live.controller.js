(function () {
    angular
        .module('app')
        .controller('liveCtrl', liveCtrl)

    liveCtrl.$inject = ['$sce', 'stream', 'monitor', 'authentication', 'setting']
    function liveCtrl($sce, stream, monitor, authentication, setting) {
        var vm = this;
        var settingService;

        //init some component with default value
        preProcess();
        // get data from server
        init();
        authentication.onLoginSuccess(function (data) {
            init();
        })
        authentication.onLogoutSuccess(function (data) {
            //make component to default value
            preProcess();
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


        function preProcess() {
            vm.monitors = [];
            vm.flashCur = {};
            vm.targetMonitor = null;
            vm.setting = {};
            settingService = setting();
        }

        function init() {

            settingService.getSetting(function(err, initialSetting){
                if(err) return console.log(err);

                vm.setting.monitorPerPage = initialSetting.monitorPerPage;
                vm.setting.monitorPerRow = initialSetting.monitorPerRow;
                console.log('setting from live');
                console.log(vm.setting);
            });

            stream.getAll(function (monitors) {
                vm.monitors = monitors.map(function (m) {

                    vm.flashCur[m.mid] = 'flash_on';

                    return {
                        mid: m.mid,
                        link: $sce.trustAsResourceUrl(m.link) //make link valid for iframe tag
                    }
                })
            })
        }
    }
})()